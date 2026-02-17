import React from "react";
import { IMAGES } from "../../constants/images";

interface MasterTrackCertificateCardProps {
  title: string;
  image: string;
  university: string;
  universityIcon: string;
  typeLabel: "Mastertrack" | "University Certificate";
}

const MasterTrackCertificateCard: React.FC<MasterTrackCertificateCardProps> = ({
  title,
  image,
  university,
  universityIcon,
  typeLabel,
}) => {
  return (
    <div className="flex flex-col h-full bg-white border border-gray-light-2-alt rounded-[10px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
      <div className="relative p-2 h-[150px] overflow-hidden rounded-2xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-[8px]"
        />
      </div>

      <div className="pt-3 pb-3 ml-3 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={universityIcon}
            alt={university}
            className="w-[18px] h-[18px] object-contain shrink-0"
          />
          <span className="text-[12px] text-gray-medium-2-alt font-normal leading-none truncate">
            {university}
          </span>
        </div>

        <h3 className="text-[14px] font-normal text-gray-darkest-2 mb-3 line-clamp-2 leading-[1.3] min-h-[40px]">
          {title}
        </h3>

        <div className="mt-auto">
          <div className="flex items-center gap-1.5 text-primary-alt text-[12px] font-normal mb-2">
            <img
              src={IMAGES.UI.EARN_CERTIFICATE_ICON}
              alt="Credit offered"
              className="w-[14px] h-[14px] object-contain shrink-0"
            />
            <span className="leading-tight">Credit offered</span>
          </div>

          <p className="text-[12px] text-shade-2 font-medium uppercase tracking-tight leading-none opacity-80">
            {typeLabel}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MasterTrackCertificateCard;


















































