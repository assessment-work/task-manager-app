import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { TaskDetailScreen } from "@/screens";

import type {
  AddTaskFormValidationSchema,
  RootNavigtionParamList,
} from "@/types";
import {
  useDeleteTaskMutation,
  useEditTaskMutation,
  useGetTaskByIdQuery,
} from "@/redux";
import { ActivityIndicator } from "react-native-paper";
import {
  SnackbarVariant,
  TaskDetailPageMode,
  TaskStatusDTO,
} from "@/constants";
import { FormikHelpers } from "formik";
import { useEffect, useRef, useState } from "react";
import SnackbarManager from "@/components/SnackbarManager";
import { Alert } from "react-native";

interface TaskDetailContainerProps
  extends NativeStackScreenProps<RootNavigtionParamList, "TaskDetail"> {}

function TaskDetailContainer(props: TaskDetailContainerProps) {
  const { taskId, mode } = props.route.params;

  const { data, isLoading } = useGetTaskByIdQuery({
    id: taskId,
  });

  const [editTaskMutation, editTaskResult] = useEditTaskMutation();
  const [deleteTaskMutation, deleteTaskResult] = useDeleteTaskMutation();

  const formikHelpersRef = useRef<FormikHelpers<AddTaskFormValidationSchema>>();

  const [pageMode, setPageMode] = useState<TaskDetailPageMode>(mode);

  const initialValues: AddTaskFormValidationSchema = {
    title: data?.data?.title ?? "",
    description: data?.data?.description ?? "",
    status: data?.data?.status ?? TaskStatusDTO.NOT_COMPLETED,
  };

  useEffect(() => {
    if (editTaskResult.isSuccess && editTaskResult.data.data) {
      SnackbarManager.show({
        title: "Task updated successfully",
        variant: SnackbarVariant.SUCCESS,
      });

      formikHelpersRef.current?.resetForm();

      editTaskResult.reset();

      setPageMode(TaskDetailPageMode.VIEW);
    }
  }, [editTaskResult.isSuccess]);

  useEffect(() => {
    if (deleteTaskResult.isSuccess) {
      SnackbarManager.show({
        title: "Task deleted successfully",
        variant: SnackbarVariant.SUCCESS,
      });

      deleteTaskResult.reset();

      props.navigation.goBack();
    }
  }, [deleteTaskResult.isSuccess]);

  function onSubmitEditTask(
    values: AddTaskFormValidationSchema,
    formikHelpers: FormikHelpers<AddTaskFormValidationSchema>
  ) {
    formikHelpersRef.current = formikHelpers;

    editTaskMutation({
      id: taskId,
      title: values.title,
      description: values.description,
      status: values.status,
    });
  }

  function onPressEditTask() {
    setPageMode(TaskDetailPageMode.EDIT);
  }

  function onPressDeleteTask() {
    Alert.alert("Delete Task", "Are you sure wants to delete?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          deleteTaskMutation({
            id: taskId,
          });
        },
      },
    ]);
  }

  return (
    <>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <TaskDetailScreen
          initialValues={initialValues}
          onSubmitEditTask={onSubmitEditTask}
          isLoading={editTaskResult.isLoading}
          pageMode={pageMode}
          onPressEditTask={onPressEditTask}
          onPressDeleteTask={onPressDeleteTask}
        />
      )}
    </>
  );
}

export type { TaskDetailContainerProps };
export { TaskDetailContainer };
