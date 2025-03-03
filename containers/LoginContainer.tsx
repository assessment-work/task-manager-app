import { useEffect, useRef } from "react";
import { CommonActions } from "@react-navigation/native";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { FormikHelpers } from "formik";

import { LoginScreen } from "@/screens";
import { LoginApiResponse, useLoginMutation } from "@/redux";
import SnackbarManager from "@/components/SnackbarManager";
import { SnackbarVariant } from "@/constants";
import { storage } from "@/utils";

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
    if (data?.success && data?.data && isSuccess) {
      processLogin(data);

      SnackbarManager.show({
        title: "Logged in successfully",
        variant: SnackbarVariant.SUCCESS,
      });

      formikHelpersRef.current?.resetForm();
    }
  }, [isSuccess]);

  async function processLogin(data: LoginApiResponse) {
    if (data?.data) {
      storage.setAccessToken(data.data?.token);
      storage.setUserProfile(data.data?.user);
    }

    goToHome();
  }

  function goToHome() {
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: "Home",
          },
        ],
      })
    );
  }

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
