
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import NavChart from '@/components/NavChart';

type NavHistoryItem = {
  date: string;
  value: number;
}

type NavSectionProps = {
  navHistory: NavHistoryItem[];
}

const NavSection: React.FC<NavSectionProps> = ({ navHistory }) => {
  return (
    <section id="nav-history" className="mb-8 scroll-mt-20">
      <Card className="rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <CardHeader className="bg-white border-b border-gray-100">
          <CardTitle className="text-xl text-gray-800">NAV History</CardTitle>
          <CardDescription className="text-gray-500">Historical Net Asset Value of your investment</CardDescription>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <NavChart navHistory={navHistory} />
        </CardContent>
      </Card>
    </section>
  );
};

export default NavSection;
