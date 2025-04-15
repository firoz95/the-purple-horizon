
import React from "react";
import { Card } from "@/components/ui/card";
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
    <div className="bg-white p-6 shadow-md rounded-xl mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">{investorName}</h1>
        <p className="text-sm text-gray-500">Class of Units: {classOfUnits}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onSectionClick("capital-activity")}
        >
          <p className="text-sm text-gray-500 mb-2">Total Commitment</p>
          <p 
            className="text-2xl font-bold text-gray-800" 
            title={formatIndianCurrency(totalCommitment, 'full')}
          >
            {formatIndianCurrency(totalCommitment)}
          </p>
        </Card>
        
        <Card 
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onSectionClick("capital-activity")}
        >
          <p className="text-sm text-gray-500 mb-2">Contributed Capital</p>
          <p 
            className="text-2xl font-bold text-gray-800" 
            title={formatIndianCurrency(contributedCapital, 'full')}
          >
            {formatIndianCurrency(contributedCapital)}
          </p>
        </Card>
        
        <Card 
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onSectionClick("nav-history")}
        >
          <p className="text-sm text-gray-500 mb-2">Current NAV</p>
          <p 
            className="text-2xl font-bold text-gray-800" 
            title={formatIndianCurrency(currentNAV, 'full')}
          >
            {formatIndianCurrency(currentNAV)}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SummarySection;
