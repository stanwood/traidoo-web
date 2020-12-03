import * as yup from "yup";
import i18n from "../../../i18n";

const schema = yup.object().shape({
  companyName: yup.string().required(i18n.t("companyNameRequired")),
  companyType: yup.string().required(i18n.t("companyTypeRequired")),
  taxID: yup.string().required(i18n.t("taxIdRequired")),
  companyRegistrationId: yup
    .string()
    .when("$companyID", (companyID: boolean, schema: any) => {
      return companyID
        ? schema.required(i18n.t("fieldRequired"))
        : schema.notRequired();
    }),
  street: yup.string().required(i18n.t("streetRequired")),
  city: yup.string().required(i18n.t("cityRequired")),
  zip: yup.string().required(i18n.t("zipRequired")),
  isCertifiedOrganicProducer: yup.bool().notRequired(),
  organicCertificationId: yup.string().when("isCertifiedOrganicProducer", {
    is: true,
    then: yup.string().required(i18n.t("organicCertificationIdRequired")),
  }),
  declaredAsSeller: yup.bool().notRequired(),
  vatID: yup.string().when("declaredAsSeller", {
    is: true,
    then: yup.string().required(i18n.t("vatIdRequired")),
  }),
  iban: yup.string().when("declaredAsSeller", {
    is: true,
    then: yup.string().required(i18n.t("ibanRequired")),
  }),
});

export default schema;
