
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { formatIndianCurrency } from "@/utils/formatters";

type CapitalActivityItem = {
  date: string;
  description: string;
  amount: number;
}

type InvestmentItem = {
  name: string;
  amount: number;
  percentage: number;
}

type CapitalActivityProps = {
  contributions: CapitalActivityItem[];
  distributions: CapitalActivityItem[];
  fees: CapitalActivityItem[];
  investments: InvestmentItem[];
}

const COLORS = ["#4B2E83", "#6B4CA8", "#8D6EC7", "#AE92E6", "#CFBBFF"];

const CapitalActivitySection: React.FC<CapitalActivityProps> = ({
  contributions,
  distributions,
  fees,
  investments
}) => {
  // Prepare data for bar chart
  const barData = [
    { name: 'Contributions', value: contributions.reduce((sum, item) => sum + item.amount, 0) },
    { name: 'Distributions', value: distributions.reduce((sum, item) => sum + item.amount, 0) },
    { name: 'Fees', value: fees.reduce((sum, item) => sum + item.amount, 0) },
  ];

  return (
    <section id="capital-activity" className="mb-12 scroll-mt-20">
      <Card className="bg-card text-white border-[#222222] rounded-xl shadow-dashboard">
        <CardHeader>
          <CardTitle>Capital Activity</CardTitle>
          <CardDescription className="text-[#B0B0B0]">Summary of contributions, distributions, and fund investments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Summary</h3>
              <div className="h-64 mb-6">
                <ChartContainer
                  config={{
                    "Contributions": { color: "#4B2E83" },
                    "Distributions": { color: "#6B4CA8" },
                    "Fees": { color: "#8D6EC7" },
                  }}
                >
                  <BarChart
                    data={barData}
                    margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                    <XAxis dataKey="name" stroke="#B0B0B0" />
                    <YAxis 
                      tickFormatter={(value) => `₹${(value / 10000000).toFixed(1)}Cr`}
                      stroke="#B0B0B0"
                    />
                    <ChartTooltip 
                      content={
                        <ChartTooltipContent 
                          formatter={(value: number, name: string) => [
                            formatIndianCurrency(value),
                            name
                          ]}
                        />
                      }
                    />
                    <Bar dataKey="value" fill="#4B2E83" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-[#B0B0B0] mb-2">Contributions</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-[#B0B0B0]">Date</TableHead>
                        <TableHead className="text-[#B0B0B0]">Description</TableHead>
                        <TableHead className="text-[#B0B0B0]">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contributions.map((item, index) => (
                        <TableRow key={index} className="border-b border-[#222222]">
                          <TableCell>{item.date}</TableCell>
                          <TableCell>{item.description}</TableCell>
                          <TableCell title={formatIndianCurrency(item.amount, 'full')}>
                            {formatIndianCurrency(item.amount)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {fees.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-[#B0B0B0] mb-2">Fees</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-[#B0B0B0]">Date</TableHead>
                          <TableHead className="text-[#B0B0B0]">Description</TableHead>
                          <TableHead className="text-[#B0B0B0]">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {fees.map((item, index) => (
                          <TableRow key={index} className="border-b border-[#222222]">
                            <TableCell>{item.date}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell title={formatIndianCurrency(item.amount, 'full')}>
                              {formatIndianCurrency(item.amount)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
                
                {distributions.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-[#B0B0B0] mb-2">Distributions</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-[#B0B0B0]">Date</TableHead>
                          <TableHead className="text-[#B0B0B0]">Description</TableHead>
                          <TableHead className="text-[#B0B0B0]">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {distributions.map((item, index) => (
                          <TableRow key={index} className="border-b border-[#222222]">
                            <TableCell>{item.date}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell title={formatIndianCurrency(item.amount, 'full')}>
                              {formatIndianCurrency(item.amount)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Fund Investments</h3>
              <div className="h-64">
                <ChartContainer
                  config={Object.fromEntries(
                    investments.map((item, index) => [
                      item.name, 
                      { color: COLORS[index % COLORS.length] }
                    ])
                  )}
                >
                  <PieChart>
                    <Pie
                      data={investments}
                      dataKey="amount"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {investments.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip 
                      content={
                        <ChartTooltipContent 
                          formatter={(value: number, name: string) => [
                            formatIndianCurrency(value),
                            name
                          ]}
                        />
                      }
                    />
                  </PieChart>
                </ChartContainer>
              </div>
              
              <div className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-[#B0B0B0]">Company</TableHead>
                      <TableHead className="text-[#B0B0B0]">Amount</TableHead>
                      <TableHead className="text-[#B0B0B0]">Percentage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {investments.map((item, index) => (
                      <TableRow key={index} className="border-b border-[#222222]">
                        <TableCell className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          {item.name}
                        </TableCell>
                        <TableCell title={formatIndianCurrency(item.amount, 'full')}>
                          {formatIndianCurrency(item.amount)}
                        </TableCell>
                        <TableCell>{item.percentage}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default CapitalActivitySection;
