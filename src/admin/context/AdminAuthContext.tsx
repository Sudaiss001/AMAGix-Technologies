import React, { createContext, useContext, useState, useEffect } from "react";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  adminUser: AdminUser | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const defaultAdminUser: AdminUser = {
  id: "adm-001",
  name: "AMAGix Admin",
  email: "amagixtechnologies@gmail.com",
  role: "Super Administrator",
  avatarUrl: "/logo.jpeg"
};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const savedAuth = sessionStorage.getItem("amagix_admin_auth") || localStorage.getItem("amagix_admin_auth");
    return savedAuth === "true";
  });

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    const savedAuth = sessionStorage.getItem("amagix_admin_auth") || localStorage.getItem("amagix_admin_auth");
    return savedAuth === "true" ? defaultAdminUser : null;
  });

  const login = async (email: string, password: string, rememberMe = false): Promise<{ success: boolean; message?: string }> => {
    // Frontend demo login simulation (will be replaced by Laravel API endpoint later)
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (!email || !password) {
      return { success: false, message: "Please fill in both email and password." };
    }

    if (password.length < 4) {
      return { success: false, message: "Password must be at least 4 characters." };
    }

    setIsAuthenticated(true);
    setAdminUser(defaultAdminUser);

    if (rememberMe) {
      localStorage.setItem("amagix_admin_auth", "true");
    } else {
      sessionStorage.setItem("amagix_admin_auth", "true");
    }

    return { success: true, message: "Authentication successful." };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
    sessionStorage.removeItem("amagix_admin_auth");
    localStorage.removeItem("amagix_admin_auth");
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, adminUser, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
