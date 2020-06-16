import DeliveryAddress from "../../../core/interfaces/deliveryAddress";
import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

export const getUserPersonalProfileRequest = async () => {
  return await api
    .get("users/profile/personal", { headers: generateHeaders() })
    .json();
};

export const updateUserPersonalProfileRequest = async (data: any) => {
  return await api
    .patch("users/profile/personal", {
      headers: generateHeaders(),
      json: data,
    })
    .json();
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
  return await api
    .get("users/profile/company", { headers: generateHeaders() })
    .json();
};

export const updateUserCompanyProfileRequest = async (data: any) => {
  return await api
    .patch("users/profile/company", {
      headers: generateHeaders(),
      json: data,
    })
    .json();
};

export const getUserDeliveryAddressesRequest = async (): Promise<
  DeliveryAddress[]
> => {
  return await api
    .get("delivery_addresses", { headers: generateHeaders() })
    .json();
};

export const createUserDeliveryAddressRequest = async (data: any) => {
  return await api
    .post("delivery_addresses", {
      headers: generateHeaders(),
      json: data,
    })
    .json();
};

export const deleteUserDeliveryAddressRequest = async (id: number) => {
  return await api
    .delete(`delivery_addresses/${id}`, {
      headers: generateHeaders(),
    })
    .json();
};

export const getUserDocumentsRequest = async () => {
  return await api
    .get("users/profile/documents", { headers: generateHeaders() })
    .json();
};

export const updateUserDocumentRequest = async (name: string, file: File) => {
  const formData = new FormData();
  formData.append(name, file);

  return await api.patch("users/profile/documents", {
    body: formData, // TODO: add type
    headers: generateHeaders(true, true),
  });
};

export const getUserMangopayDocumentsRequest = async () => {
  return await api
    .get("users/profile/documents/mangopay", { headers: generateHeaders() })
    .json();
};

export const updateUserMangopayDocumentRequest = async (
  name: string,
  file: File
) => {
  const formData = new FormData();
  formData.append("document_type", name);
  formData.append("file", file);

  return api.post("users/profile/documents/mangopay", {
    body: formData, // TODO: add type
    headers: generateHeaders(true, true),
  });
};
