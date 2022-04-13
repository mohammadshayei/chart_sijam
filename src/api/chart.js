import axios from "axios";
import { baseUrl } from "../constants/Config";

export const onDeleteChart = async (userId, token) => {
  const result = await axios.post(
    `${baseUrl}api/delete_chart`,
    { userId },
    { headers: { "auth-token": token } }
  );
  if (result.data.success) {
    return { success: true, data: result.data.message.result, error: "" };
  } else
    return { success: false, data: null, error: result.data.message.error };
};
export const fetchData = async (payload, token) => {
  const result = await axios.post(
    `${baseUrl}api/get_data`,
    { ...payload },
    { headers: { "auth-token": token } }
  );
  if (result.data.success) {
    return { success: true, data: result.data.result, error: "" };
  } else
    return { success: false, data: null, error: result.data.message.error };
};
