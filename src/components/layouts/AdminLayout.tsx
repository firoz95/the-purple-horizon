
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
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-card border-r border-[#222222]">
        <div className="flex items-center justify-center h-20 border-b border-[#222222]">
          <h1 className="text-xl font-bold text-white">NAFA Admin</h1>
        </div>
        <div className="flex flex-col flex-1 p-4">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center p-3 rounded-lg text-white hover:bg-[#222222] transition-colors ${
                  activePage === item.name.toLowerCase() ? "bg-[#222222]" : ""
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
              className="w-full flex items-center justify-center border-[#333333] text-white hover:bg-[#222222]"
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
          <Button 
            variant="outline" 
            size="icon" 
            className="md:hidden m-4 absolute top-0 left-0 z-10 border-[#333333]"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-card border-r border-[#222222] p-0">
          <div className="py-4">
            <h1 className="text-xl font-bold text-center text-white mb-6">NAFA Admin</h1>
            <nav className="space-y-2 px-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg text-white hover:bg-[#222222] transition-colors ${
                    activePage === item.name.toLowerCase() ? "bg-[#222222]" : ""
                  }`}
                  onClick={() => setActivePage(item.name.toLowerCase())}
                >
                  <item.icon className="h-5 w-5 mr-3 text-[#4B2E83]" />
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="mt-6 px-4">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center border-[#333333] text-white hover:bg-[#222222]"
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
        <header className="bg-card border-b border-[#222222] h-16 flex items-center justify-end px-6">
          <div className="text-sm text-[#808080]">
            Admin Portal
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
