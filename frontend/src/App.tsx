import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider.tsx";
import { Header, AppRoutes } from "./components";

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Header />
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    );
}