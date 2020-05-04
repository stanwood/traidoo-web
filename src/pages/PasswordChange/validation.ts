import * as yup from "yup";
import i18n from "../../i18n";

const schema = yup.object().shape({
  password: yup
    .string()
    .required(i18n.t("newPasswordRequired"))
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*()=-_+]{8,20}$/,
      i18n.t("incorrectPasswordFormat")
    ),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], i18n.t("passwordsMustMatch")),
  currentPassword: yup.string().required(i18n.t("currentPasswordRequired")),
});

export default schema;
