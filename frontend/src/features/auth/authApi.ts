import api from "../../services/apiClient";
import { ENDPOINTS } from "../../services/endpoints";

export const login = async (payload: { email: string; password: string }) => {
  const { data } = await api.post(ENDPOINTS.AUTH_LOGIN, payload);
  return data;
};

export const register = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  const { data } = await api.post(ENDPOINTS.AUTH_REGISTER, payload);
  return data;
};

export const syncGoogleUser = async (payload: {
  email: string;
  name: string;
  providerId: string;
  avatarUrl?: string;
}) => {
  const { data } = await api.post(ENDPOINTS.USERS_SYNC_GOOGLE, payload);
  return data;
};
