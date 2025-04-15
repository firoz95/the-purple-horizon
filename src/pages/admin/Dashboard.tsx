
import React from 'react';
import { Card } from "@/components/ui/card";
import { 
  ArrowUpRight, 
  Users, 
  FileText, 
  DollarSign, 
  BarChart3 
} from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    { 
      title: "Total Investors", 
      value: "24", 
      change: "+2 this month", 
      icon: Users,
      color: "bg-blue-50 text-blue-600" 
    },
    { 
      title: "Fund Size", 
      value: "$150M", 
      change: "+$5M from last quarter", 
      icon: DollarSign,
      color: "bg-green-50 text-green-600"  
    },
    { 
      title: "Documents", 
      value: "156", 
      change: "+12 this week", 
      icon: FileText,
      color: "bg-purple-50 text-purple-600"  
    },
    { 
      title: "Active Drawdowns", 
      value: "3", 
      change: "2 pending approval", 
      icon: BarChart3,
      color: "bg-amber-50 text-amber-600"  
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of fund performance and investor activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 shadow-sm hover:shadow-md transition-shadow rounded-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2 text-sm">
                  <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                  <span className="text-gray-500">{stat.change}</span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Placeholder for Recent Activity */}
      <Card className="p-6 shadow-sm rounded-xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium">New document uploaded</p>
                  <p className="text-gray-500 text-sm">Q2 Financial Report</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">2h ago</span>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 text-primary text-sm font-medium">
          View all activity
        </button>
      </Card>
    </div>
  );
};

export default AdminDashboard;
