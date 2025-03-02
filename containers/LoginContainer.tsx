import { useEffect, useRef } from "react";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { FormikHelpers } from "formik";

import { LoginScreen } from "@/screens";
import { useLoginMutation } from "@/redux";
import SnackbarManager from "@/components/SnackbarManager";
import { SnackbarVariant } from "@/constants";

import type {
  LoginFormValidationSchema,
  RootNavigtionParamList,
} from "@/types";

interface LoginContainerProps
  extends NativeStackScreenProps<RootNavigtionParamList, "Login"> {}

function LoginContainer(props: LoginContainerProps) {
  const [loginMutation, { isSuccess, isLoading, data }] = useLoginMutation();

  const initialValues: LoginFormValidationSchema = {
    email: "",
    password: "",
  };

  const formikHelpersRef = useRef<FormikHelpers<LoginFormValidationSchema>>();

  useEffect(() => {
    if (data) {
      SnackbarManager.show({
        title: "Logged in successfully",
        variant: SnackbarVariant.SUCCESS,
      });

      formikHelpersRef.current?.resetForm();
    }
  }, [isSuccess]);

  function onSubmitLogin(
    values: LoginFormValidationSchema,
    formikHelpers: FormikHelpers<LoginFormValidationSchema>
  ) {
    formikHelpersRef.current = formikHelpers;

    loginMutation({
      email: values.email,
      password: values.password,
    });
  }

  function onPressSignup() {
    console.log("on press signup calling....");

    props.navigation.navigate("Signup");
  }

  return (
    <LoginScreen
      initialValues={initialValues}
      isLoading={isLoading}
      onSubmitLogin={onSubmitLogin}
      onPressSignup={onPressSignup}
    />
  );
}

export type { LoginContainerProps };
export { LoginContainer };
