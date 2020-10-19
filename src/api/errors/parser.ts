import i18n from "../../i18n";

interface APIValidationError {
  message: string;
  code: string;
}

interface APIError {
  status: number;
  data: Record<string, APIValidationError[]>
}

export interface APIValidationErrors {
  fieldName: string;
  code: string;
  message: string;
}

const codesMapping: Record<string, string> = {
  "required": i18n.t("fieldRequired")
};

export const parseAPI400ResponseError = (errorResponse: APIError): APIValidationErrors[] => {
  const errors: APIValidationErrors[] = [];

  Object.entries(errorResponse.data).forEach(
    ([field, errorMessage]: [string, APIValidationError[]]) => {
      errors.push({fieldName: field, code: errorMessage[0].code, message: codesMapping[errorMessage[0].code]})
    }
  );

  return errors;
};
