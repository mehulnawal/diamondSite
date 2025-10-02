import React, { useState, useRef, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom"; // <-- ADDED Link here
import { User, ShoppingCart, Search, X, Menu } from "lucide-react"; 

export default function Navbar() {
    // State to manage the visibility of the search overlay
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    
    // Ref to hold a reference to the search input element
    const searchInputRef = useRef(null);

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    // useEffect hook to handle focus when the search bar state changes
    useEffect(() => {
        if (isSearchOpen) {
            // Wait for the component to render and the bar to become visible, 
            // then focus the input field using the ref
            searchInputRef.current?.focus();
        }
    }, [isSearchOpen]); // Dependency array: runs whenever isSearchOpen changes

    return (
        <>
            {/* Search Overlay Component: Slides down from the top */}
            <div
                className={`fixed top-0 left-0 w-full bg-white transition-all duration-300 ease-in-out z-[60] 
                ${isSearchOpen ? 'h-32 opacity-100 shadow-xl' : 'h-0 opacity-0 overflow-hidden'}`}
            >
                <div className="max-w-4xl mx-auto h-full flex items-center justify-center px-6">
                    <form className="w-full flex">
                        <input
                            type="text"
                            // 1. Attach the ref to the input field
                            ref={searchInputRef}
                            // Search bar placeholder
                            placeholder="Search Adena for jewelry, collections, and more..." 
                            // Styling
                            className="flex-grow p-3 text-xl text-black border-b-2 border-gray-400 placeholder-gray-500 focus:outline-none focus:border-black"
                        />
                        <button 
                            type="submit" 
                            aria-label="Submit Search"
                            className="p-3 text-gray-500 hover:text-black transition-colors"
                        >
                            <Search className="w-6 h-6" />
                        </button>
                    </form>
                    
                    {/* Close Button for Search Bar */}
                    <button 
                        onClick={toggleSearch} 
                        aria-label="Close Search"
                        // FIX: Removed asterisks around cursor-pointer
                        className="ml-6 p-2 text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Main Navbar: Logo (Left), Links (Center), Icons (Right) */}
            <nav className="sticky top-0 h-20 w-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)] flex items-center justify-between px-6 md:px-12 z-50">

                {/* LEFT: Logo/Brand Name */}
                <div className="flex-shrink-0">
                    <span className="font-serif text-3xl font-normal text-black tracking-widest uppercase">
                        ADENA
                    </span>
                </div>

                {/* CENTER: Navigation Links (Absolute positioning to center them) */}
                <div className="hidden lg:flex gap-8 items-center text-gray-700 font-medium text-base absolute left-1/2 transform -translate-x-1/2">
                    {/* Use Link for internal navigation */}
                    <Link
                        to="/"
                        className="hover:text-black transition-colors duration-200"
                    >
                        Home
                    </Link>
                    {/* Replaced <a> with Link for Product */}
                    <Link
                        to="/product" // Changed href to to
                        className="hover:text-black transition-colors duration-200"
                    >
                        Product
                    </Link>
                    {/* Updated About link to use Link */}
                    <Link
                        to="/about"
                        className="hover:text-black transition-colors duration-200"
                    >
                        About
                    </Link>
                    {/* Updated Contact link to use Link */}
                    <Link
                        to="/contact"
                        className="hover:text-black transition-colors duration-200"
                    >
                        Contact
                    </Link>
                </div>

                {/* RIGHT: Icon Buttons and Mobile Menu Toggle */}
                <div className="flex-shrink-0 flex gap-4 items-center">
                    
                    {/* Icons */}
                    <div className="flex gap-4 items-center text-gray-700">
                        {/* Search Icon (Opens the overlay) */}
                        <button aria-label="Search" onClick={toggleSearch} className="cursor-pointer">
                            <Search className="w-5 h-5 hover:text-black transition-colors" />
                        </button>
                        {/* Updated account link to use Link */}
                        <Link to="/account" aria-label="User Account" className="cursor-pointer">
                            <User className="w-5 h-5 hover:text-black transition-colors" />
                        </Link>
                        {/* Updated cart link to use Link */}
                        <Link to="/cart" aria-label="Shopping Cart" className="relative cursor-pointer">
                            <ShoppingCart className="w-5 h-5 hover:text-black transition-colors" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                1
                            </span>
                        </Link>
                    </div>
                    
                    {/* Mobile Hamburger Menu */}
                    <button className="lg:hidden cursor-pointer" aria-label="Open menu">
                        <Menu className="w-6 h-6 text-gray-800" />
                    </button>
                </div>
            </nav>

            <Outlet />
        </>
    );
}
