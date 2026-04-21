import { Task } from "@prisma/client";

import prismaRepository from "../database/prisma.repository";
import { CreateTaskDto, UpdateTaskDto } from "../dtos";
import { HTTPError } from "../utils";

export class TaskService {
    public async createTask(userId: number, dto: CreateTaskDto): Promise<Task> {
        const task = await prismaRepository.task.create({
            data: {
                title: dto.title,
                description: dto.description,
                status: dto.status,
                userId,
            },
        });

        return task;
    }

    public async getTasks(userId: number): Promise<Task[]> {
        const tasks = await prismaRepository.task.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });

        return tasks;
    }

    public async getTaskById(taskId: number, userId: number): Promise<Task> {
        const task = await prismaRepository.task.findUnique({
            where: { id: taskId },
        });

        if (!task) {
            throw new HTTPError(404, "Tarefa não encontrada.");
        }

        if (task.userId !== userId) {
            throw new HTTPError(403, "Você não tem permissão para acessar esta tarefa.");
        }

        return task;
    }

    public async updateTask(taskId: number, userId: number, dto: UpdateTaskDto): Promise<Task> {
        const task = await prismaRepository.task.findUnique({
            where: { id: taskId },
        });

        if (!task) {
            throw new HTTPError(404, "Tarefa não encontrada.");
        }

        if (task.userId !== userId) {
            throw new HTTPError(403, "Você não tem permissão para atualizar esta tarefa.");
        }

        const updatedTask = await prismaRepository.task.update({
            where: { id: taskId },
            data: {
                title: dto.title,
                description: dto.description,
                status: dto.status,
            },
        });

        return updatedTask;
    }

    public async deleteTask(taskId: number, userId: number): Promise<void> {
        const task = await prismaRepository.task.findUnique({
            where: { id: taskId },
        });

        if (!task) {
            throw new HTTPError(404, "Tarefa não encontrada.");
        }

        if (task.userId !== userId) {
            throw new HTTPError(403, "Você não tem permissão para deletar esta tarefa.");
        }

        await prismaRepository.task.delete({
            where: { id: taskId },
        });
    }
}