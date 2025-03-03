import { useEffect, useRef } from "react";

import type { FormikHelpers } from "formik";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AddTaskScreen } from "@/screens";
import { SnackbarVariant, TaskStatusDTO } from "@/constants";

import type {
  AddTaskFormValidationSchema,
  RootNavigtionParamList,
} from "@/types";
import { useAddTaskMutation } from "@/redux";
import SnackbarManager from "@/components/SnackbarManager";

interface AddTaskContainerProps
  extends NativeStackScreenProps<RootNavigtionParamList, "AddTask"> {}

function AddTaskContainer(props: AddTaskContainerProps) {
  const [addTaskMutation, { data, isLoading, isSuccess }] =
    useAddTaskMutation();

  const initialValues: AddTaskFormValidationSchema = {
    title: "",
    description: "",
    status: TaskStatusDTO.NOT_COMPLETED,
  };

  const formikHelpersRef = useRef<FormikHelpers<AddTaskFormValidationSchema>>();

  useEffect(() => {
    if (data?.data && isSuccess) {
      SnackbarManager.show({
        title: "Task added successfully",
        variant: SnackbarVariant.SUCCESS,
      });

      formikHelpersRef.current?.resetForm();

      props.navigation.navigate("Home");
    }
  }, [isSuccess]);

  function onSubmitAddTask(
    values: AddTaskFormValidationSchema,
    formikHelpers: FormikHelpers<AddTaskFormValidationSchema>
  ) {
    formikHelpersRef.current = formikHelpers;

    addTaskMutation({
      title: values.title,
      description: values.description,
      status: values.status,
    });
  }

  return (
    <AddTaskScreen
      initialValues={initialValues}
      isLoading={isLoading}
      onSubmitAddTask={onSubmitAddTask}
    />
  );
}

export type { AddTaskContainerProps };
export { AddTaskContainer };
