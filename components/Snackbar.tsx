import { useEffect, useState } from "react";
import { Snackbar as PaperSnackbar } from "react-native-paper";

import SnackbarManager from "./SnackbarManager";
import { SnackbarManagerListenerArgs } from "@/types";
import { SnackbarVariant } from "@/constants";

type State = {
  visible: boolean;
} & Partial<SnackbarManagerListenerArgs>;

enum SnackbarColors {
  DEFAULT = "black",
  SUCCESS = "green",
  INFO = "skyblue",
  WARN = "yellow",
  ERROR = "red",
}

function GetSnackBarBackgroundColor(variant?: SnackbarVariant) {
  switch (variant) {
    case SnackbarVariant.DEFAULT:
      return SnackbarColors.DEFAULT;

    case SnackbarVariant.SUCCESS:
      return SnackbarColors.SUCCESS;

    case SnackbarVariant.INFO:
      return SnackbarColors.INFO;

    case SnackbarVariant.WARN:
      return SnackbarColors.WARN;

    case SnackbarVariant.ERROR:
      return SnackbarColors.ERROR;

    default:
      return SnackbarColors.DEFAULT;
  }
}

function Snackbar() {
  const [state, setState] = useState<State>({ visible: false });

  useEffect(() => {
    SnackbarManager.setListener((args: SnackbarManagerListenerArgs) =>
      setState({ visible: true, ...args })
    );
    return () => SnackbarManager.setListener(null);
  }, []);

  return (
    <PaperSnackbar
      visible={state.visible}
      onDismiss={() => setState({ ...state, visible: false })}
      duration={3000}
      theme={{
        colors: {
          primary: GetSnackBarBackgroundColor(state.variant),
        },
      }}
    >
      {state.title}
    </PaperSnackbar>
  );
}

export default Snackbar;
