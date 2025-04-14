
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Edit, Eye } from "lucide-react";

// Placeholder data
const investorsData = [
  { id: "1", name: "Rajesh Investments Ltd", email: "rajesh@example.com", commitment: "₹10.5 Cr", classOfUnits: "Class A", status: "Active" },
  { id: "2", name: "Priya Capital Partners", email: "priya@example.com", commitment: "₹25.75 Cr", classOfUnits: "Class B", status: "Active" },
  { id: "3", name: "Kumar Holdings", email: "kumar@example.com", commitment: "₹15.25 Cr", classOfUnits: "Class A", status: "Active" },
  { id: "4", name: "Sharma Ventures", email: "sharma@example.com", commitment: "₹8.45 Cr", classOfUnits: "Class C", status: "Pending" },
  { id: "5", name: "Patel Enterprises", email: "patel@example.com", commitment: "₹12.8 Cr", classOfUnits: "Class B", status: "Active" },
];

const InvestorsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInvestors, setFilteredInvestors] = useState(investorsData);

  const handleSearch = () => {
    const filtered = investorsData.filter(
      (investor) =>
        investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        investor.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInvestors(filtered);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#222222] mb-6">Manage Investors</h1>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex flex-1 max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Search investors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch} className="bg-[#4B2E83] hover:bg-[#3a2266]">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        
        <Button asChild className="bg-[#4B2E83] hover:bg-[#3a2266]">
          <Link to="/admin/add-investor">+ Add New Investor</Link>
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium">Investor Name</TableHead>
              <TableHead className="font-medium">Email</TableHead>
              <TableHead className="font-medium">Commitment</TableHead>
              <TableHead className="font-medium">Class of Units</TableHead>
              <TableHead className="font-medium">Status</TableHead>
              <TableHead className="font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvestors.map((investor) => (
              <TableRow key={investor.id}>
                <TableCell className="font-medium">{investor.name}</TableCell>
                <TableCell>{investor.email}</TableCell>
                <TableCell>{investor.commitment}</TableCell>
                <TableCell>{investor.classOfUnits}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    investor.status === "Active" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {investor.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" asChild>
                      <Link to={`/admin/investors/${investor.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <Link to={`/admin/investors/${investor.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InvestorsPage;
