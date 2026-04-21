import { TaskStatus } from "@prisma/client";

export interface CreateTaskDto {
  title: string;
  description: string;
  status?: TaskStatus;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
}
