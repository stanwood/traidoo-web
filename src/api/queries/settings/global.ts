import axios from "../../../core/axios";
import { GlobalSettings } from "../../../core/interfaces/settings";

export const getGlobalSettingsRequest = async (): Promise<GlobalSettings> => {
  const response = await axios.get("global_settings");
  return response.data;
};
