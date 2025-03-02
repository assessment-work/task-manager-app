import { SnackbarManagerListenerArgs } from "@/types";

type Listener = (args: SnackbarManagerListenerArgs) => void;

class SnackbarManager {
  listener: Listener | null = null;

  constructor() {
    this.show = this.show.bind(this);
    this.setListener = this.setListener.bind(this);
  }

  setListener(listener: Listener | null): void {
    this.listener = listener;
  }

  show(args: SnackbarManagerListenerArgs): void {
    this.listener?.(args);
  }
}

export default new SnackbarManager();
