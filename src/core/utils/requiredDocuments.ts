import companyTypes from "../../data/CompanyTypes/de.json";

const requiredDocuments = (seller: boolean, companyType: string) => {
  let fields = ["businessLicense"];

  const selectedCompanyParentId =
    companyTypes.find((company) => company.value === companyType)?.parent || -1;

  if (seller) {
    fields.push("image");
  }

  switch (selectedCompanyParentId) {
    case 1:
      return [...fields, "identityProof"];
    case 2:
      return [...fields, "identityProof", "registrationProof"];
    case 3:
      return [...fields, "identityProof", "registrationProof"];
    case 4:
      return [
        ...fields,
        "identityProof",
        "registrationProof",
        "articlesOfAssociation",
      ];
    case 5:
      return [
        ...fields,
        "identityProof",
        "registrationProof",
        "articlesOfAssociation",
      ];
  }
};

export default requiredDocuments;
