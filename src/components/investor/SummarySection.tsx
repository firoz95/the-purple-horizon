
import React from "react";
import { formatIndianCurrency } from "@/utils/formatters";

type SummarySectionProps = {
  investorName: string;
  classOfUnits: string;
  totalCommitment: number;
  contributedCapital: number;
  currentNAV: number;
  onSectionClick: (sectionId: string) => void;
}

const SummarySection: React.FC<SummarySectionProps> = ({
  investorName,
  classOfUnits,
  totalCommitment,
  contributedCapital,
  currentNAV,
  onSectionClick
}) => {
  return (
    <div className="bg-card p-6 shadow-dashboard rounded-xl mb-6 border border-[#222222]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-[#4B2E83]">{investorName}</h1>
        <p className="text-sm text-[#B0B0B0]">Class of Units: {classOfUnits}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          className="bg-[#222222] p-4 rounded-xl text-center cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onSectionClick("capital-activity")}
        >
          <p className="text-sm text-[#B0B0B0] mb-2">Total Commitment</p>
          <p 
            className="text-2xl font-bold text-white" 
            title={formatIndianCurrency(totalCommitment, 'full')}
          >
            {formatIndianCurrency(totalCommitment)}
          </p>
        </div>
        
        <div 
          className="bg-[#222222] p-4 rounded-xl text-center cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onSectionClick("capital-activity")}
        >
          <p className="text-sm text-[#B0B0B0] mb-2">Contributed Capital</p>
          <p 
            className="text-2xl font-bold text-white" 
            title={formatIndianCurrency(contributedCapital, 'full')}
          >
            {formatIndianCurrency(contributedCapital)}
          </p>
        </div>
        
        <div 
          className="bg-[#222222] p-4 rounded-xl text-center cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onSectionClick("nav-history")}
        >
          <p className="text-sm text-[#B0B0B0] mb-2">Current NAV</p>
          <p 
            className="text-2xl font-bold text-white" 
            title={formatIndianCurrency(currentNAV, 'full')}
          >
            {formatIndianCurrency(currentNAV)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummarySection;
