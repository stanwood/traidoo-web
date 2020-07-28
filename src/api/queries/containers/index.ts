import axios from "../../../core/axios";

export interface Container {
  id: number;
  deposit: number;
  image: string;
  sizeClass: string;
  standard: boolean;
  volume: number;
  deliveryFee: number;
}

export const getContainersRequest = async (
  key: string
): Promise<Container[]> => {
  const response = await axios.get("container_types");
  return response.data;
};
