import { TaskStatusDTO } from "@/constants";

type SuccessResponseDTO<T> = {
  success: true;
  data: T;
  error: null;
};

type ErrorResponseDTO = {
  success: false;
  data: null;
  error: string;
};

type ApiResponseDTO<T> = SuccessResponseDTO<T> & ErrorResponseDTO;

interface BaseDTO {
  _id: string;
  createdAt: number;
  updatedAt: number;
}

interface UserDTO extends BaseDTO {
  name: string;
  email: string;
}

interface TaskDTO extends BaseDTO {
  title: string;
  description: string;
  status: TaskStatusDTO;
  createdBy: UserDTO;
}

export type {
  UserDTO,
  TaskDTO,
  SuccessResponseDTO,
  ErrorResponseDTO,
  ApiResponseDTO,
};
