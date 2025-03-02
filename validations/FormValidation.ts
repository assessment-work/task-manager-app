import * as Yup from "yup";

import { TaskStatusDTO } from "@/constants";

import type {
  AddTaskFormValidationSchema,
  EditTaskFormValidationSchema,
  LoginFormValidationSchema,
  SignupFormValidationSchema,
} from "@/types";

const LoginFormValidation = Yup.object<LoginFormValidationSchema>().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const SignupFormValidation = Yup.object<SignupFormValidationSchema>().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required(),
});

const AddTaskFormValidation = Yup.object<AddTaskFormValidationSchema>().shape({
  title: Yup.string().required(),
  description: Yup.string().min(8).required(),
});

const EditTaskFormValidation = Yup.object<EditTaskFormValidationSchema>().shape(
  {
    title: Yup.string().required(),
    description: Yup.string().min(8).required(),
    status: Yup.string().oneOf(Object.values(TaskStatusDTO)).required(),
  }
);

const form = {
  auth: { login: LoginFormValidation, signup: SignupFormValidation },
  task: {
    add: AddTaskFormValidation,
    edit: EditTaskFormValidation,
  },
};

export { form };
