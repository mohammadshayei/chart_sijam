import axios from "axios";
import { baseUrl } from "../constants/Config";

export const grantAccessToEmployee = async (payload, token) => {
  const result = await axios.post(
    `${baseUrl}api/grant_access_employee`,
    { ...payload },
    { headers: { "auth-token": token } }
  );
  if (result.data.success) {
    return { success: true, data: result.data.result.message, error: "" };
  } else
    return { success: false, data: null, error: result.data.result.message };
};
export const getEmployeesChart = async (payload, token) => {
  const result = await axios.post(
    `${baseUrl}api/get_employees_chart`,
    { ...payload },
    { headers: { "auth-token": token } }
  );
  if (result.data.success) {
    return { success: true, data: result.data.result.employees, error: "" };
  } else
    return { success: false, data: null, error: result.data.result.message };
};
