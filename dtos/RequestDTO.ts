import { TaskStatusDTO } from "@/constants";

interface LoginApiArgs {
  email: string;
  password: string;
}

interface SignupApiArgs {
  name: string;
  email: string;
  password: string;
}

interface AddTaskApiArgs {
  title: string;
  description: string;
  status: TaskStatusDTO;
}

interface GetTaskByIdApiArgs {
  id: string;
}

interface EditTaskByIdApiArgs extends AddTaskApiArgs {
  id: string;
}

interface DeleteTaskByIdApiArgs {
  id: string;
}

export type {
  LoginApiArgs,
  SignupApiArgs,
  AddTaskApiArgs,
  GetTaskByIdApiArgs,
  EditTaskByIdApiArgs,
  DeleteTaskByIdApiArgs,
};
