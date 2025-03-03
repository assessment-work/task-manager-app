import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Checkbox, Text } from "react-native-paper";
import { Formik } from "formik";

import type { FormikHelpers } from "formik";

import { TextInput } from "@/components";
import { TaskStatusDTO } from "@/constants";
import { validation } from "@/validations";

import type { AddTaskFormValidationSchema } from "@/types";

type TaskAddEditFragmentProps = {
  mode: "EDIT" | "VIEW" | "ADD";
  initialValues: AddTaskFormValidationSchema;
  onSubmitTask: (
    values: AddTaskFormValidationSchema,
    formikHelpers: FormikHelpers<AddTaskFormValidationSchema>
  ) => void;
  isLoading?: boolean;
  onPressEdit?: () => void;
  onPressDelete?: () => void;
};

function TaskAddEditFragment(props: TaskAddEditFragmentProps) {
  const [isChecked, setIsChecked] = useState(
    props.initialValues.status === TaskStatusDTO.COMPLETED
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Formik
          initialValues={props.initialValues}
          validationSchema={validation.form.task.edit}
          onSubmit={props.onSubmitTask}
          enableReinitialize
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <View style={styles.formContainer}>
              <Text variant="displaySmall">
                {props.mode.charAt(0).toUpperCase() +
                  props.mode.slice(1).toLocaleLowerCase()}{" "}
                Task
              </Text>
              <View style={styles.formContent}>
                <TextInput
                  label="Title"
                  placeholder="Enter task title"
                  value={values.title}
                  touched={touched.title}
                  error={errors.title}
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("title")}
                  isEditable={props.mode !== "VIEW"}
                  isDisabled={props.mode === "VIEW"}
                />
                <TextInput
                  label="Description"
                  placeholder="Enter task description"
                  value={values.description}
                  touched={touched.description}
                  error={errors.description}
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  isEditable={props.mode !== "VIEW"}
                  isDisabled={props.mode === "VIEW"}
                />
                <Checkbox.Item
                  label="Is Completed"
                  status={isChecked ? "checked" : "unchecked"}
                  onPress={() => {
                    setIsChecked(!isChecked);
                    setFieldValue(
                      "status",
                      !isChecked === true
                        ? TaskStatusDTO.COMPLETED
                        : TaskStatusDTO.NOT_COMPLETED
                    );
                  }}
                  disabled={props.mode === "VIEW"}
                />
              </View>
              <View style={styles.actionContainer}>
                {props.mode !== "VIEW" && (
                  <Button
                    mode="contained"
                    loading={props.isLoading}
                    disabled={props.isLoading}
                    onPress={() => handleSubmit()}
                    style={styles.submit}
                    buttonColor="blue"
                    textColor="white"
                  >
                    {props.mode === "ADD" ? "Add" : "Update"}
                  </Button>
                )}
                {props.mode === "VIEW" && (
                  <>
                    <Button
                      mode="contained"
                      loading={props.isLoading}
                      disabled={props.isLoading}
                      onPress={props.onPressEdit}
                      style={styles.submit}
                      icon={"pencil"}
                      buttonColor="blue"
                      textColor="white"
                    >
                      Edit
                    </Button>
                    <Button
                      mode="contained"
                      loading={props.isLoading}
                      disabled={props.isLoading}
                      onPress={props.onPressDelete}
                      style={styles.submit}
                      icon={"trash-can"}
                      buttonColor="red"
                      textColor="white"
                    >
                      Delete
                    </Button>
                  </>
                )}
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 120,
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    rowGap: 40,
  },
  formContent: {
    width: "100%",
    rowGap: 30,
  },
  submit: {
    minWidth: 220,
  },
  actionContainer: {
    rowGap: 16,
  },
});

export type { TaskAddEditFragmentProps };
export { TaskAddEditFragment };
