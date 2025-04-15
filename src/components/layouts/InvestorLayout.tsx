
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogOut } from "lucide-react";

export default function InvestorLayout() {
  const { signOut } = useAuth();
  const [activeSection, setActiveSection] = useState("summary");

  const sectionItems = [
    { name: "Summary", id: "summary" },
    { name: "NAV History", id: "nav-history" },
    { name: "Capital Activity", id: "capital-activity" },
    { name: "Co-Investments", id: "co-investments" },
    { name: "Documents", id: "documents" },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Header */}
      <div className="fixed top-0 left-0 right-0 bg-card border-b border-[#222222] shadow-dashboard z-10 rounded-b-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <h1 className="text-xl font-bold text-white">NAFA Investor Portal</h1>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {sectionItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium hover:text-[#4B2E83] transition-colors ${
                  activeSection === item.id ? "text-[#4B2E83]" : "text-white"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            className="hidden md:flex items-center border-[#333333] text-white hover:bg-[#222222]"
            onClick={signOut}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="md:hidden fixed top-4 right-4 z-20 border-[#333333]"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64 bg-card">
          <div className="py-4">
            <h2 className="text-lg font-bold text-white mb-6">Navigate To</h2>
            <nav className="space-y-2">
              {sectionItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    document.querySelector('[data-state="open"]')?.setAttribute('data-state', 'closed');
                  }}
                  className={`flex items-center p-3 rounded-lg text-white hover:bg-[#222222] transition-colors w-full text-left ${
                    activeSection === item.id ? "bg-[#222222]" : ""
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
            <div className="mt-6">
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
      <main className="flex-1 mt-16 p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
