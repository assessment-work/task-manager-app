import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Formik } from "formik";

import type { FormikHelpers } from "formik";

import { validation } from "@/validations";
import { TextInput } from "@/components";

import type { SignupFormValidationSchema } from "@/types";
import { Button, Text } from "react-native-paper";

interface SignupScreenProps {
  initialValues: SignupFormValidationSchema;
  isLoading: boolean;
  onSubmitSignup: (
    values: SignupFormValidationSchema,
    formikHelpers: FormikHelpers<SignupFormValidationSchema>
  ) => void;
  onPressLogin: () => void;
}

function SignupScreen(props: SignupScreenProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Formik
          initialValues={props.initialValues}
          validationSchema={validation.form.auth.signup}
          onSubmit={props.onSubmitSignup}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <View style={styles.formContainer}>
              <Text variant="displaySmall">Signup</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  label={"Name"}
                  value={values.name}
                  touched={touched.name}
                  error={errors.name}
                  autoCapitalize="none"
                  onBlur={handleBlur("name")}
                  onChangeText={handleChange("name")}
                />
                <TextInput
                  label={"Email"}
                  value={values.email}
                  touched={touched.email}
                  error={errors.email}
                  autoCapitalize="none"
                  onBlur={handleBlur("email")}
                  onChangeText={handleChange("email")}
                />
                <TextInput
                  label={"Password"}
                  value={values.password}
                  touched={touched.password}
                  error={errors.password}
                  isPassword
                  secureTextEntry
                  onBlur={handleBlur("password")}
                  onChangeText={handleChange("password")}
                />
                <TextInput
                  label={"Confirm Password"}
                  value={values.confirmPassword}
                  touched={touched.confirmPassword}
                  error={errors.confirmPassword}
                  isPassword
                  secureTextEntry
                  onBlur={handleBlur("confirmPassword")}
                  onChangeText={handleChange("confirmPassword")}
                />
                <Pressable onPress={props.onPressLogin}>
                  <Text variant="bodyLarge" style={styles.login}>
                    Already have an account? Login
                  </Text>
                </Pressable>
              </View>
              <Button
                mode="contained"
                loading={props.isLoading}
                onPress={() => handleSubmit()}
                style={styles.submit}
              >
                Signup
              </Button>
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
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingBottom: 50,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
  },
  formContainer: {
    rowGap: 40,
    alignItems: "center",
  },
  inputContainer: {
    rowGap: 20,
    width: "100%",
  },
  submit: {
    minWidth: 180,
  },
  login: {
    textDecorationLine: "underline",
    color: "#0000FF",
  },
});

export type { SignupScreenProps };
export { SignupScreen };
