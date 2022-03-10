import axios from "axios";
import { baseUrl } from "../constants/Config";

export const getUserHoldings = async (userId, token) => {
  const result = await axios.post(
    `${baseUrl}api/get_user_holdings`,
    { userId },
    { headers: { "auth-token": token } }
  );
  if (result.data.success) {
    return { success: true, data: result.data.result.data, error: "" };
  } else return { success: false, data: null, error: result.data.result.error };
};
