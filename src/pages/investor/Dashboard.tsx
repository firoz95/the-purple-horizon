
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import SummarySection from '@/components/investor/SummarySection';
import NavSection from '@/components/investor/NavSection';
import CapitalActivitySection from '@/components/investor/CapitalActivitySection';
import CoInvestmentsSection from '@/components/investor/CoInvestmentsSection';
import DocumentsSection from '@/components/investor/DocumentsSection';
import AgendaAlert from '@/components/investor/AgendaAlert';

const InvestorDashboard = () => {
  const { investorId } = useParams();
  const [investor, setInvestor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Mock data for each component
  const [mockNavHistory, setMockNavHistory] = useState([
    { date: "2024 Q1", value: 4250000 },
    { date: "2023 Q4", value: 4000000 },
    { date: "2023 Q3", value: 3850000 },
    { date: "2023 Q2", value: 3900000 },
    { date: "2023 Q1", value: 3700000 },
    { date: "2022 Q4", value: 3600000 }
  ]);
  
  const [mockContributions, setMockContributions] = useState([
    { date: "2022-01-15", description: "Initial Capital Call", amount: 2000000 },
    { date: "2022-06-10", description: "Second Capital Call", amount: 1000000 },
    { date: "2023-03-05", description: "Third Capital Call", amount: 750000 }
  ]);
  
  const [mockFees, setMockFees] = useState([
    { date: "2022-03-31", description: "Management Fee Q1", amount: 25000 },
    { date: "2022-06-30", description: "Management Fee Q2", amount: 25000 },
    { date: "2022-09-30", description: "Management Fee Q3", amount: 25000 }
  ]);
  
  const [mockDistributions, setMockDistributions] = useState([]);
  
  const [mockInvestments, setMockInvestments] = useState([
    { name: "TechGrowth Inc.", amount: 1200000, percentage: 32 },
    { name: "Green Energy Solutions", amount: 850000, percentage: 23 },
    { name: "HealthTech Innovations", amount: 950000, percentage: 25 },
    { name: "Fintech Platform", amount: 750000, percentage: 20 }
  ]);
  
  const [mockCoInvestments, setMockCoInvestments] = useState([
    {
      id: "ci1",
      company: "Quantum Computing Corp",
      agreementDate: "2022-08-15",
      valuation: 120000000,
      shares: "5,000",
      stake: "0.5%",
      value: 750000,
      xirr: "+18.5%"
    },
    {
      id: "ci2",
      company: "Sustainable Solutions Ltd",
      agreementDate: "2023-01-10",
      valuation: 75000000,
      shares: "3,200",
      stake: "0.6%",
      value: 550000,
      xirr: "+12.2%"
    }
  ]);
  
  const [mockDocuments, setMockDocuments] = useState([
    {
      id: "doc1",
      name: "PPM - Fund II",
      category: "PPM",
      uploaded: "2022-01-05",
      downloadable: true,
      fileUrl: "/documents/ppm.pdf"
    },
    {
      id: "doc2",
      name: "Subscription Agreement",
      category: "Contribution Agreement",
      uploaded: "2022-01-05",
      downloadable: true,
      fileUrl: "/documents/subscription.pdf"
    },
    {
      id: "doc3",
      name: "Q1 2023 Unit Statement",
      category: "Unit Statement",
      uploaded: "2023-04-10",
      downloadable: true,
      fileUrl: "/documents/q1-2023-statement.pdf"
    },
    {
      id: "doc4",
      name: "Capital Call Notice - April 2023",
      category: "Contribution Notices",
      uploaded: "2023-04-01",
      downloadable: true,
      fileUrl: "/documents/april-capital-call.pdf",
      dueDate: "2023-05-01",
      percentage: "10%"
    }
  ]);

  useEffect(() => {
    const fetchInvestorData = async () => {
      try {
        setLoading(true);
        
        // This would be replaced with actual API call to get investor data
        // For now, using mock data
        const mockInvestor = {
          id: investorId,
          name: "John Smith Investments",
          commitment: 5000000,
          contributed: 3750000,
          nav: 4250000,
          unitClass: "Class A",
          pendingCapitalCall: true,
          capitalCallAmount: 500000,
          capitalCallDueDate: "2025-05-01",
          classOfUnits: "Class A"
        };
        
        setInvestor(mockInvestor);
      } catch (error) {
        console.error("Error fetching investor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestorData();
  }, [investorId]);

  const handleSectionClick = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!investor) {
    return (
      <div className="p-6 shadow-sm rounded-xl bg-white">
        <h2 className="text-xl font-semibold text-gray-900">Investor not found</h2>
        <p className="text-gray-500 mt-2">Unable to load investor data. Please try again.</p>
      </div>
    );
  }

  const handleViewNotice = (itemId: string) => {
    console.log("Viewing notice:", itemId);
    // Implementation for viewing the notice
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Investor Dashboard</h1>
        <p className="text-gray-500 mt-1">Your investment at a glance</p>
      </div>

      {/* Display agenda alert if there's a pending capital call */}
      {investor.pendingCapitalCall && (
        <AgendaAlert 
          amount={investor.capitalCallAmount} 
          dueDate={investor.capitalCallDueDate}
          onViewNotice={handleViewNotice}
        />
      )}

      {/* Investment Summary */}
      <section id="summary" className="scroll-mt-20">
        <SummarySection 
          investorName={investor.name}
          classOfUnits={investor.classOfUnits}
          totalCommitment={investor.commitment}
          contributedCapital={investor.contributed}
          currentNAV={investor.nav}
          onSectionClick={handleSectionClick}
        />
      </section>

      {/* NAV History Section */}
      <section id="nav-history" className="scroll-mt-20">
        <NavSection navHistory={mockNavHistory} />
      </section>

      {/* Capital Activity Section */}
      <section id="capital-activity" className="scroll-mt-20">
        <CapitalActivitySection 
          contributions={mockContributions}
          distributions={mockDistributions}
          fees={mockFees}
          investments={mockInvestments}
        />
      </section>

      {/* Co-Investments Section */}
      <section id="co-investments" className="scroll-mt-20">
        <CoInvestmentsSection coInvestments={mockCoInvestments} />
      </section>

      {/* Documents Section */}
      <section id="documents" className="scroll-mt-20">
        <DocumentsSection documents={mockDocuments} />
      </section>
    </div>
  );
};

export default InvestorDashboard;
