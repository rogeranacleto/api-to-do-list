import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import prismaRepository from "../database/prisma.repository";
import { LoginDto, RegisterDto } from "../dtos";
import { envs } from "../envs";
import { HTTPError } from "../utils";

export class AuthService {
  public async register(dto: RegisterDto): Promise<{ token: string }> {
    const existingUser = await prismaRepository.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new HTTPError(409, "E-mail já cadastrado.");
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = await prismaRepository.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
      },
    });

    const token = this.generateToken(newUser);

    return { token };
  }

  public async login(dto: LoginDto): Promise<{ token: string }> {
    const user = await prismaRepository.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new HTTPError(401, "E-mail ou senha inválidos.");
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new HTTPError(401, "E-mail ou senha inválidos.");
    }

    const token = this.generateToken(user);

    return { token };
  }

  private generateToken(user: { id: number; name: string; email: string }): string {
    return jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      envs.JWT_SECRET,
      { expiresIn: "1d" },
    );
  }
}
