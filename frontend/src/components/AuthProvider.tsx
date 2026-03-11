import { createContext, useEffect, useState } from "react";
import { apiClient } from "../services/apiClient";

type AuthContextType = {
    user: string | null;
    loading: boolean;
    refreshAuth: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    console.log("AuthProvider mounted");

    const [user, setUser] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshAuth = async () => {
        setLoading(true);

        try {
            const data = await apiClient.get<{username: string}>("/api/auth/me");
            setUser(data.username);
        } catch (err) {
            setUser(null);
        }

        setLoading(false);
    };

    useEffect(() => {
        console.log("Running refreshAuth");
        refreshAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, refreshAuth }}>
            {children}
        </AuthContext.Provider>
    );
}