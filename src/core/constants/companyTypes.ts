const companyTypeA = [
  {
    label: "Natürliche Person",
    value: 1,
  },
  {
    label: "Einzelunternehmer",
    value: "Einzelunternehmer",
    parent: 1,
  },
  {
    label: "Landwirtschaftliche GbR",
    value: 2,
  },
  {
    label: "Landwirtschaftliche GbR",
    value: "Landwirtschaftliche GbR",
    parent: 2,
  },
  {
    label: "Einzelunternehmer",
    value: 3,
  },
  {
    label: "Gewerbliche GbR",
    value: "Gewerbliche GbR",
    parent: 3,
  },
  {
    label: "Firmen",
    value: 4,
  },
  {
    label: "eG",
    value: "eG",
    parent: 4,
  },
  {
    label: "KG",
    value: "KG",
    parent: 4,
  },
  {
    label: "AG",
    value: "AG",
    parent: 4,
  },
  {
    label: "GmbH",
    value: "GmbH",
    parent: 4,
  },
  {
    label: "GmbH & Co. KG",
    value: "GmbH & Co. KG",
    parent: 4,
  },
  {
    label: "UG (haftungsbeschränkt)",
    value: "UG (haftungsbeschränkt)",
    parent: 4,
  },
  {
    label: "OHG",
    value: "OHG",
    parent: 4,
  },
  {
    label: "Organisations",
    value: 5,
  },
  {
    label: "e.V.",
    value: "e.V.",
    parent: 5,
  },
];

const companyTypeB = [
  {
    label: "Natürliche Person",
    value: 1,
  },
  {
    label: "Einzelunternehmer",
    value: "Einzelunternehmer",
    parent: 1,
  },
  {
    label: "Firmen",
    value: 2,
  },
  {
    label: "AG",
    value: "AG",
    parent: 2,
  },
  {
    label: "GmbH",
    value: "GmbH",
    parent: 2,
  },
  {
    label: "Kollektivgesellschaft",
    value: "Kollektivgesellschaft",
    parent: 2,
  },
  {
    label: "Kommanditgesellschaft",
    value: "Kommanditgesellschaft",
    parent: 2,
  },
  {
    label: "Organisations",
    value: 3,
  },
  {
    label: "Genossenschaft",
    value: "Genossenschaft",
    parent: 3,
  },
  {
    label: "Verein",
    value: "Verein",
    parent: 3,
  },
];

const getCompanyTypes = (companyTypesVariant: "A" | "B" | null) => {
  if (!companyTypesVariant) {
    return companyTypeA;
  }
  
  return companyTypesVariant === "B" ? companyTypeB : companyTypeA;
}

export default getCompanyTypes;
