import * as yup from "yup";
import i18n from "../../i18n";

const schema = yup.object().shape({
  quantity: yup
    .number()
    .transform((value: any) => (isNaN(value) ? undefined : value))
    .required(i18n.t("quantityRequired")),
  latestDeliveryDate: yup.date().required(i18n.t("latestDeliveryDateRequired")),
});

export default schema;
