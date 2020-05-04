interface apiErrorMessage {
  code: string;
  message: string;
}

export default interface apiError {
  status: number;
  message?: apiErrorMessage | apiErrorMessage[];
}
