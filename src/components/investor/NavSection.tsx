
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { formatIndianCurrency } from "@/utils/formatters";

type NavHistoryItem = {
  date: string;
  value: number;
}

type NavSectionProps = {
  navHistory: NavHistoryItem[];
}

const NavSection: React.FC<NavSectionProps> = ({ navHistory }) => {
  const [activeTab, setActiveTab] = useState<"chart" | "table">("chart");
  
  return (
    <section id="nav-history" className="mb-12 scroll-mt-20">
      <Card className="bg-card text-white border-[#222222] rounded-xl shadow-dashboard">
        <CardHeader>
          <CardTitle>NAV History</CardTitle>
          <CardDescription className="text-[#B0B0B0]">Historical Net Asset Value of your investment</CardDescription>
          <div className="flex space-x-4 mt-2">
            <Button 
              variant={activeTab === "chart" ? "default" : "outline"} 
              size="sm"
              className={activeTab === "chart" ? "bg-[#4B2E83] hover:bg-[#3a2266]" : "border-[#333333] text-white hover:bg-[#222222]"}
              onClick={() => setActiveTab("chart")}
            >
              Chart View
            </Button>
            <Button 
              variant={activeTab === "table" ? "default" : "outline"} 
              size="sm"
              className={activeTab === "table" ? "bg-[#4B2E83] hover:bg-[#3a2266]" : "border-[#333333] text-white hover:bg-[#222222]"}
              onClick={() => setActiveTab("table")}
            >
              Table View
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {activeTab === "chart" ? (
            <div className="h-80">
              <ChartContainer
                config={{
                  nav: {
                    color: "#4B2E83",
                  },
                }}
              >
                <AreaChart
                  data={navHistory.map(item => ({
                    date: item.date,
                    nav: item.value,
                  }))}
                  margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="navGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4B2E83" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4B2E83" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                  <XAxis dataKey="date" stroke="#B0B0B0" />
                  <YAxis 
                    tickFormatter={(value) => `₹${(value / 10000000).toFixed(1)}Cr`}
                    stroke="#B0B0B0"
                  />
                  <ChartTooltip 
                    content={
                      <ChartTooltipContent 
                        formatter={(value: number) => [
                          formatIndianCurrency(value),
                          "NAV"
                        ]}
                      />
                    }
                  />
                  <Area 
                    type="monotone" 
                    dataKey="nav" 
                    stroke="#4B2E83" 
                    fill="url(#navGradient)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[#B0B0B0]">Period</TableHead>
                    <TableHead className="text-[#B0B0B0]">NAV</TableHead>
                    <TableHead className="text-[#B0B0B0]">Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {navHistory.map((item, index) => {
                    const prevValue = index > 0 ? navHistory[index - 1].value : item.value;
                    const change = ((item.value - prevValue) / prevValue) * 100;
                    
                    return (
                      <TableRow key={item.date} className="border-b border-[#222222]">
                        <TableCell>{item.date}</TableCell>
                        <TableCell title={formatIndianCurrency(item.value, 'full')}>{formatIndianCurrency(item.value)}</TableCell>
                        <TableCell>
                          {index === 0 ? (
                            "—"
                          ) : (
                            <span className={change >= 0 ? "text-green-400" : "text-red-400"}>
                              {change >= 0 ? "+" : ""}{change.toFixed(2)}%
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default NavSection;
