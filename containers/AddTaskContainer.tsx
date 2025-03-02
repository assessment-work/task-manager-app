import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AddTaskScreen } from "@/screens";

import type { RootNavigtionParamList } from "@/types";

interface AddTaskContainerProps
  extends NativeStackScreenProps<RootNavigtionParamList, "AddTask"> {}

function AddTaskContainer(props: AddTaskContainerProps) {
  return <AddTaskScreen />;
}

export type { AddTaskContainerProps };
export { AddTaskContainer };
