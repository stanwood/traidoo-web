import axios from "../../../core/axios";

type StaticPageData = {
  body: string;
};

export const getTermsOfServiceRequest = async (): Promise<StaticPageData> => {
  const response = await axios.get("regions/static/terms_of_services");
  return response.data;
};

export const getPrivacyPolicyRequest = async (): Promise<StaticPageData> => {
  const response = await axios.get("regions/static/privacy_policy");
  return response.data;
};

export const getPricesRequest = async (): Promise<StaticPageData> => {
  const response = await axios.get("regions/static/prices");
  return response.data;
};

export const getContactRequest = async (): Promise<StaticPageData> => {
  const response = await axios.get("regions/static/contact");
  return response.data;
};

export const getImprintRequest = async (): Promise<StaticPageData> => {
  const response = await axios.get("regions/static/imprint");
  return response.data;
};
