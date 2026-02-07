import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { certificateApi } from "../../services/certificateApi";

const CertificateVerify: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [data, setData] = useState<any>(null);
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
      } catch (err: any) {
        setError("Certificate not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchVerify();
  }, [code]);

  if (loading) {
    return <div className="p-10">Loading certificate...</div>;
  }

  if (error) {
    return <div className="p-10 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-white font-sans text-[#1f1f1f]">
      <div className="max-w-[900px] mx-auto px-6 py-12">
        <h1 className="text-[28px] font-bold mb-4">Certificate Verification</h1>
        <div className="border border-[#e1e1e1] rounded-[8px] p-6">
          <p className="text-[14px] text-[#5f6368] mb-2">
            This certificate is valid and belongs to:
          </p>
          <p className="text-[18px] font-bold">{data.learnerName}</p>
          <div className="mt-4 space-y-1 text-[14px] text-[#1f1f1f]">
            <p>
              Course: <span className="font-semibold">{data.courseTitle}</span>
            </p>
            <p>
              Issued:{" "}
              <span className="font-semibold">
                {new Date(data.issuedAt).toLocaleDateString()}
              </span>
            </p>
            <p>
              Partner:{" "}
              <span className="font-semibold">
                {data.partnerName || "N/A"}
              </span>
            </p>
            <p>
              Verification Code:{" "}
              <span className="font-semibold">{data.verificationCode}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateVerify;
