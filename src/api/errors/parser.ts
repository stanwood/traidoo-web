import i18n from "../../i18n";
import apiError from "./interfaces";

const parseApiResponseError = (errorResponse: any) => {
  // TODO: add type
  let error: apiError = { status: errorResponse.status };

  if ([400, 401].includes(errorResponse.status)) {
    error["message"] = errorResponse.data;
  } else if (errorResponse.status === 500) {
    error["message"] = { code: "error", message: i18n.t("unknownError") };
  }

  return error;
};

export default parseApiResponseError;
