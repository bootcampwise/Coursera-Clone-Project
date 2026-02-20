import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { certificateApi } from "../../services/certificateApi";
import type { Certificate } from "../../types";

export const useCertificateVerify = () => {
  const { code } = useParams<{ code: string }>();
  const [data, setData] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVerify = async () => {
      if (!code) return;
      try {
        setLoading(true);
        const res = await certificateApi.verifyCertificate(code);
        setData(res);
        setError(null);
      } catch (err: unknown) {
        setError("Certificate not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchVerify();
  }, [code]);

  return {
    data,
    loading,
    error,
  };
};
