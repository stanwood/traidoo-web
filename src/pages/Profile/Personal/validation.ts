import * as yup from "yup";
import i18n from "../../../i18n";

const schema = yup.object().shape({
  firstName: yup.string().required(i18n.t("firstNameRequired")),
  lastName: yup.string().required(i18n.t("lastNameRequired")),
  email: yup
    .string()
    .email(i18n.t("incorrectFormat"))
    .required(i18n.t("emailRequired")),
  birthday: yup.date().required(i18n.t("birthdayRequired")),
  nationalityCountryCode: yup.string().required(i18n.t("nationalityRequired")),
  residenceCountryCode: yup.string().required(i18n.t("countryRequired")),
  phone: yup.string().required(i18n.t("phoneRequired")),
  invoiceEmail: yup.string().email(i18n.t("incorrectFormat")),
});

export default schema;
