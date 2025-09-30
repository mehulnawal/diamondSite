import { User, LogIn, LogOut } from "lucide-react";
import { Outlet } from "react-router";

export default function Navbar() {
    return (
        <>
            <nav className="sticky top-0 h-20 w-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)] flex items-center justify-between px-8 z-50">
                {/* Logo */}
                <div className="flex items-center">
                    <img
                        src="/logo-diamond.png"
                        alt="Diamond Business Logo"
                        className="h-[50px] mr-4"
                        style={{ filter: "drop-shadow(0 2px 6px #D4AF37)" }}
                    />
                    <span className="font-playfair text-2xl font-bold text-[#1E40AF] tracking-wide">
                        Diamond Business
                    </span>
                </div>
                {/* Navigation Links */}
                <div className="hidden md:flex gap-8 items-center text-[#0F172A] font-semibold text-lg">
                    <a
                        href="/"
                        className="hover:underline decoration-[#D4AF37] underline-offset-8 transition-all duration-300"
                    >
                        Home
                    </a>
                    <a
                        href="/about"
                        className="hover:underline decoration-[#D4AF37] underline-offset-8 transition-all duration-300"
                    >
                        About
                    </a>
                    <a
                        href="/features"
                        className="hover:underline decoration-[#D4AF37] underline-offset-8 transition-all duration-300"
                    >
                        Features
                    </a>
                    <a
                        href="/contact"
                        className="hover:underline decoration-[#D4AF37] underline-offset-8 transition-all duration-300"
                    >
                        Contact
                    </a>
                    <a
                        href="/products"
                        className="hover:underline decoration-[#D4AF37] underline-offset-8 transition-all duration-300"
                    >
                        Products
                    </a>
                </div>
                {/* Auth Buttons */}
                <div className="flex gap-4 items-center">
                    <a
                        href="/login"
                        className="border-2 border-[#D4AF37] text-[#D4AF37] rounded-md px-6 py-2 font-montserrat font-semibold transition-all duration-300 hover:bg-[#D4AF37] hover:text-white hover:scale-105 hover:shadow-lg"
                    >
                        <LogIn className="inline-block w-5 h-5 mr-2" />
                        Login
                    </a>
                    <a
                        href="/register"
                        className="border-2 border-[#D4AF37] text-[#D4AF37] rounded-md px-6 py-2 font-montserrat font-semibold transition-all duration-300 hover:bg-[#D4AF37] hover:text-white hover:scale-105 hover:shadow-lg"
                    >
                        <User className="inline-block w-5 h-5 mr-2" />
                        Register
                    </a>
                </div>
                {/* Mobile Hamburger */}
                <button className="md:hidden">
                    {/* Lucide hamburger icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-[#1E40AF]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <line x1="3" y1="7" x2="21" y2="7" strokeWidth="2" />
                        <line x1="3" y1="12" x2="21" y2="12" strokeWidth="2" />
                        <line x1="3" y1="17" x2="21" y2="17" strokeWidth="2" />
                    </svg>
                </button>
            </nav>

            <Outlet />
        </>
    );
}
