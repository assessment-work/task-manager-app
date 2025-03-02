import { TaskDTO, UserDTO } from "@/dtos";

type BaseApiResponse<T> =
  | {
      success: true;
      data: T;
      error: null;
    }
  | {
      success: false;
      data: null;
      error: string;
    };

type LoginApiResponseData = {
  token: string;
  user: UserDTO;
};

type LoginApiResponse = BaseApiResponse<LoginApiResponseData>;

type SignupApiResponseData = {
  token: string;
  user: UserDTO;
};

type SignupApiResponse = BaseApiResponse<SignupApiResponseData>;

type AddTaskApiResponse = BaseApiResponse<TaskDTO>;

type GetAllTaskApiResponse = BaseApiResponse<Array<TaskDTO>>;

type GetTaskByIdApiResponse = BaseApiResponse<TaskDTO>;

type EditTaskApiResponse = BaseApiResponse<TaskDTO>;

type DeleteTaskApiResponse = BaseApiResponse<TaskDTO>;

export {
  LoginApiResponse,
  SignupApiResponse,
  AddTaskApiResponse,
  GetAllTaskApiResponse,
  GetTaskByIdApiResponse,
  EditTaskApiResponse,
  DeleteTaskApiResponse,
};
