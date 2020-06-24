import api from "../../core/ky";
import { generateHeaders } from "../headers";

export interface Overlay {
  overlayType:
    | "anonymous"
    | "not_verified"
    | "not_cooperative"
    | "not_approved";
  title: string;
  subtitle: string;
  body: string;
  avatar: string;
  image: string;
  buttons: {
    title: string;
    url: string;
    order: number;
  }[];
}

export const getOverlaysRequest = async (): Promise<Overlay[]> => {
  return await api
    .get("overlays", {
      headers: generateHeaders(false),
    })
    .json();
};
