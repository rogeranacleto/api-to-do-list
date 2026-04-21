import { Request, Response } from "express";

import { TaskService } from "../services";
import { onError } from "../utils";

export class TaskController {
  public async create(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const { title, description, status } = req.body;

      const service = new TaskService();

      const task = await service.createTask(userId, { title, description, status });

      res.status(201).json({
        success: true,
        message: "Tarefa criada com sucesso.",
        data: task,
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const userId = req.user.id;

      const service = new TaskService();

      const tasks = await service.getTasks(userId);

      res.status(200).json({
        success: true,
        data: tasks,
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async getById(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const taskId = Number(req.params.id);

      const service = new TaskService();

      const task = await service.getTaskById(taskId, userId);

      res.status(200).json({
        success: true,
        data: task,
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const taskId = Number(req.params.id);
      const { title, description, status } = req.body;

      const service = new TaskService();

      const task = await service.updateTask(taskId, userId, { title, description, status });

      res.status(200).json({
        success: true,
        message: "Tarefa atualizada com sucesso.",
        data: task,
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const taskId = Number(req.params.id);

      const service = new TaskService();

      await service.deleteTask(taskId, userId);

      res.status(200).json({
        success: true,
        message: "Tarefa deletada com sucesso.",
      });
    } catch (error) {
      onError(error, res);
    }
  }
}
