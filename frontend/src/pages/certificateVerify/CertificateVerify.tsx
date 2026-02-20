import React from "react";
import { useCertificateVerify } from "./useCertificateVerify";

const CertificateVerify: React.FC = () => {
  const { data, loading, error } = useCertificateVerify();

  if (loading) {
    return <div className="p-10">Loading certificate...</div>;
  }

  if (error) {
    return <div className="p-10 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-dark-3">
      <div className="max-w-[900px] mx-auto px-6 py-12">
        <h1 className="text-[28px] font-bold mb-4">Certificate Verification</h1>
        <div className="border border-border rounded-[8px] p-6">
          <p className="text-[14px] text-text-gray mb-2">
            This certificate is valid and belongs to:
          </p>
          <p className="text-[18px] font-bold">
            {data?.learnerName || data?.userName}
          </p>
          <div className="mt-4 space-y-1 text-[14px] text-gray-dark-3">
            <p>
              Course: <span className="font-semibold">{data?.courseTitle}</span>
            </p>
            <p>
              Issued:{" "}
              <span className="font-semibold">
                {data?.issuedAt
                  ? new Date(data.issuedAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </p>
            <p>
              Partner:{" "}
              <span className="font-semibold">
                {data?.partnerName || "N/A"}
              </span>
            </p>
            <p>
              Verification Code:{" "}
              <span className="font-semibold">
                {data?.verificationCode || data?.credentialId}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateVerify;
