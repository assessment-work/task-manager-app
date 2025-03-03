enum TaskStatusDTO {
  COMPLETED = "COMPLETED",
  NOT_COMPLETED = "NOT_COMPLETED",
}

enum SnackbarVariant {
  DEFAULT = "DEFAULT",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  WARN = "WARN",
  INFO = "INFO",
}

enum TaskDetailPageMode {
  VIEW = "VIEW",
  EDIT = "EDIT",
}

export { TaskStatusDTO, SnackbarVariant, TaskDetailPageMode };

export * from "./Colors";
export * from "./StorageKeys";
