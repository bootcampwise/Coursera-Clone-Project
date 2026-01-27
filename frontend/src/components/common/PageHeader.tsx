import React from "react";

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <div className="mb-6">
      <h1 className="text-[28px] font-bold text-[#1f1f1f] mb-3">{title}</h1>
      <div className="h-px bg-[#e1e1e1] w-full" />
    </div>
  );
};

export default PageHeader;
