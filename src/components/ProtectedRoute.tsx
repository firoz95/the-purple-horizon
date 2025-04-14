
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4B2E83]"></div>
    </div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { userRole, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4B2E83]"></div>
    </div>;
  }

  if (userRole !== "admin") {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export const InvestorRoute = ({ children }: { children: React.ReactNode }) => {
  const { userRole, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4B2E83]"></div>
    </div>;
  }

  if (userRole !== "investor") {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};
