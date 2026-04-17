import { Request, Response } from "express";

import { AuthService } from "../services";
import { onError } from "../utils";

export class AuthController {
  public async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const service = new AuthService();

      await service.register({ name, email, password });

      res.status(201).json({
        success: true,
        message: "Usuário cadastrado com sucesso.",
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const service = new AuthService();

      const result = await service.login({ email, password });

      res.status(200).json({
        token: result.token,
      });
    } catch (error) {
      onError(error, res);
    }
  }
}

