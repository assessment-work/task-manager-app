import { TaskAddEditFragment } from "@/fragments";
import { AddTaskFormValidationSchema } from "@/types";
import { FormikHelpers } from "formik";

interface AddTaskScreenProps {
  initialValues: AddTaskFormValidationSchema;
  isLoading: boolean;
  onSubmitAddTask: (
    values: AddTaskFormValidationSchema,
    formikHelpers: FormikHelpers<AddTaskFormValidationSchema>
  ) => void;
}

function AddTaskScreen(props: AddTaskScreenProps) {
  return (
    <TaskAddEditFragment
      mode="ADD"
      initialValues={props.initialValues}
      onSubmitTask={props.onSubmitAddTask}
      isLoading={props.isLoading}
    />
  );
}

export type { AddTaskScreenProps };
export { AddTaskScreen };
