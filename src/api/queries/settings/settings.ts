import axios from "../../../core/axios";
import { Settings } from "../../../core/interfaces/settings";

export const getSettingsRequest = async (): Promise<Settings> => {
  const response = await axios.get("settings");
  return response.data;
};
