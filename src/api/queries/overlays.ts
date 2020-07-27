import axios from "../../core/axios";

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
  const response = await axios.get("overlays");
  return response.data;
};
