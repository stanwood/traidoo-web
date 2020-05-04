export interface RegistrationPost {
  city: string;
  street: string;
  firstName: string;
  lastName: string;
  email: string;
  iban: string;
  residenceCountryCode: string;
  birthday: string;
  nationalityCountryCode: string;
  companyName: string;
  zip: string;
  companyType: string;
  password: string;
  phone: string;
  businessLicense: Blob;
  companyRegistrationId: string;
  vatID: string;
  taxID: string;
  invoiceCity: string;
  invoiceZip: string;
  isCertifiedOrganicProducer: boolean;
  organicCertificationId: string;
  image: File;
  companyLogoFile: File;
  registrationFile: File;
  declaredAsSeller: boolean;
}
