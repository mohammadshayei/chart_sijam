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
export const getAccessHolding = async (payload, token) => {
  const result = await axios.post(
    `${baseUrl}api/get_access_employee`,
    { ...payload },
    { headers: { "auth-token": token } }
  );
  if (result.data.success) {
    return { success: true, data: result.data.result, error: "" };
  } else
    return { success: false, data: null, error: result.data.result.message };
};
export const getParentsChart = async (payload, token) => {
  const result = await axios.post(
    `${baseUrl}api/get_parents_charts`,
    { ...payload },
    { headers: { "auth-token": token } }
  );
  if (result.data.success) {
    return { success: true, data: result.data.result.comapnies, error: "" };
  } else
    return { success: false, data: null, error: result.data.result.message };
};
export const changeAccessChartEmployee = async (payload, token) => {
  const result = await axios.post(
    `${baseUrl}api/change_access_chart_employee`,
    { ...payload },
    { headers: { "auth-token": token } }
  );
  if (result.data.success) {
    return { success: true, data: result.data.result.message, error: "" };
  } else
    return { success: false, data: null, error: result.data.result.message };
};
export const createCategory = async (payload, token) => {
  const result = await axios.post(
    `${baseUrl}api/create_category`,
    { ...payload },
    { headers: { "auth-token": token } }
  );
  if (result.data.success) {
    return { success: true, data: result.data.result, error: "" };
  } else
    return { success: false, data: null, error: result.data.result.message };
};
export const deleteCategory = async (payload, token) => {
  const result = await axios.post(
    `${baseUrl}api/delete_category`,
    { ...payload },
    { headers: { "auth-token": token } }
  );
  if (result.data.success) {
    return { success: true, data: result.data.result.message, error: "" };
  } else
    return { success: false, data: null, error: result.data.result.message };
};
export const addRemoveChartToCategories = async (payload, token) => {
  const result = await axios.post(
    `${baseUrl}api/add_chart_to_categories`,
    { ...payload },
    { headers: { "auth-token": token } }
  );
  if (result.data.success) {
    return { success: true, data: result.data.result, error: "" };
  } else
    return { success: false, data: null, error: result.data.result.message };
};
