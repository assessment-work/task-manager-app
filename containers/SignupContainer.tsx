import { useEffect, useRef } from "react";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { FormikHelpers } from "formik";

import { SignupScreen } from "@/screens";
import { useSignupMutation } from "@/redux";
import SnackbarManager from "@/components/SnackbarManager";
import { SnackbarVariant } from "@/constants";

import type {
  SignupFormValidationSchema,
  RootNavigtionParamList,
} from "@/types";

interface SignupContainerProps
  extends NativeStackScreenProps<RootNavigtionParamList, "Signup"> {}

function SignupContainer(props: SignupContainerProps) {
  const [signupMutation, { isSuccess, isLoading, data }] = useSignupMutation();

  const initialValues: SignupFormValidationSchema = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const formikHelpersRef = useRef<FormikHelpers<SignupFormValidationSchema>>();

  useEffect(() => {
    if (data) {
      SnackbarManager.show({
        title: "Signup success",
        variant: SnackbarVariant.SUCCESS,
      });

      formikHelpersRef.current?.resetForm();
    }
  }, [isSuccess]);

  function onSubmitSignup(
    values: SignupFormValidationSchema,
    formikHelpers: FormikHelpers<SignupFormValidationSchema>
  ) {
    formikHelpersRef.current = formikHelpers;

    signupMutation({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  }

  function onPressLogin() {
    props.navigation.navigate("Login");
  }

  return (
    <SignupScreen
      initialValues={initialValues}
      isLoading={isLoading}
      onSubmitSignup={onSubmitSignup}
      onPressLogin={onPressLogin}
    />
  );
}

export type { SignupContainerProps };
export { SignupContainer };
