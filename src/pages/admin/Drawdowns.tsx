
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, CheckCircle, FileText, Send } from "lucide-react";

// Placeholder data
const drawdownsData = [
  { 
    id: "1", 
    title: "Series C Funding Round", 
    percentage: "15%", 
    amount: "₹37.50 Cr", 
    dueDate: "2025-05-20", 
    status: "Pending", 
    investorsPaid: 8, 
    investorsTotal: 12 
  },
  { 
    id: "2", 
    title: "Operational Expenses Q2", 
    percentage: "5%", 
    amount: "₹12.50 Cr", 
    dueDate: "2025-06-15", 
    status: "Pending", 
    investorsPaid: 3, 
    investorsTotal: 12 
  },
  { 
    id: "3", 
    title: "Series B Investment", 
    percentage: "20%", 
    amount: "₹50.00 Cr", 
    dueDate: "2025-01-10", 
    status: "Completed", 
    investorsPaid: 12, 
    investorsTotal: 12 
  },
];

const DrawdownsPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    percentage: "",
    dueDate: "",
    description: "",
    visibility: "all",
  });

  const [drawdowns, setDrawdowns] = useState(drawdownsData);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real implementation, this would create a new drawdown notice in Supabase
      // and notify investors
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newDrawdown = {
        id: (drawdowns.length + 1).toString(),
        title: formData.title,
        percentage: formData.percentage + "%",
        amount: `₹${(Number(formData.percentage) * 2.5).toFixed(2)} Cr`, // Simplified calculation
        dueDate: formData.dueDate,
        status: "Pending",
        investorsPaid: 0,
        investorsTotal: 12,
      };
      
      setDrawdowns([newDrawdown, ...drawdowns]);
      
      // Reset form
      setFormData({
        title: "",
        percentage: "",
        dueDate: "",
        description: "",
        visibility: "all",
      });
      
      toast({
        title: "Drawdown notice created",
        description: "Drawdown notice has been created and will be sent to investors",
      });
    } catch (error: any) {
      toast({
        title: "Error creating drawdown notice",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-[#222222] mb-6">Drawdown Management</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Create Drawdown Notice</CardTitle>
            <CardDescription>
              Create a new drawdown notice to be sent to investors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Drawdown Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="percentage">Drawdown Percentage (%)</Label>
                <Input
                  id="percentage"
                  name="percentage"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.percentage}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="visibility">Visibility</Label>
                <Select 
                  value={formData.visibility} 
                  onValueChange={(value) => handleSelectChange("visibility", value)}
                >
                  <SelectTrigger id="visibility">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Investors</SelectItem>
                    <SelectItem value="selected">Selected Investors</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {formData.visibility === "selected" && (
                <div className="space-y-2">
                  <Label htmlFor="investors">Select Investors</Label>
                  <Select>
                    <SelectTrigger id="investors">
                      <SelectValue placeholder="Select investors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="investor1">Rajesh Investments Ltd</SelectItem>
                      <SelectItem value="investor2">Priya Capital Partners</SelectItem>
                      <SelectItem value="investor3">Kumar Holdings</SelectItem>
                      <SelectItem value="investor4">Sharma Ventures</SelectItem>
                      <SelectItem value="investor5">Patel Enterprises</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-[#808080]">
                    You can select multiple investors
                  </p>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-[#4B2E83] hover:bg-[#3a2266]"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Drawdown Notice"}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Drawdown Summary</CardTitle>
            <CardDescription>Overview of current and past drawdowns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <h3 className="font-medium">Pending Drawdowns</h3>
                  </div>
                  <p className="text-3xl font-bold mt-2">
                    {drawdowns.filter(d => d.status === "Pending").length}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <h3 className="font-medium">Completed</h3>
                  </div>
                  <p className="text-3xl font-bold mt-2">
                    {drawdowns.filter(d => d.status === "Completed").length}
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <div className="bg-[#f8f9fa] px-4 py-3 font-medium">
                Upcoming Due Dates
              </div>
              <div className="divide-y">
                {drawdowns
                  .filter(d => d.status === "Pending")
                  .map((drawdown) => (
                    <div key={drawdown.id} className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{drawdown.title}</p>
                        <p className="text-sm text-[#808080]">Due: {drawdown.dueDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{drawdown.amount}</p>
                        <p className="text-sm text-[#808080]">
                          {drawdown.investorsPaid}/{drawdown.investorsTotal} paid
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>All Drawdowns</CardTitle>
          <CardDescription>
            View and manage all drawdown notices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drawdowns.map((drawdown) => (
                <TableRow key={drawdown.id}>
                  <TableCell className="font-medium">{drawdown.title}</TableCell>
                  <TableCell>{drawdown.percentage}</TableCell>
                  <TableCell>{drawdown.amount}</TableCell>
                  <TableCell>
                    <span className={`${
                      drawdown.status === "Pending" && new Date(drawdown.dueDate) < new Date(new Date().toISOString().split("T")[0])
                        ? "text-red-500 font-bold"
                        : ""
                    }`}>
                      {drawdown.dueDate}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      drawdown.status === "Completed" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {drawdown.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-[#4B2E83] h-2.5 rounded-full" 
                        style={{ width: `${(drawdown.investorsPaid / drawdown.investorsTotal) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-[#808080] mt-1 block">
                      {drawdown.investorsPaid}/{drawdown.investorsTotal} investors
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        <span>View</span>
                      </Button>
                      
                      {drawdown.status === "Pending" && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1 text-blue-600"
                        >
                          <Send className="h-3 w-3" />
                          <span>Remind</span>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DrawdownsPage;
