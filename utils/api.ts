import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import SnackbarManager from "@/components/SnackbarManager";
import { SnackbarVariant } from "@/constants";
import { ErrorResponseDTO } from "@/dtos";
import { storage } from "./storage";

function replaceUrlVariables<T>(
  url: string,
  data?: Partial<Record<keyof T, string | number>>
) {
  if (!data) {
    return url;
  }

  const regex = new RegExp(":(" + Object.keys(data).join("|") + ")", "g");

  return url.replace(regex, (pathVariable: string, dataKey$1: keyof T) => {
    return typeof data[dataKey$1] === "string"
      ? data[dataKey$1]
      : data[dataKey$1]?.toString() || pathVariable;
  });
}

async function handleApiErrors(error: FetchBaseQueryError) {
  let message = "Something went wrong";

  if (typeof error.status === "string") {
    switch (error.status) {
      case "FETCH_ERROR":
        message = "Network request failed";
        break;

      default:
        break;
    }
  }

  if (typeof error.status === "number") {
    if (error.status === 401) {
      await storage.clearAll();
    }

    const err: ErrorResponseDTO = error.data as ErrorResponseDTO;

    message = err.error;
  }

  SnackbarManager.show({ title: message, variant: SnackbarVariant.ERROR });
}

export { replaceUrlVariables, handleApiErrors };
