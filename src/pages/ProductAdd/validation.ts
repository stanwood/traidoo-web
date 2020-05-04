import * as yup from "yup";
import i18n from "../../i18n";

const SUPPORTED_IMAGES = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const schema = yup.object().shape({
  // General
  name: yup.string().required(i18n.t("nameRequired")),
  categoryId: yup.number().required(i18n.t("categoryRequired")),
  description: yup.string().required(i18n.t("descriptionRequired")),
  // Image
  image: yup
    .mixed()
    .test("image", i18n.t("imageRequired"), (value) => value.length > 0),
  // Properties
  isOrganic: yup.boolean(),
  isVegan: yup.boolean(),
  isGlutenFree: yup.boolean(),
  isGrazingAnimal: yup.boolean(),
  isGmoFree: yup.boolean(),
  // Pricing
  price: yup
    .number()
    .transform((value: any) => (isNaN(value) ? undefined : value))
    .required(i18n.t("priceRequired")),
  unit: yup.string().required(i18n.t("unitRequired")),
  vat: yup.number().required(i18n.t("vatRequired")),
  amount: yup
    .number()
    .transform((value: any) => (isNaN(value) ? undefined : value))
    .required(i18n.t("amountRequired")),
  // Delivery
  containerTypeId: yup.number().required(i18n.t("containerTypeRequired")),
  deliveryCharge: yup.mixed().when("deliveryOptionsIds", {
    is: (value) => value && value.includes(1),
    then: yup
      .number()
      .transform((value: any) => (isNaN(value) ? undefined : value))
      .required(i18n.t("priceRequired")),
  }),
  deliveryOptionsIds: yup
    .array()
    .of(yup.number())
    .required(i18n.t("deliveryOptionsRequired")),
  // Availability
  regionsIds: yup.array().of(yup.number()),
  // Internal
  sellersProductIdentifier: yup.string().notRequired(),
  tags: yup.array().of(yup.string()).notRequired(),
  ean8: yup.string().notRequired(),
  ean13: yup.string().notRequired(),
});

export default schema;
