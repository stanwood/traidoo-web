import * as yup from "yup";
import i18n from "../../i18n";

const schema = yup.object().shape({
  street: yup.string().required(i18n.t("streetRequired")),
  city: yup.string().required(i18n.t("cityRequired")),
  zip: yup.string().required(i18n.t("zipRequired")),
  companyName: yup.string().required(i18n.t("companyNameRequired")),
});

export default schema;
