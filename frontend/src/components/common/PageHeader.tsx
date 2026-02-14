import React from "react";

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <div className="mb-6">
      <h1 className="text-[28px] font-bold text-gray-dark-3 mb-3">{title}</h1>
      <div className="h-px bg-border w-full" />
    </div>
  );
};

export default PageHeader;

















































