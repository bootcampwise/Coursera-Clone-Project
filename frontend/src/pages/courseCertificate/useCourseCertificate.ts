import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { certificateApi } from "../../services/certificateApi";
import type { Certificate } from "../../types";

export const useCourseCertificate = () => {
  const { id } = useParams<{ id: string }>();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificate = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await certificateApi.getCertificateById(id);
        setCertificate(data);
      } catch (err) {
        // Load certificate failed
      } finally {
        setLoading(false);
      }
    };
    fetchCertificate();
  }, [id]);

  const verifyUrl = certificate?.verificationCode
    ? `${window.location.origin}/verify/${certificate.verificationCode}`
    : "";

  const backendOrigin = (() => {
    if (import.meta.env.VITE_API_BASE_URL) {
      return import.meta.env.VITE_API_BASE_URL.replace(/\/api\/v1\/?$/, "");
    }
    if (window.location.hostname === "localhost") {
      return "http://localhost:5000";
    }
    return window.location.origin;
  })();

  const formatCompletionDate = (value?: string) => {
    if (!value) return "N/A";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const normalizeOutcomes = (value?: string | string[]) => {
    if (!value) return [];
    if (Array.isArray(value)) {
      return value.map((point) => point.trim()).filter(Boolean);
    }
    return value
      .split(/\r?\n|;|â€¢|\u2022|- /g)
      .map((point) => point.trim())
      .filter(Boolean);
  };

  const learningPoints = (() => {
    const points = normalizeOutcomes(certificate?.course?.outcomes);
    if (points.length > 0) return points;
    return normalizeOutcomes(
      certificate?.course?.description?.substring(0, 100)
    );
  })();

  const handleDownload = async () => {
    if (!id) return;
    try {
      const blob = await certificateApi.downloadCertificate(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${certificate?.courseTitle || "certificate"}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      // Download certificate failed
    }
  };

  const handleShare = async () => {
    if (!verifyUrl) return;
    try {
      await navigator.clipboard.writeText(verifyUrl);
    } catch (err) {
      // Copy link failed
    }
  };

  return {
    id,
    certificate,
    loading,
    verifyUrl,
    backendOrigin,
    formatCompletionDate,
    learningPoints,
    handleDownload,
    handleShare,
  };
};
