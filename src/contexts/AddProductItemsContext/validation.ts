import * as yup from "yup";
import i18n from "../../i18n";

const addProductItemsValidationSchema = yup.object().shape({
  quantity: yup
    .number()
    .positive(i18n.t("mustBeGreaterThanZero"))
    .transform((value: any) => (isNaN(value) ? undefined : value))
    .required(i18n.t("quantityRequired")),
  latestDeliveryDate: yup.date().required(i18n.t("latestDeliveryDateRequired")),
});

export default addProductItemsValidationSchema;
