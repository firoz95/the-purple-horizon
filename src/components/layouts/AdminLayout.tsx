
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, FileText, BarChart3, LogOut, PlusCircle, AlertCircle } from "lucide-react";

export default function AdminLayout() {
  const { signOut } = useAuth();
  const [activePage, setActivePage] = useState("dashboard");

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: BarChart3 },
    { name: "Investors", path: "/admin/investors", icon: User },
    { name: "Documents", path: "/admin/documents", icon: FileText },
    { name: "Add Investor", path: "/admin/add-investor", icon: PlusCircle },
    { name: "Drawdowns", path: "/admin/drawdowns", icon: AlertCircle },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-white shadow-md">
        <div className="flex items-center justify-center h-20 border-b">
          <h1 className="text-xl font-bold text-[#4B2E83]">NAFA Admin</h1>
        </div>
        <div className="flex flex-col flex-1 p-4">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center p-3 rounded-md text-[#222222] hover:bg-gray-100 ${
                  activePage === item.name.toLowerCase() ? "bg-gray-100" : ""
                }`}
                onClick={() => setActivePage(item.name.toLowerCase())}
              >
                <item.icon className="h-5 w-5 mr-3 text-[#4B2E83]" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center"
              onClick={signOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden m-4 absolute top-0 left-0 z-10">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <div className="py-4">
            <h1 className="text-xl font-bold text-center text-[#4B2E83] mb-6">NAFA Admin</h1>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center p-3 rounded-md text-[#222222] hover:bg-gray-100 ${
                    activePage === item.name.toLowerCase() ? "bg-gray-100" : ""
                  }`}
                  onClick={() => setActivePage(item.name.toLowerCase())}
                >
                  <item.icon className="h-5 w-5 mr-3 text-[#4B2E83]" />
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="mt-6">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center"
                onClick={signOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow h-16 flex items-center justify-end px-6">
          <div className="text-sm text-[#808080]">
            Admin Portal
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
