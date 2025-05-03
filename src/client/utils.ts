import {AxiosError} from "axios";


export type AxiosFastAPIError = {
    detail: string | string[];
    error: string;
}

export function parseAxiosErrors(error: AxiosError<AxiosFastAPIError>) {
    if (error.response?.data?.detail) {
      if (Array.isArray(error.response.data.detail)) {
        return  error.response.data.detail.join(', ');
      } else {
        return error.response.data.detail;
      }
    } else if (error.response?.data?.error) {
      return error.response.data.error;
    } else if (error.message) {
      return error.message;
    }
  }
