import express from "express";
import { body } from "express-validator";

import { AuthController } from "../controllers";
import { dataValidation } from "../middlewares";

export class AuthRoutes {
  public static bind() {
    const router = express.Router();
    const controller = new AuthController();

    router.post(
      "/users",
      dataValidation([
        body("name")
          .isString().withMessage("Nome deve ser um texto.").bail()
          .isLength({ min: 1 }).withMessage("Nome é obrigatório."),
        body("email")
          .isEmail().withMessage("E-mail inválido."),
        body("password")
          .isString().withMessage("Senha deve ser um texto.").bail()
          .isLength({ min: 6 }).withMessage("Senha deve ter no mínimo 6 caracteres."),
      ]),
      controller.register,
    );

    router.post(
      "/auth/login",
      dataValidation([
        body("email")
          .isEmail().withMessage("E-mail inválido."),
        body("password")
          .isString().withMessage("Senha é obrigatória.").bail()
          .isLength({ min: 1 }).withMessage("Senha é obrigatória."),
      ]),
      controller.login,
    );

    return router;
  }
}
