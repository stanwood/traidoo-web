import * as yup from "yup";
import i18n from "../../../i18n";

const schema = yup.object().shape({
  firstName: yup.string().required(i18n.t("firstNameRequired")),
  lastName: yup.string().required(i18n.t("lastNameRequired")),
  phone: yup.string().required(i18n.t("phoneRequired")),
  email: yup
    .string()
    .email("Incorrect format")
    .required(i18n.t("emailRequired")),
  password: yup
    .string()
    .required(i18n.t("passwordRequired"))
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*()=-_+]{8,20}$/,
      i18n.t("incorrectPasswordFormat")
    ),
  birthday: yup.date().required(i18n.t("birthdayRequired")),
  nationalityCountryCode: yup.string().required(i18n.t("nationalityRequired")),
  residenceCountryCode: yup
    .string()
    .required(i18n.t("residenceCountryRequired")),
});

export default schema;
