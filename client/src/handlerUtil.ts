import { HTTPException } from "./HTTPException";

interface ErrorResponse {
  code: number;
  success: boolean;
  message: string;
}

export const handleError = (err: Error): ErrorResponse => {
  if (err instanceof HTTPException) {
    return { success: false, message: err.message, code: err.status };
  }
  return { success: false, message: "Internal Server Error", code: 500 };
};
