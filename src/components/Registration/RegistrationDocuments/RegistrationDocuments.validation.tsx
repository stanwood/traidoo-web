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

const validateFileSize = (files?: File[]): boolean => {
  let valid = true;

  if (files?.length && files.length > 0 && files[0].size > FILE_SIZE) {
    valid = false;
  }

  return valid;
};

const validateFileType = (types: string[], files?: File[]): boolean => {
  let valid = true;

  if (files?.length && files.length > 0 && !types.includes(files[0].type)) {
    valid = false;
  }

  return valid;
};

const validationSchema = yup.object().shape({
  declaredAsSeller: yup.bool().default(false).notRequired(),
  companyType: yup.string().notRequired(),
  termAndConditions: yup
    .bool()
    .oneOf([true], i18n.t("mustAcceptTermsAndConditions")),
  businessLicense: yup
    .mixed()
    .when(["companyType", "isDeclaredAsSeller"], {
      is: (companyType, isDeclaredAsSeller) =>
        requiredDocuments(false, companyType)?.includes("businessLicense") &&
        isDeclaredAsSeller,

      then: yup
        .mixed()
        .test(
          "businessLicense",
          i18n.t("businessLicenseRequired"),
          (value) => value.length > 0
        )
        .test("fileSize", i18n.t("fileTooLarge"), (value) =>
          validateFileSize(value)
        )
        .test("fileType", i18n.t("incorrectFileFormat"), (value) =>
          validateFileType(SUPPORTED_DOCUMENTS, value)
        ),
    })
    .when(["companyType", "isDeclaredAsSeller"], {
      is: (companyType, isDeclaredAsSeller) =>
        requiredDocuments(false, companyType)?.includes("businessLicense") &&
        !isDeclaredAsSeller,
      then: yup
        .mixed()
        .test("fileSize", i18n.t("fileTooLarge"), (value) =>
          validateFileSize(value)
        )
        .test("fileType", i18n.t("incorrectFileFormat"), (value) =>
          validateFileType(SUPPORTED_DOCUMENTS, value)
        ),
    }),
  identityProof: yup
    .mixed()
    .when(["companyType", "isDeclaredAsSeller"], {
      is: (companyType, isDeclaredAsSeller) =>
        requiredDocuments(false, companyType)?.includes("identityProof") &&
        isDeclaredAsSeller,
      then: yup
        .mixed()
        .test(
          "identityProof",
          i18n.t("identityProofRequired"),
          (value) => value.length > 0
        )
        .test("fileSize", i18n.t("fileTooLarge"), (value) =>
          validateFileSize(value)
        )
        .test("fileType", i18n.t("incorrectFileFormat"), (value) =>
          validateFileType(SUPPORTED_DOCUMENTS, value)
        ),
    })
    .when(["companyType", "isDeclaredAsSeller"], {
      is: (companyType, isDeclaredAsSeller) =>
        requiredDocuments(false, companyType)?.includes("identityProof") &&
        !isDeclaredAsSeller,
      then: yup
        .mixed()
        .test("fileSize", i18n.t("fileTooLarge"), (value) =>
          validateFileSize(value)
        )
        .test("fileType", i18n.t("incorrectFileFormat"), (value) =>
          validateFileType(SUPPORTED_DOCUMENTS, value)
        ),
    }),
  image: yup.mixed().when("declaredAsSeller", {
    is: true,
    then: yup
      .mixed()
      .test("image", i18n.t("companyLogoRequired"), (value) => value.length > 0)
      .test("fileSize", i18n.t("fileTooLarge"), (value) =>
        validateFileSize(value)
      )
      .test("fileType", i18n.t("incorrectFileFormat"), (value) =>
        validateFileType(SUPPORTED_IMAGES, value)
      ),
  }),
  registrationProof: yup
    .mixed()
    .when(["companyType", "isDeclaredAsSeller"], {
      is: (companyType, isDeclaredAsSeller) =>
        requiredDocuments(false, companyType)?.includes("registrationProof") &&
        isDeclaredAsSeller,
      then: yup
        .mixed()
        .test(
          "registrationProof",
          i18n.t("registrationProofRequired"),
          (value) => value.length > 0
        )
        .test("fileSize", i18n.t("fileTooLarge"), (value) =>
          validateFileSize(value)
        )
        .test("fileType", i18n.t("incorrectFileFormat"), (value) =>
          validateFileType(SUPPORTED_DOCUMENTS, value)
        ),
    })
    .when(["companyType", "isDeclaredAsSeller"], {
      is: (companyType, isDeclaredAsSeller) =>
        requiredDocuments(false, companyType)?.includes("registrationProof") &&
        !isDeclaredAsSeller,
      then: yup
        .mixed()
        .test("fileSize", i18n.t("fileTooLarge"), (value) =>
          validateFileSize(value)
        )
        .test("fileType", i18n.t("incorrectFileFormat"), (value) =>
          validateFileType(SUPPORTED_DOCUMENTS, value)
        ),
    }),
  articlesOfAssociation: yup
    .mixed()
    .when(["companyType", "isDeclaredAsSeller"], {
      is: (companyType, isDeclaredAsSeller) =>
        requiredDocuments(false, companyType)?.includes(
          "articlesOfAssociation"
        ) && isDeclaredAsSeller,
      then: yup
        .mixed()
        .test(
          "articlesOfAssociation",
          i18n.t("articlesOfAssociationRequired"),
          (value) => value.length > 0
        )
        .test("fileSize", i18n.t("fileTooLarge"), (value) =>
          validateFileSize(value)
        )
        .test("fileType", i18n.t("incorrectFileFormat"), (value) =>
          validateFileType(SUPPORTED_DOCUMENTS, value)
        ),
    })
    .when(["companyType", "isDeclaredAsSeller"], {
      is: (companyType, isDeclaredAsSeller) =>
        requiredDocuments(false, companyType)?.includes(
          "articlesOfAssociation"
        ) && !isDeclaredAsSeller,
      then: yup
        .mixed()
        .test("fileSize", i18n.t("fileTooLarge"), (value) =>
          validateFileSize(value)
        )
        .test("fileType", i18n.t("incorrectFileFormat"), (value) =>
          validateFileType(SUPPORTED_DOCUMENTS, value)
        ),
    }),
});

export default validationSchema;
