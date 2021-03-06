import * as yup from "yup";
import i18n from "../../i18n";

const schema = yup.object().shape({
  email: yup
    .string()
    .email(i18n.t("incorrectFormat"))
    .required(i18n.t("emailRequired")),
});

export default schema;
