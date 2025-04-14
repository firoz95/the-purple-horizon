
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  userRole: "admin" | "investor" | null;
  investorId: string | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<"admin" | "investor" | null>(null);
  const [investorId, setInvestorId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Fetch user role when auth state changes
        if (session?.user) {
          fetchUserRole(session.user.id);
        } else {
          setUserRole(null);
          setInvestorId(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserRole(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Redirect based on role whenever userRole changes
  useEffect(() => {
    if (loading) return;
    
    if (!user) {
      navigate("/auth");
    } else if (userRole === "admin") {
      navigate("/admin/dashboard");
    } else if (userRole === "investor" && investorId) {
      navigate(`/dashboard/${investorId}`);
    }
  }, [userRole, investorId, user, loading, navigate]);

  async function fetchUserRole(userId: string) {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("role, id")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching user role:", error);
        return;
      }

      if (data) {
        const role = data.role === "admin" ? "admin" : "investor";
        setUserRole(role);
        // For investors, set their investor ID
        if (role === "investor") {
          setInvestorId(data.id);
        }
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut();
    setUserRole(null);
    setInvestorId(null);
    navigate("/auth");
  };

  return (
    <AuthContext.Provider value={{ session, user, userRole, investorId, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
