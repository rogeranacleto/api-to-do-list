import express from "express";
import { body, param } from "express-validator";
import { TaskStatus } from "@prisma/client";
import { TaskController } from "../controllers";
import { authMiddleware, dataValidation } from "../middlewares";

const validStatuses = Object.values(TaskStatus);

export class TaskRoutes {
  public static bind() {
    const router = express.Router();
    const controller = new TaskController();

    router.post(
      "/tasks",
      authMiddleware,
      dataValidation([
        body("title")
          .isString().withMessage("Título deve ser um texto.").bail()
          .isLength({ min: 1 }).withMessage("Título é obrigatório."),
        body("description")
          .isString().withMessage("Descrição deve ser um texto.").bail()
          .isLength({ min: 1 }).withMessage("Descrição é obrigatória."),
        body("status")
          .optional()
          .isIn(validStatuses).withMessage(`Status deve ser um dos valores: ${validStatuses.join(", ")}.`),
      ]),
      controller.create,
    );

    router.get(
      "/tasks",
      authMiddleware,
      controller.getAll,
    );

    router.get(
      "/tasks/:id",
      authMiddleware,
      dataValidation([
        param("id")
          .isInt({ min: 1 }).withMessage("ID deve ser um número inteiro positivo."),
      ]),
      controller.getById,
    );

    router.put(
      "/tasks/:id",
      authMiddleware,
      dataValidation([
        param("id")
          .isInt({ min: 1 }).withMessage("ID deve ser um número inteiro positivo."),
        body("title")
          .optional()
          .isString().withMessage("Título deve ser um texto.").bail()
          .isLength({ min: 1 }).withMessage("Título não pode ser vazio."),
        body("description")
          .optional()
          .isString().withMessage("Descrição deve ser um texto.").bail()
          .isLength({ min: 1 }).withMessage("Descrição não pode ser vazia."),
        body("status")
          .optional()
          .isIn(validStatuses).withMessage(`Status deve ser um dos valores: ${validStatuses.join(", ")}.`),
      ]),
      controller.update,
    );

    router.delete(
      "/tasks/:id",
      authMiddleware,
      dataValidation([
        param("id")
          .isInt({ min: 1 }).withMessage("ID deve ser um número inteiro positivo."),
      ]),
      controller.delete,
    );

    return router;
  }
}
