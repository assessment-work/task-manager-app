import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { CommonActions } from "@react-navigation/native";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { HomeScreen } from "@/screens";
import { storage } from "@/utils";
import { useDeleteTaskMutation, useGetAllTaskQuery } from "@/redux";
import SnackbarManager from "@/components/SnackbarManager";
import { SnackbarVariant, TaskDetailPageMode } from "@/constants";

import type { RootNavigtionParamList } from "@/types";

interface HomeContainerProps
  extends NativeStackScreenProps<RootNavigtionParamList, "Home"> {}

function HomeContainer(props: HomeContainerProps) {
  const { data, isLoading, refetch } = useGetAllTaskQuery({});

  const [deleteTaskMutation, deleteTaskResult] = useDeleteTaskMutation();

  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  useEffect(() => {
    validationAuthorization();
  }, []);

  useEffect(() => {
    if (deleteTaskResult.isSuccess) {
      SnackbarManager.show({
        title: "Task deleted successfully",
        variant: SnackbarVariant.SUCCESS,
      });

      deleteTaskResult.reset();
    }
  }, [deleteTaskResult.isSuccess]);

  async function validationAuthorization() {
    const token = await storage.getAccessToken();

    if (!token) {
      goToLogin();
    }
  }

  function goToLogin() {
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: "Login",
          },
        ],
      })
    );
  }

  function onPressAddTask() {
    props.navigation.navigate("AddTask");
  }

  function onPressDelete(id: string) {
    Alert.alert("Delete Task", "Are you sure wants to delete?", [
      {
        text: "No",
      },
      {
        text: "Yes",
        onPress: () => {
          deleteTaskMutation({
            id,
          });
        },
      },
    ]);
  }

  function onPressView(id: string) {
    props.navigation.navigate("TaskDetail", {
      taskId: id,
      mode: TaskDetailPageMode.VIEW,
    });
  }

  function onPressEdit(id: string) {
    props.navigation.navigate("TaskDetail", {
      taskId: id,
      mode: TaskDetailPageMode.EDIT,
    });
  }

  function onPressLogout() {
    Alert.alert("Logout", "Are you sure wants to logout?", [
      {
        text: "No",
      },
      {
        text: "Yes",
        onPress: () => {
          processLogout();
        },
      },
    ]);
  }

  async function processLogout() {
    setIsLoggingOut(true);

    await storage.clearAll();

    setIsLoggingOut(false);

    goToLogin();
  }

  const tasks = [...(data?.data ?? [])].reverse();

  return (
    <HomeScreen
      tasks={tasks}
      isLoading={isLoading}
      onRefresh={refetch}
      onPressDelete={onPressDelete}
      onPressEdit={onPressEdit}
      onPressView={onPressView}
      onPressAddTask={onPressAddTask}
      onPressLogout={onPressLogout}
      isLoggingout={isLoggingOut}
    />
  );
}

export type { HomeContainerProps };
export { HomeContainer };
