import * as yup from "yup";
import i18n from "../../i18n";

const schema = yup.object().shape({
  password: yup
    .string()
    .required(i18n.t("passwordRequired"))
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*()=-_+]{8,20}$/,
      i18n.t("incorrectPasswordFormat")
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], i18n.t("passwordsMustMatch")),
});

export default schema;
