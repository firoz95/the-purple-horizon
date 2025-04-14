
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const AddInvestorPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    investorCode: "",
    classOfUnits: "",
    totalCommitment: "",
    contributedCapital: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real implementation, this would create a new user in Supabase Auth
      // and also add a record to the investor_data table
      
      // Simulate a successful creation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Investor added",
        description: `Successfully added ${formData.fullName}`,
      });
      
      navigate("/admin/investors");
    } catch (error: any) {
      toast({
        title: "Error adding investor",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#222222] mb-6">Add New Investor</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Investor Details</CardTitle>
          <CardDescription>
            Add a new investor to the portal. This will create their account and financial profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name / Company Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="investorCode">Investor Code</Label>
                <Input
                  id="investorCode"
                  name="investorCode"
                  value={formData.investorCode}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="classOfUnits">Class of Units</Label>
                <Input
                  id="classOfUnits"
                  name="classOfUnits"
                  value={formData.classOfUnits}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="totalCommitment">Total Commitment (₹)</Label>
                <Input
                  id="totalCommitment"
                  name="totalCommitment"
                  value={formData.totalCommitment}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contributedCapital">Contributed Capital (₹)</Label>
                <Input
                  id="contributedCapital"
                  name="contributedCapital"
                  value={formData.contributedCapital}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/investors")}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-[#4B2E83] hover:bg-[#3a2266]"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Investor"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddInvestorPage;
