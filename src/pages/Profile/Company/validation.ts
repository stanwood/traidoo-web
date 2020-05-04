import * as yup from "yup";
import i18n from "../../../i18n";

const buyerValidationSchema = yup.object().shape({
  companyName: yup.string().required(i18n.t("companyNameRequired")),
  companyType: yup.string().required(i18n.t("typeRequired")),
  companyRegistrationId: yup
    .string()
    .required(i18n.t("registryNumberRequired")),
  taxId: yup.string().required(i18n.t("taxIdRequired")),
  street: yup.string().required(i18n.t("streetRequired")),
  city: yup.string().required(i18n.t("cityRequired")),
  zip: yup.string().required(i18n.t("zipRequired")),
  isCertifiedOrganicProducer: yup.boolean(),
  organicControlBody: yup.string().when("isCertifiedOrganicProducer", {
    is: true,
    then: yup.string().required(i18n.t("organicCertificationIdRequired")),
  }),
  description: yup.string().required(i18n.t("descriptionRequired")),
});

const sellerValidationShema = buyerValidationSchema.shape({
  iban: yup.string().required(i18n.t("ibanRequired")),
  vatId: yup.string().required(i18n.t("vatIdRequired")),
});

export { buyerValidationSchema, sellerValidationShema };
