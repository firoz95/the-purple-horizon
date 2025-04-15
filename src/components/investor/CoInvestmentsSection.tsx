
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatIndianCurrency } from "@/utils/formatters";

type CoInvestment = {
  id: string;
  company: string;
  agreementDate: string;
  valuation: number;
  shares: string;
  stake: string;
  value: number;
  xirr: string;
}

type CoInvestmentsSectionProps = {
  coInvestments: CoInvestment[];
}

const CoInvestmentsSection: React.FC<CoInvestmentsSectionProps> = ({ coInvestments }) => {
  if (coInvestments.length === 0) {
    return null;
  }

  return (
    <section id="co-investments" className="mb-12 scroll-mt-20">
      <Card className="bg-card text-white border-[#222222] rounded-xl shadow-dashboard">
        <CardHeader>
          <CardTitle>Co-Investments</CardTitle>
          <CardDescription className="text-[#B0B0B0]">Your direct co-investment opportunities alongside the fund</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[#B0B0B0]">Company</TableHead>
                  <TableHead className="text-[#B0B0B0]">Agreement Date</TableHead>
                  <TableHead className="text-[#B0B0B0]">Valuation</TableHead>
                  <TableHead className="text-[#B0B0B0]">Shares</TableHead>
                  <TableHead className="text-[#B0B0B0]">Stake</TableHead>
                  <TableHead className="text-[#B0B0B0]">Current Value</TableHead>
                  <TableHead className="text-[#B0B0B0]">XIRR</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coInvestments.map((investment) => (
                  <TableRow key={investment.id} className="border-b border-[#222222]">
                    <TableCell className="font-medium">{investment.company}</TableCell>
                    <TableCell>{investment.agreementDate}</TableCell>
                    <TableCell title={formatIndianCurrency(investment.valuation, 'full')}>
                      {formatIndianCurrency(investment.valuation)}
                    </TableCell>
                    <TableCell>{investment.shares}</TableCell>
                    <TableCell>{investment.stake}</TableCell>
                    <TableCell title={formatIndianCurrency(investment.value, 'full')}>
                      {formatIndianCurrency(investment.value)}
                    </TableCell>
                    <TableCell className="text-green-400">{investment.xirr}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default CoInvestmentsSection;
