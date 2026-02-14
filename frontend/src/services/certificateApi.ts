import api from "./apiClient";
import { ENDPOINTS } from "./endpoints";

export const certificateApi = {
  getMyCertificates: async () => {
    const response = await api.get(ENDPOINTS.CERTIFICATES_MY);
    return response.data;
  },

  getCertificateById: async (id: string) => {
    const response = await api.get(ENDPOINTS.CERTIFICATES_BY_ID(id));
    return response.data;
  },

  downloadCertificate: async (id: string) => {
    const response = await api.get(ENDPOINTS.CERTIFICATES_DOWNLOAD(id), {
      responseType: "blob",
    });
    return response.data as Blob;
  },

  verifyCertificate: async (code: string) => {
    const response = await api.get(ENDPOINTS.CERTIFICATES_VERIFY(code));
    return response.data;
  },
};

















































