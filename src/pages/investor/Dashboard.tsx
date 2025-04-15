
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SummarySection from "@/components/investor/SummarySection";
import AgendaAlert from "@/components/investor/AgendaAlert";
import NavSection from "@/components/investor/NavSection";
import CapitalActivitySection from "@/components/investor/CapitalActivitySection";
import CoInvestmentsSection from "@/components/investor/CoInvestmentsSection";
import DocumentsSection from "@/components/investor/DocumentsSection";

// Placeholder investor data - this would be fetched from Supabase
const investorData = {
  id: "1",
  name: "Rajesh Investments Ltd",
  totalCommitment: 105000000,
  contributedCapital: 73500000,
  currentNAV: 88200000,
  classOfUnits: "Class A",
  agendaItems: [
    {
      id: "1",
      type: "drawdown",
      title: "Series C Funding Round",
      date: "2025-05-20",
      amount: 15750000,
      percentage: "15%",
      status: "Pending"
    }
  ],
  navHistory: [
    { date: "2024-Q1", value: 50000000 },
    { date: "2024-Q2", value: 55000000 },
    { date: "2024-Q3", value: 62000000 },
    { date: "2024-Q4", value: 70000000 },
    { date: "2025-Q1", value: 88200000 },
  ],
  capitalActivity: {
    contributions: [
      { date: "2023-09-15", description: "Initial Capital Call", amount: 21000000 },
      { date: "2024-02-20", description: "Second Capital Call", amount: 31500000 },
      { date: "2024-09-10", description: "Third Capital Call", amount: 21000000 },
    ],
    distributions: [],
    fees: [
      { date: "2024-03-15", description: "Management Fee 2024", amount: 1050000 },
    ],
    investments: [
      { name: "TechX Solutions", amount: 25000000, percentage: 34 },
      { name: "GreenEnergy Ltd", amount: 18000000, percentage: 24 },
      { name: "HealthPlus", amount: 15000000, percentage: 21 },
      { name: "FinScope", amount: 12000000, percentage: 16 },
      { name: "RetailMax", amount: 3500000, percentage: 5 },
    ]
  },
  coInvestments: [
    { 
      id: "1",
      company: "TechX Solutions", 
      agreementDate: "2024-05-15", 
      valuation: 800000000,
      shares: "125,000", 
      stake: "3.5%", 
      value: 28000000, 
      xirr: "22.5%" 
    }
  ],
  documents: [
    { id: "1", name: "Private Placement Memorandum", category: "PPM", uploaded: "2023-08-10", downloadable: false, fileUrl: "#" },
    { id: "2", name: "Contribution Agreement", category: "Contribution Agreement", uploaded: "2023-09-01", downloadable: true, fileUrl: "#" },
    { id: "3", name: "Unit Statement Q1 2025", category: "Unit Statement", uploaded: "2025-04-10", downloadable: true, fileUrl: "#" },
    { id: "4", name: "Series C Drawdown Notice", category: "Contribution Notices", uploaded: "2025-04-15", downloadable: true, fileUrl: "#", dueDate: "2025-05-20", percentage: "15%" },
  ]
};

const InvestorDashboard = () => {
  const { investorId } = useParams<{ investorId: string }>();
  const [investor, setInvestor] = useState(investorData);
  
  useEffect(() => {
    // In a real implementation, this would fetch investor data from Supabase
    // using the investorId
    console.log("Fetching data for investor:", investorId);
    
    // Using placeholder data for now
  }, [investorId]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleViewNotice = (noticeId: string) => {
    scrollToSection("documents");
  };

  return (
    <div className="max-w-7xl mx-auto pb-20">
      {/* Header Summary */}
      <SummarySection 
        investorName={investor.name}
        classOfUnits={investor.classOfUnits}
        totalCommitment={investor.totalCommitment}
        contributedCapital={investor.contributedCapital}
        currentNAV={investor.currentNAV}
        onSectionClick={scrollToSection}
      />
      
      {/* Agenda Alert Box (only if applicable) */}
      {investor.agendaItems.length > 0 && (
        <AgendaAlert 
          agendaItems={investor.agendaItems.map(item => ({
            ...item,
            amount: item.amount
          }))}
          onViewNotice={handleViewNotice}
        />
      )}
      
      {/* NAV History */}
      <NavSection navHistory={investor.navHistory} />
      
      {/* Capital Activity */}
      <CapitalActivitySection 
        contributions={investor.capitalActivity.contributions}
        distributions={investor.capitalActivity.distributions}
        fees={investor.capitalActivity.fees}
        investments={investor.capitalActivity.investments}
      />
      
      {/* Co-Investments (only if applicable) */}
      {investor.coInvestments.length > 0 && (
        <CoInvestmentsSection coInvestments={investor.coInvestments} />
      )}
      
      {/* Documents */}
      <DocumentsSection documents={investor.documents} />
    </div>
  );
};

export default InvestorDashboard;
