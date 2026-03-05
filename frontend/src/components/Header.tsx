import { NavLink } from "react-router-dom";
import type { NavLinkRenderProps} from "react-router-dom";

export default function Header() {
    // Reusable styling for nav links
    const navLinkClass = ({isActive}: NavLinkRenderProps) =>
        `flex items-center justify-center h-full px-8 transition
        ${isActive ? "font-bold bg-[#003666]" : ""}`

    return (
        <header className={`bg-[#001A31] flex justify-center w-full`} >
            <nav className={`flex justify-center items-center text-[#F7F7F7] font-poppins h-16`}>
                <NavLink to={"/errands"} className={`px-4`}>
                    <img alt={`datile-logo`} src={"/DatileLogo.png"} height={50} width={100}></img>
                </NavLink>
                <NavLink to={"/errands"} className={navLinkClass} >Ärenden</NavLink>
                <NavLink to={"/reports"} className={navLinkClass} >Rapporter</NavLink>
                <NavLink to={"/customers"} className={navLinkClass} >Kunder</NavLink>
                <NavLink to={"/purchases"} className={navLinkClass} >Inköp</NavLink>
                <NavLink to={"/users"} className={navLinkClass} >Användare</NavLink>
                <NavLink to={"/settings"} className={navLinkClass} >Inställningar</NavLink>
                <NavLink to={"/logout"} className={``} >
                    <button className={`bg-[#99D0B6] px-8 py-1 rounded-full ml-4 font-semibold font-poppins shadow hover:bg-[#6D9682] transition text-[#F7F7F7]`}>Logga ut</button>
                </NavLink>
            </nav>
        </header>
    )
}