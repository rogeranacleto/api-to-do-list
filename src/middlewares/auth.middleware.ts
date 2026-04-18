import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { envs } from "../envs";
import { onError } from "../utils";
import { HTTPError } from "../utils";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new HTTPError(401, "Token não fornecido.");
    }

    const [, token] = authHeader.split(" ");

    if (!token) {
      throw new HTTPError(401, "Token mal formatado.");
    }

    const decoded = jwt.verify(token, envs.JWT_SECRET) as {
      id: number;
      name: string;
      email: string;
    };

    req.user = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
    };

    next();
  } catch (error) {
    if (error instanceof HTTPError) {
      onError(error, res);
      return;
    }

    onError(new HTTPError(401, "Token inválido ou expirado."), res);
  }
}
