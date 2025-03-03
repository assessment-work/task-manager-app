import { TaskStatusDTO } from "@/constants";

interface LoginFormValidationSchema {
  email: string;
  password: string;
}

interface SignupFormValidationSchema {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface AddTaskFormValidationSchema {
  title: string;
  description: string;
  status: TaskStatusDTO;
}

interface EditTaskFormValidationSchema {
  title: string;
  description: string;
  status: TaskStatusDTO;
}

export type {
  LoginFormValidationSchema,
  SignupFormValidationSchema,
  AddTaskFormValidationSchema,
  EditTaskFormValidationSchema,
};
