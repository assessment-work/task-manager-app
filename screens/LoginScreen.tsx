import { Pressable, StyleSheet, View } from "react-native";
import { Formik } from "formik";

import type { FormikHelpers } from "formik";

import { validation } from "@/validations";
import { TextInput } from "@/components";

import type { LoginFormValidationSchema } from "@/types";
import { Button, Text } from "react-native-paper";

interface LoginScreenProps {
  initialValues: LoginFormValidationSchema;
  isLoading: boolean;
  onSubmitLogin: (
    values: LoginFormValidationSchema,
    formikHelpers: FormikHelpers<LoginFormValidationSchema>
  ) => void;
  onPressSignup: () => void;
}

function LoginScreen(props: LoginScreenProps) {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={props.initialValues}
        validationSchema={validation.form.auth.login}
        onSubmit={props.onSubmitLogin}
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
            <Text variant="displaySmall">Login</Text>
            <View style={styles.inputContainer}>
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
              <Pressable onPress={props.onPressSignup}>
                <Text variant="bodyLarge" style={styles.signup}>
                  No account? Sign Up
                </Text>
              </Pressable>
            </View>
            <Button
              mode="contained"
              loading={props.isLoading}
              onPress={() => handleSubmit()}
              style={styles.submit}
            >
              Login
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
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
  signup: {
    textDecorationLine: "underline",
    color: "#0000FF",
  },
});

export type { LoginScreenProps };
export { LoginScreen };
