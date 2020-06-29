import * as yup from "yup";
import { Container } from "../../../../api/queries/containers";
import { Tag } from "../../../../api/queries/tags";
import { Category } from "../../../../core/interfaces/categories";
import DeliveryOption from "../../../../core/types/deliveryOption";
import Region from "../../../../core/types/region";
import i18n from "../../../../i18n";
import { ProductFormData } from "./types";

const addProductSchemaValidator: yup.ObjectSchema<ProductFormData> = yup
  .object({
    // General
    name: yup.string().trim().required(i18n.t("nameRequired")),
    category: yup.mixed<Category>().required(i18n.t("categoryRequired")),
    description: yup.string().trim().required(i18n.t("descriptionRequired")),
    // Image
    image: yup
      .mixed<File[]>()
      .test("image", i18n.t("imageRequired"), (value) => value.length > 0),
    // Properties
    isOrganic: yup.boolean().required(),
    isVegan: yup.boolean().required(),
    isGlutenFree: yup.boolean().required(),
    isGrazingAnimal: yup.boolean().required(),
    isGmoFree: yup.boolean().required(),
    // Pricing
    price: yup
      .number()
      .transform((value: any) => (isNaN(value) ? undefined : value))
      .positive(i18n.t("mustBeGreaterThanZero"))
      .required(i18n.t("priceRequired")),
    unit: yup.string().defined().typeError(i18n.t("unitRequired")),
    vat: yup.number().defined().typeError(i18n.t("vatRequired")),
    amount: yup
      .number()
      .transform((value: any) => (isNaN(value) ? undefined : value))
      .positive(i18n.t("mustBeGreaterThanZero"))
      .required(i18n.t("amountRequired")),
    // Delivery
    container: yup.mixed<Container>().required(i18n.t("containerTypeRequired")),
    deliveryCharge: yup.mixed().when("deliveryOptions", {
      is: (value) => {
        return value && value.find((v) => v.id === 1);
      },
      then: yup
        .number()
        .transform((value: any) => (isNaN(value) ? undefined : value))
        .positive(i18n.t("mustBeGreaterThanZero"))
        .required(i18n.t("priceRequired")),
    }),
    deliveryOptions: yup
      .array<DeliveryOption>()
      .ensure()
      .required(i18n.t("deliveryOptionsRequired")),
    // Availability
    regions: yup.array<Region>().notRequired(),
    // Internal
    sellersProductIdentifier: yup.string().notRequired(),
    tags: yup.array<Tag>().notRequired(),
    ean8: yup.string().notRequired(),
    ean13: yup.string().notRequired(),
  })
  .defined();

const editProductSchemaValidator = addProductSchemaValidator.shape({
  image: yup.mixed(),
});

export { editProductSchemaValidator, addProductSchemaValidator };
