
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, FileText, AlertCircle } from "lucide-react";

const AdminDashboard = () => {
  // This would be expanded with real data fetching from Supabase
  return (
    <div>
      <h1 className="text-3xl font-bold text-[#222222] mb-6">Admin Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investors</CardTitle>
            <Users className="h-4 w-4 text-[#4B2E83]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-[#808080]">
              3 new this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total AUM</CardTitle>
            <BarChart3 className="h-4 w-4 text-[#4B2E83]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹125.75 Cr</div>
            <p className="text-xs text-[#808080]">
              +14% from last quarter
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-[#4B2E83]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-[#808080]">
              5 uploaded this week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Drawdowns</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-[#808080]">
              Due this month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Overview of recent fund activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <p className="text-[#222222]">New NAV statement uploaded - April 2025</p>
                <p className="ml-auto text-[#808080] text-sm">2 days ago</p>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                <p className="text-[#222222]">New investor onboarded - Rajesh Investments Ltd</p>
                <p className="ml-auto text-[#808080] text-sm">1 week ago</p>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                <p className="text-[#222222]">Drawdown notice sent - Series C funding round</p>
                <p className="ml-auto text-[#808080] text-sm">2 weeks ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
