import {BrowserRouter} from "react-router-dom";
import { AppRoutes, Header } from "./components";

export default function App() {
    return (
            <BrowserRouter>
                <Header/>
                <AppRoutes/>
            </BrowserRouter>
    );
}