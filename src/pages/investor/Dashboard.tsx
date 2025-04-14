
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { AlertCircle, Download, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Placeholder investor data
const investorData = {
  id: "1",
  name: "Rajesh Investments Ltd",
  totalCommitment: "₹10.50 Cr",
  totalCommitmentRaw: 105000000,
  contributedCapital: "₹7.35 Cr",
  contributedCapitalRaw: 73500000,
  currentNAV: "₹8.82 Cr",
  currentNAVRaw: 88200000,
  classOfUnits: "Class A",
  agendaItems: [
    {
      id: "1",
      type: "drawdown",
      title: "Series C Funding Round",
      date: "2025-05-20",
      amount: "₹1.58 Cr",
      amountRaw: 15750000,
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
      valuation: "₹80.00 Cr",
      valuationRaw: 800000000,
      shares: "125,000", 
      stake: "3.5%", 
      value: "₹2.80 Cr",
      valueRaw: 28000000, 
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

// Format number to Indian style (with crores and lakhs)
const formatIndianNumber = (num: number, isCrore = true) => {
  if (isCrore) {
    return `₹${(num / 10000000).toFixed(2)} Cr`;
  }
  
  // Convert to string and add commas for Indian number format
  const numStr = num.toString();
  let result = "";
  let count = 0;
  
  for (let i = numStr.length - 1; i >= 0; i--) {
    count++;
    result = numStr[i] + result;
    
    if (i !== 0) {
      if (count === 3 && numStr.length - i > 3) {
        result = "," + result;
      } else if (count === 2 && numStr.length - i > 5) {
        count = 0;
        result = "," + result;
      }
    }
  }
  
  return `₹${result}`;
};

// Color configuration
const COLORS = ["#4B2E83", "#6B4CA8", "#8D6EC7", "#AE92E6", "#CFBBFF"];

const InvestorDashboard = () => {
  const { investorId } = useParams<{ investorId: string }>();
  const [investor, setInvestor] = useState(investorData);
  const [activeTab, setActiveTab] = useState<"chart" | "table">("chart");
  
  useEffect(() => {
    // In a real implementation, this would fetch investor data from Supabase
    // using the investorId
    console.log("Fetching data for investor:", investorId);
    
    // Using placeholder data for now
  }, [investorId]);

  return (
    <div className="pb-20">
      {/* Header Summary */}
      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-[#4B2E83]">{investor.name}</h1>
          <p className="text-sm text-[#808080]">Class of Units: {investor.classOfUnits}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            className="bg-gray-50 p-4 rounded-lg text-center cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => document.getElementById("capital-activity")?.scrollIntoView({ behavior: "smooth" })}
          >
            <p className="text-sm text-[#808080] mb-2">Total Commitment</p>
            <p className="text-2xl font-bold text-[#222222]" title={formatIndianNumber(investor.totalCommitmentRaw, false)}>
              {investor.totalCommitment}
            </p>
          </div>
          
          <div 
            className="bg-gray-50 p-4 rounded-lg text-center cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => document.getElementById("capital-activity")?.scrollIntoView({ behavior: "smooth" })}
          >
            <p className="text-sm text-[#808080] mb-2">Contributed Capital</p>
            <p className="text-2xl font-bold text-[#222222]" title={formatIndianNumber(investor.contributedCapitalRaw, false)}>
              {investor.contributedCapital}
            </p>
          </div>
          
          <div 
            className="bg-gray-50 p-4 rounded-lg text-center cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => document.getElementById("nav-history")?.scrollIntoView({ behavior: "smooth" })}
          >
            <p className="text-sm text-[#808080] mb-2">Current NAV</p>
            <p className="text-2xl font-bold text-[#222222]" title={formatIndianNumber(investor.currentNAVRaw, false)}>
              {investor.currentNAV}
            </p>
          </div>
        </div>
      </div>
      
      {/* Agenda Alert Box (only if applicable) */}
      {investor.agendaItems.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-lg font-bold text-red-700 mb-2">Pending Action Required</h2>
              {investor.agendaItems.map((item) => (
                <div key={item.id} className="mb-4">
                  <h3 className="text-md font-medium text-[#222222]">{item.title}</h3>
                  <p className="text-sm text-[#808080] mb-2">
                    Due Date: <span className="font-bold text-red-600">{item.date}</span>
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <p className="text-sm">
                      Amount: <span className="font-medium" title={formatIndianNumber(item.amountRaw, false)}>{item.amount}</span> ({item.percentage} of total commitment)
                    </p>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="border-red-300 text-red-700 hover:bg-red-50 sm:ml-auto"
                      onClick={() => document.getElementById("documents")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      View Notice
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* NAV History */}
      <section id="nav-history" className="mb-12 scroll-mt-20">
        <Card>
          <CardHeader>
            <CardTitle>NAV History</CardTitle>
            <CardDescription>Historical Net Asset Value of your investment</CardDescription>
            <div className="flex space-x-4 mt-2">
              <Button 
                variant={activeTab === "chart" ? "default" : "outline"} 
                size="sm"
                className={activeTab === "chart" ? "bg-[#4B2E83] hover:bg-[#3a2266]" : ""}
                onClick={() => setActiveTab("chart")}
              >
                Chart View
              </Button>
              <Button 
                variant={activeTab === "table" ? "default" : "outline"} 
                size="sm"
                className={activeTab === "table" ? "bg-[#4B2E83] hover:bg-[#3a2266]" : ""}
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
                    data={investor.navHistory.map(item => ({
                      date: item.date,
                      nav: item.value,
                    }))}
                    margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis 
                      tickFormatter={(value) => `₹${(value / 10000000).toFixed(1)}Cr`}
                    />
                    <ChartTooltip 
                      content={
                        <ChartTooltipContent 
                          formatter={(value: number) => [
                            formatIndianNumber(value, true),
                            "NAV"
                          ]}
                        />
                      }
                    />
                    <Area 
                      type="monotone" 
                      dataKey="nav" 
                      stroke="#4B2E83" 
                      fill="#4B2E83" 
                      fillOpacity={0.2} 
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Period</TableHead>
                      <TableHead>NAV</TableHead>
                      <TableHead>Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {investor.navHistory.map((item, index) => {
                      const prevValue = index > 0 ? investor.navHistory[index - 1].value : item.value;
                      const change = ((item.value - prevValue) / prevValue) * 100;
                      
                      return (
                        <TableRow key={item.date}>
                          <TableCell>{item.date}</TableCell>
                          <TableCell title={formatIndianNumber(item.value, false)}>{formatIndianNumber(item.value, true)}</TableCell>
                          <TableCell>
                            {index === 0 ? (
                              "—"
                            ) : (
                              <span className={change >= 0 ? "text-green-600" : "text-red-600"}>
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
      
      {/* Capital Activity */}
      <section id="capital-activity" className="mb-12 scroll-mt-20">
        <Card>
          <CardHeader>
            <CardTitle>Capital Activity</CardTitle>
            <CardDescription>Summary of contributions, distributions, and fund investments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Contributions & Distributions</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-[#808080] mb-2">Contributions</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {investor.capitalActivity.contributions.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.date}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell title={formatIndianNumber(item.amount, false)}>
                              {formatIndianNumber(item.amount, true)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  {investor.capitalActivity.fees.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-[#808080] mb-2">Fees</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {investor.capitalActivity.fees.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item.date}</TableCell>
                              <TableCell>{item.description}</TableCell>
                              <TableCell title={formatIndianNumber(item.amount, false)}>
                                {formatIndianNumber(item.amount, true)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                  
                  {investor.capitalActivity.distributions.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-[#808080] mb-2">Distributions</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {investor.capitalActivity.distributions.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item.date}</TableCell>
                              <TableCell>{item.description}</TableCell>
                              <TableCell title={formatIndianNumber(item.amount, false)}>
                                {formatIndianNumber(item.amount, true)}
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
                    config={{
                      "TechX Solutions": { color: "#4B2E83" },
                      "GreenEnergy Ltd": { color: "#6B4CA8" },
                      "HealthPlus": { color: "#8D6EC7" },
                      "FinScope": { color: "#AE92E6" },
                      "RetailMax": { color: "#CFBBFF" },
                    }}
                  >
                    <PieChart>
                      <Pie
                        data={investor.capitalActivity.investments}
                        dataKey="amount"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {investor.capitalActivity.investments.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip 
                        content={
                          <ChartTooltipContent 
                            formatter={(value: number, name: string) => [
                              formatIndianNumber(value, true),
                              name
                            ]}
                          />
                        }
                      />
                    </PieChart>
                  </ChartContainer>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* Co-Investments (only if applicable) */}
      {investor.coInvestments.length > 0 && (
        <section id="co-investments" className="mb-12 scroll-mt-20">
          <Card>
            <CardHeader>
              <CardTitle>Co-Investments</CardTitle>
              <CardDescription>Your direct co-investment opportunities alongside the fund</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Agreement Date</TableHead>
                      <TableHead>Valuation</TableHead>
                      <TableHead>Shares</TableHead>
                      <TableHead>Stake</TableHead>
                      <TableHead>Current Value</TableHead>
                      <TableHead>XIRR</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {investor.coInvestments.map((investment) => (
                      <TableRow key={investment.id}>
                        <TableCell className="font-medium">{investment.company}</TableCell>
                        <TableCell>{investment.agreementDate}</TableCell>
                        <TableCell title={formatIndianNumber(investment.valuationRaw, false)}>
                          {investment.valuation}
                        </TableCell>
                        <TableCell>{investment.shares}</TableCell>
                        <TableCell>{investment.stake}</TableCell>
                        <TableCell title={formatIndianNumber(investment.valueRaw, false)}>
                          {investment.value}
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
      )}
      
      {/* Documents */}
      <section id="documents" className="scroll-mt-20">
        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
            <CardDescription>Access your fund documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {["PPM", "Contribution Agreement", "Side Letter", "Unit Statement", "Contribution Notices"].map((category) => {
                const categoryDocs = investor.documents.filter(doc => doc.category === category);
                
                if (categoryDocs.length === 0 && category !== "Side Letter") {
                  return null;
                }
                
                return (
                  <div key={category}>
                    <h3 className="font-medium text-lg mb-3">{category}</h3>
                    
                    {categoryDocs.length === 0 ? (
                      <p className="text-sm text-[#808080] italic">No documents available</p>
                    ) : (
                      <div className="space-y-2">
                        {categoryDocs.map((doc) => (
                          <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 text-[#4B2E83] mr-3" />
                              <div>
                                <p className="font-medium text-[#222222]">{doc.name}</p>
                                <p className="text-xs text-[#808080]">Uploaded: {doc.uploaded}</p>
                                
                                {doc.category === "Contribution Notices" && doc.dueDate && (
                                  <p className="text-xs mt-1">
                                    <span className="text-[#808080]">Due Date: </span>
                                    <span className="font-bold text-red-600">{doc.dueDate}</span>
                                    {doc.percentage && ` (${doc.percentage})`}
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="flex items-center"
                              >
                                <Eye className="h-3.5 w-3.5 mr-1.5" />
                                View
                              </Button>
                              
                              {doc.downloadable && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="flex items-center"
                                >
                                  <Download className="h-3.5 w-3.5 mr-1.5" />
                                  Download
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default InvestorDashboard;
