import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

type StaticPageData = {
  body: string;
};

export const getTermsOfServiceRequest = async (): Promise<StaticPageData> => {
  return await api
    .get("regions/static/terms_of_services", {
      headers: generateHeaders(true),
    })
    .json();
};

export const getPrivacyPolicyRequest = async (): Promise<StaticPageData> => {
  return await api
    .get("regions/static/privacy_policy", {
      headers: generateHeaders(true),
    })
    .json();
};

export const getPricesRequest = async (): Promise<StaticPageData> => {
  return await api
    .get("regions/static/prices", {
      headers: generateHeaders(true),
    })
    .json();
};

export const getContactRequest = async (): Promise<StaticPageData> => {
  return await api
    .get("regions/static/contact", {
      headers: generateHeaders(true),
    })
    .json();
};

export const getImprintRequest = async (): Promise<StaticPageData> => {
  return await api
    .get("regions/static/imprint", {
      headers: generateHeaders(true),
    })
    .json();
};
