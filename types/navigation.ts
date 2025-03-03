import { TaskDetailPageMode } from "@/constants";

type RootNavigtionParamList = {
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  AddTask: undefined;
  TaskDetail: { taskId: string; mode: TaskDetailPageMode };
};

export type { RootNavigtionParamList };
