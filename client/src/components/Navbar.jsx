import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';

function Navbar() {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'text-blue-400' : 'text-slate-300 hover:text-white';
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="bg-blue-600 p-1.5 rounded-lg">
                            <span className="text-xl">🇱🇰</span>
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            FixIt SL
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/')}`}>
                            Home
                        </Link>
                        <Link to="/map" className={`text-sm font-medium transition-colors ${isActive('/map')}`}>
                            Live Map
                        </Link>
                        <Link to="/login" className={`text-sm font-medium transition-colors ${isActive('/login')}`}>
                            Admin
                        </Link>
                    </div>

                    {/* CTA Button */}
                    <div className="flex items-center">
                        <Link
                            to="/report"
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-sm font-bold py-2 px-5 rounded-full transition-all duration-300 shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50 transform hover:scale-105"
                        >
                            <span>Report Issue</span>
                            <span className="animate-pulse">🚨</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
