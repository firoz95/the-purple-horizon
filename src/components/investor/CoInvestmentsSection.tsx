
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
    <section id="co-investments" className="mb-8 scroll-mt-20">
      <Card className="rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <CardHeader className="bg-white border-b border-gray-100">
          <CardTitle className="text-xl text-gray-800">Co-Investments</CardTitle>
          <CardDescription className="text-gray-500">Your direct co-investment opportunities alongside the fund</CardDescription>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-600">Company</TableHead>
                  <TableHead className="text-gray-600">Agreement Date</TableHead>
                  <TableHead className="text-gray-600">Valuation</TableHead>
                  <TableHead className="text-gray-600">Shares</TableHead>
                  <TableHead className="text-gray-600">Stake</TableHead>
                  <TableHead className="text-gray-600">Current Value</TableHead>
                  <TableHead className="text-gray-600">XIRR</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coInvestments.map((investment) => (
                  <TableRow key={investment.id}>
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
                    <TableCell className="text-green-600">{investment.xirr}</TableCell>
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
