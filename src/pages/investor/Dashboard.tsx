
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card } from "@/components/ui/card";
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

  useEffect(() => {
    const fetchInvestorData = async () => {
      try {
        setLoading(true);
        
        // This would be replaced with actual API call to get investor data
        // For now, using mock data
        const mockInvestor = {
          id: investorId,
          name: "Sample Investor",
          commitment: 5000000,
          contributed: 3750000,
          nav: 4250000,
          unitClass: "Class A",
          pendingCapitalCall: true,
          capitalCallAmount: 500000,
          capitalCallDueDate: "2025-05-01"
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!investor) {
    return (
      <Card className="p-6 shadow-sm rounded-xl">
        <h2 className="text-xl font-semibold text-gray-900">Investor not found</h2>
        <p className="text-gray-500 mt-2">Unable to load investor data. Please try again.</p>
      </Card>
    );
  }

  const handleViewNotice = (itemId: string) => {
    console.log("Viewing notice:", itemId);
    // Implementation for viewing the notice
  };

  return (
    <div className="space-y-8">
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
      <section id="summary" className="pt-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Summary</h2>
        <SummarySection 
          commitment={investor.commitment}
          contributed={investor.contributed}
          nav={investor.nav}
          unitClass={investor.unitClass}
        />
      </section>

      {/* NAV History Section */}
      <div className="section-divider"></div>
      <section id="nav-history" className="pt-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">NAV History</h2>
        <NavSection investorId={investor.id} />
      </section>

      {/* Capital Activity Section */}
      <div className="section-divider"></div>
      <section id="capital-activity" className="pt-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Capital Activity</h2>
        <CapitalActivitySection investorId={investor.id} />
      </section>

      {/* Co-Investments Section */}
      <div className="section-divider"></div>
      <section id="co-investments" className="pt-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Co-Investments</h2>
        <CoInvestmentsSection investorId={investor.id} />
      </section>

      {/* Documents Section */}
      <div className="section-divider"></div>
      <section id="documents" className="pt-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Documents</h2>
        <DocumentsSection investorId={investor.id} />
      </section>
    </div>
  );
};

export default InvestorDashboard;
