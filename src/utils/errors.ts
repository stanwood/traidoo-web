import i18n from "../i18n";

export function required(displayName: string) {
  return function validateRequired(value: string) {
    return value !== null || `${displayName} ${i18n.t("isRequired")}.`;
  };
}

export function getErrorMessage(
  field: string,
  formErrors: any,
  apiErrors: any
): string {
  if (formErrors[field]) {
    return formErrors[field];
  } else if (apiErrors[field]) {
    return apiErrors[field];
  }

  return "";
}
