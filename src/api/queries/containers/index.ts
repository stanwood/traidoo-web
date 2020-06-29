import api from "../../../core/ky";
import { generateHeaders } from "../../headers";

export interface Container {
  id: number;
  deposit: number;
  image: string;
  sizeClass: string;
  standard: boolean;
  volume: number;
  deliveryFee: number;
  imageUrl: string;
}

export const getContainersRequest = async (
  key: string
): Promise<Container[]> => {
  return await api
    .get("container_types", {
      headers: generateHeaders(true),
    })
    .json();
};
