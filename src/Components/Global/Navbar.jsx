import { Sun, Moon, Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router";
import { themeToggle } from "./Slice/ThemeSlice";

export default function Navbar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchInputRef = useRef(null);

    const theme = useSelector((state) => state.themeSlice.value);
    const dispatch = useDispatch();
    const isDark = theme === 'dark';

    const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

    useEffect(() => {
        if (isSearchOpen) searchInputRef.current?.focus();
    }, [isSearchOpen]);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <>
            {/* Search Overlay */}
            <div
                className={`fixed top-0 left-0 w-full ${isDark ? 'bg-gray-900' : 'bg-white'} transition-all duration-300 ease-in-out z-[60] ${isSearchOpen ? 'h-20 opacity-100 shadow-xl' : 'h-0 opacity-0 overflow-hidden'}`}
            >
                <div className="max-w-4xl mx-auto h-full flex items-center justify-center px-6">
                    <form className="w-full flex">
                        <input
                            type="text"
                            ref={searchInputRef}
                            placeholder="Search Adena for jewelry, collections, and more..."
                            className={`flex-grow p-3 text-xl ${isDark ? 'text-white bg-gray-900 border-gray-600 placeholder-gray-300 focus:border-white' : 'text-black bg-white border-gray-400 placeholder-gray-500 focus:border-black'} border-b-2 focus:outline-none`}
                        />
                        <button
                            type="submit"
                            aria-label="Submit Search"
                            className={`p-3 ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-black'} transition-colors`}
                        >
                            <Search className="w-6 h-6" />
                        </button>
                    </form>

                    {/* Close Button */}
                    <button
                        onClick={toggleSearch}
                        aria-label="Close Search"
                        className={`ml-6 p-2 ${isDark ? 'text-gray-300' : 'text-gray-500'} hover:text-red-600 transition-colors cursor-pointer`}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Navbar */}
            <nav className={`sticky top-0 h-20 w-full ${isDark ? 'bg-gray-900' : 'bg-white'} shadow-[0_2px_10px_rgba(0,0,0,0.1)] flex items-center justify-between px-6 md:px-12 z-50`}>
                {/* LEFT: Logo */}
                <div className="flex-shrink-0">
                    <span className={`font-serif text-3xl font-normal ${isDark ? 'text-white' : 'text-black'} tracking-widest uppercase`}>
                        ADENA
                    </span>
                </div>

                {/* CENTER: Links */}
                <div className={`hidden lg:flex gap-8 items-center ${isDark ? 'text-gray-300' : 'text-gray-700'} font-medium text-base absolute left-1/2 transform -translate-x-1/2`}>
                    <Link
                        to="/"
                        className={`${isDark ? 'hover:text-white' : 'hover:text-black'} transition-colors duration-200`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/product"
                        className={`${isDark ? 'hover:text-white' : 'hover:text-black'} transition-colors duration-200`}
                    >
                        Product
                    </Link>
                    <Link
                        to="/about"
                        className={`${isDark ? 'hover:text-white' : 'hover:text-black'} transition-colors duration-200`}
                    >
                        About
                    </Link>
                    <Link
                        to="/contact"
                        className={`${isDark ? 'hover:text-white' : 'hover:text-black'} transition-colors duration-200`}
                    >
                        Contact
                    </Link>
                </div>

                {/* RIGHT: Icons + Theme Toggle */}
                <div className="flex-shrink-0 flex gap-4 items-center">
                    <div className={`flex gap-4 items-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {/* Search Icon */}
                        <button
                            aria-label="Search"
                            onClick={toggleSearch}
                            className="cursor-pointer"
                        >
                            <Search className={`w-5 h-5 ${isDark ? 'hover:text-white' : 'hover:text-black'} transition-colors`} />
                        </button>

                        <Link
                            to="/account"
                            aria-label="User Account"
                            className="cursor-pointer"
                        >
                            <User className={`w-5 h-5 ${isDark ? 'hover:text-white' : 'hover:text-black'} transition-colors`} />
                        </Link>

                        <Link
                            to="/cart"
                            aria-label="Shopping Cart"
                            className="relative cursor-pointer"
                        >
                            <ShoppingCart className={`w-5 h-5 ${isDark ? 'hover:text-white' : 'hover:text-black'} transition-colors`} />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                1
                            </span>
                        </Link>

                        {/* Theme Toggle */}
                        <button
                            onClick={() => dispatch(themeToggle())}
                            aria-label="Toggle Theme"
                            className={`p-2 cursor-pointer rounded-full ${isDark ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} transition-colors`}
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="lg:hidden cursor-pointer"
                        aria-label="Open menu"
                    >
                        <Menu className={`w-6 h-6 ${isDark ? 'text-white' : 'text-gray-800'}`} />
                    </button>
                </div>
            </nav>

            <Outlet />
        </>
    );
}