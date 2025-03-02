import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { TaskDetailScreen } from "@/screens";

import type { RootNavigtionParamList } from "@/types";

interface TaskDetailContainerProps
  extends NativeStackScreenProps<RootNavigtionParamList, "TaskDetail"> {}

function TaskDetailContainer(props: TaskDetailContainerProps) {
  return <TaskDetailScreen />;
}

export type { TaskDetailContainerProps };
export { TaskDetailContainer };
