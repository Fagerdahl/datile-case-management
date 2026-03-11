import { apiClient } from "../services/apiClient";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
    const { user } = useAuth();

    React.useEffect(() => {
        if (user) navigate("/");
    }, [user]);

    const navigate = useNavigate();
    const { refreshAuth } = useAuth();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        try {
            await apiClient.post("/api/auth/login", { username, password });

            // Ask backend who the user is (uses the cookie)
            await refreshAuth();

            // Go to main page
            navigate("/");
        } catch (err) {
            console.error("Login failed", err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name="username" placeholder="Username" required />
            <input name="password" type="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
}