import axios from "../../../core/axios";
import DeliveryAddress from "../../../core/interfaces/deliveryAddress";

export const getUserPersonalProfileRequest = async () => {
  const response = await axios.get("users/profile/personal");
  return response.data;
};

export const updateUserPersonalProfileRequest = async (data: any) => {
  const response = await axios.patch("users/profile/personal", data);
  return response.data;
};

export const getUserCompanyProfileRequest = async (): Promise<{
  companyName: string;
  companyType: string;
  iban: string;
  companyRegistrationId: string;
  vatId: string;
  taxId: string;
  isCertifiedOrganicProducer: boolean;
  organicControlBody: string;
  description: string;
  zip: string;
  street: string;
  city: string;
}> => {
  const response = await axios.get("users/profile/company");
  return response.data;
};

export const updateUserCompanyProfileRequest = async (data: any) => {
  const response = await axios.patch("users/profile/company", data);
  return response.data;
};

export const getUserDeliveryAddressesRequest = async (): Promise<
  DeliveryAddress[]
> => {
  const response = await axios.get("delivery_addresses");
  return response.data;
};

export const createUserDeliveryAddressRequest = async (data: any) => {
  const response = await axios.post("delivery_addresses", data);
  return response.data;
};

export const deleteUserDeliveryAddressRequest = async (id: number) => {
  const response = await axios.delete(`delivery_addresses/${id}`);
  return response.data;
};

export const getUserDocumentsRequest = async () => {
  const response = await axios.get("users/profile/documents");
  return response.data;
};

export const updateUserDocumentRequest = async (name: string, file: File) => {
  const formData = new FormData();
  formData.append(name, file);

  const response = await axios.patch("users/profile/documents", formData);
  return response.data;
};

export const getUserMangopayDocumentsRequest = async () => {
  const response = await axios.get("users/profile/documents/mangopay");
  return response.data;
};

export const updateUserMangopayDocumentRequest = async (
  name: string,
  file: File
) => {
  const formData = new FormData();
  formData.append("document_type", name);
  formData.append("file", file);

  const response = axios.post("users/profile/documents/mangopay", formData);
  return (await response).data;
};
