import type { FormikHelpers } from "formik";

import { TaskDetailPageMode } from "@/constants";

import type { AddTaskFormValidationSchema } from "@/types";
import { TaskAddEditFragment } from "@/fragments";

interface TaskDetailScreenProps {
  initialValues: AddTaskFormValidationSchema;
  onSubmitEditTask: (
    values: AddTaskFormValidationSchema,
    formikHelpers: FormikHelpers<AddTaskFormValidationSchema>
  ) => void;
  isLoading: boolean;
  pageMode: TaskDetailPageMode;
  onPressEditTask: () => void;
  onPressDeleteTask: () => void;
}

function TaskDetailScreen(props: TaskDetailScreenProps) {
  return (
    <TaskAddEditFragment
      initialValues={props.initialValues}
      mode={props.pageMode}
      onSubmitTask={props.onSubmitEditTask}
      isLoading={props.isLoading}
      onPressEdit={props.onPressEditTask}
      onPressDelete={props.onPressDeleteTask}
    />
  );
}

export type { TaskDetailScreenProps };
export { TaskDetailScreen };
