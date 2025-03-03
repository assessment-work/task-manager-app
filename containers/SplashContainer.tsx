import { CommonActions } from "@react-navigation/native";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { SplashScreen } from "@/screens";

import type { RootNavigtionParamList } from "@/types";
import { useEffect } from "react";
import { storage } from "@/utils";

interface SplashContainerProps
  extends NativeStackScreenProps<RootNavigtionParamList, "Splash"> {}

function SplashContainer(props: SplashContainerProps) {
  useEffect(() => {
    validationAuthorization();
  }, []);

  async function validationAuthorization() {
    const token = await storage.getAccessToken();

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 3000);
    });

    if (token) {
      goToHome();
    }

    if (!token) {
      goToLogin();
    }
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

  function goToLogin() {
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: "Login",
          },
        ],
      })
    );
  }

  return <SplashScreen />;
}

export type { SplashContainerProps };
export { SplashContainer };
