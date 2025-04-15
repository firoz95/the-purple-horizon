
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute, AdminRoute, InvestorRoute } from "@/components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";

// Admin pages
import AdminLayout from "./components/layouts/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import InvestorsPage from "./pages/admin/Investors";
import DocumentsPage from "./pages/admin/Documents";
import AddInvestorPage from "./pages/admin/AddInvestor";
import DrawdownsPage from "./pages/admin/Drawdowns";

// Investor pages
import InvestorLayout from "./components/layouts/InvestorLayout";
import InvestorDashboard from "./pages/investor/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/auth" element={<Auth />} />
            
            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="investors" element={<InvestorsPage />} />
              <Route path="documents" element={<DocumentsPage />} />
              <Route path="add-investor" element={<AddInvestorPage />} />
              <Route path="drawdowns" element={<DrawdownsPage />} />
            </Route>
            
            {/* Investor Routes */}
            <Route
              path="/dashboard"
              element={
                <InvestorRoute>
                  <InvestorLayout />
                </InvestorRoute>
              }
            >
              <Route path=":investorId" element={<InvestorDashboard />} />
            </Route>
            
            {/* Redirect from root to auth page */}
            <Route path="/" element={<Navigate to="/auth" replace />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
