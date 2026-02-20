import portalApi from "../../../services/portalApiClient";
import { ENDPOINTS } from "../../../services/endpoints";
import type { LoginPayload } from "./types";

export const loginPortal = async (payload: LoginPayload) => {
  const { data } = await portalApi.post(ENDPOINTS.AUTH_LOGIN, payload);
  return data;
};
