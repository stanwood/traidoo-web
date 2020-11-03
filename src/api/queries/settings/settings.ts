import axios from "../../../core/axios";

interface Settings {
  minPurchaseValue: number;
}

export const getSettingsRequest = async (): Promise<Settings> => {
  const response = await axios.get("settings");
  return response.data;
};
