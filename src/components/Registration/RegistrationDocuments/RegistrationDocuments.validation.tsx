import * as yup from "yup";
import requiredDocuments from "../../../core/utils/requiredDocuments";
import i18n from "../../../i18n";

const FILE_SIZE = 4194304;
const SUPPORTED_IMAGES = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const SUPPORTED_DOCUMENTS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
  "application/pdf",
];

const validationSchema = yup.object().shape({
  declaredAsSeller: yup.bool().default(false).notRequired(),
  companyType: yup.string().notRequired(),
  termAndConditions: yup
    .bool()
    .oneOf([true], i18n.t("mustAcceptTermsAndConditions")),
  businessLicense: yup.mixed().when("companyType", {
    is: (value) => requiredDocuments(false, value)?.includes("businessLicense"),
    then: yup
      .mixed()
      .test(
        "businessLicense",
        i18n.t("businessLicenseRequired"),
        (value) => value.length > 0
      )
      .test(
        "fileSize",
        i18n.t("fileTooLarge"),
        (value) => value.length > 0 && value[0].size <= FILE_SIZE
      )
      .test(
        "fileType",
        i18n.t("incorrectFileFormat"),
        (value) =>
          value.length > 0 && SUPPORTED_DOCUMENTS.includes(value[0].type)
      ),
  }),
  identityProof: yup.mixed().when("companyType", {
    is: (value) => requiredDocuments(false, value)?.includes("identityProof"),
    then: yup
      .mixed()
      .test(
        "identityProof",
        i18n.t("identityProofRequired"),
        (value) => value.length > 0
      )
      .test(
        "fileSize",
        i18n.t("fileTooLarge"),
        (value) => value.length > 0 && value[0].size <= FILE_SIZE
      )
      .test(
        "fileType",
        i18n.t("incorrectFileFormat"),
        (value) =>
          value.length > 0 && SUPPORTED_DOCUMENTS.includes(value[0].type)
      ),
  }),
  image: yup.mixed().when("declaredAsSeller", {
    is: true,
    then: yup
      .mixed()
      .test("image", "companyLogoRequired", (value) => value.length > 0)
      .test(
        "fileSize",
        i18n.t("fileTooLarge"),
        (value) => value.length > 0 && value[0].size <= FILE_SIZE
      )
      .test(
        "fileType",
        i18n.t("incorrectFileFormat"),
        (value) => value.length > 0 && SUPPORTED_IMAGES.includes(value[0].type)
      ),
  }),
  registrationProof: yup.mixed().when("companyType", {
    is: (value) =>
      requiredDocuments(false, value)?.includes("registrationProof"),
    then: yup
      .mixed()
      .test(
        "registrationProof",
        i18n.t("registrationProofRequired"),
        (value) => value.length > 0
      )
      .test(
        "fileSize",
        i18n.t("fileTooLarge"),
        (value) => value.length > 0 && value[0].size <= FILE_SIZE
      )
      .test(
        "fileType",
        i18n.t("incorrectFileFormat"),
        (value) =>
          value.length > 0 && SUPPORTED_DOCUMENTS.includes(value[0].type)
      ),
  }),
  articlesOfAssociation: yup.mixed().when("companyType", {
    is: (value) =>
      requiredDocuments(false, value)?.includes("articlesOfAssociation"),
    then: yup
      .mixed()
      .test(
        "articlesOfAssociation",
        i18n.t("articlesOfAssociationRequired"),
        (value) => value.length > 0
      )
      .test(
        "fileSize",
        i18n.t("fileTooLarge"),
        (value) => value.length > 0 && value[0].size <= FILE_SIZE
      )
      .test(
        "fileType",
        i18n.t("incorrectFileFormat"),
        (value) =>
          value.length > 0 && SUPPORTED_DOCUMENTS.includes(value[0].type)
      ),
  }),
});

export default validationSchema;
