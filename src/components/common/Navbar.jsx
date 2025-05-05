import React from "react";
import { Link } from "react-router-dom";
import { useAuth} from "../../context/AuthContext.jsx";
import logo from '../../assets/laztcatlogo2-1.png';

export default function Navbar() {
    const { user, logout } = useAuth();
  return (
    <nav className="bg-[#191923] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
        <Link to={user ? "/dashboard": "/"} className="flex items-center">
          <img src={logo} alt="NotesApp Logo" className="h-9 w-7" />
          <span className="text-xl font-normal text-white hover:text-orange-300 transition">Lazy cat</span>
        </Link>
        </div>

        <div className="flex items-center space-x-4">
            {user ? (
          <>
            <Link
              to="/dashboard"
              className="text-white hover:text-red-100 transition"
            >
              Dashboard
            </Link>
            <Link
              to={user && user._id ? `/profile/${user._id}` : "#"}
              className="text-white hover:text-red-100 transition"
            >
              Profile
            </Link>
            <button
              onClick={logout} // Call the logout function when clicked
              className="text-white hover:text-[#FF6C1F] transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-white hover:text-red-100 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-white hover:text-red-100 transition"
            >
              Signup
            </Link>
          </>
        )}
        </div>
    </nav>
   
  )
}


