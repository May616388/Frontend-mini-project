import React from 'react'
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/laztcatlogo2-1.png";
import catMobile from "../assets/catMobile.png";
import catDesktop from "../assets/catDesktop.png";

const SignupPage = () => {
    const { setUser } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const data = await signupUser({ fullName, email, password });
      setUser(data.user); // Save user to AuthContext
      navigate("/dashboard"); // Redirect on success
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
        <div className="flex flex-col min-h-screen bg-slate-50 lg:flex lg:flex-row-reverse lg:justify-center lg:items-center">
        <div className="lg:w-360 lg:h-203 lg:flex lg:flex-row-reverse lg:gap-0 lg:shadow-lg lg:p-0">
      {/* Image*/}
      <div className="lg:w-1/2 lg:flex lg:justify-center lg:items-center">
        <div>
          <img src={catMobile} alt="dog" className="h-70 w-98 lg:hidden" />
          <img src={catDesktop} alt="dog" className="hidden lg:block lg:max-h-full lg:w-auto object-contain"/>
        </div>
      </div>
    
      {/* Form */}
      <div className="bg-white p-4 lg:w-1/2 lg:bg-white lg:px-34 lg:py-12 lg:flex lg:flex-col lg:justify-center lg:items-center ">
        <div className="gap-2 flex flex-row items-center mb-8 lg:mb-12"> 
          <img src={Logo} alt="logo lazy cat" className="hidden lg:block lg:h-12 lg:w-10" />
          <h3 className="hidden lg:block lg:text-[#191923] lg:text-xl lg:font-normal">Lazy Cat</h3>
        </div>
        <h1 className=" text-[#191923] text-3xl font-bold lg:text-4xl lg:font-bold lg:mt-8">Create your account</h1>
    
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4 w-full lg:space-y-4 lg:w-full lg:mt-8">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-normal text-[#191923]"
            >
              Username
            </label>
            <input
              id="fullName"
              type="text"
              className="bg-[#F5F7FA] mt-2 block w-full px-4 py-3 border border-[#DDDDE4] rounded-full focus:ring focus:ring-gray-600"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              autoFocus
              placeholder='Enter your username'
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-normal text-[#191923]"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="bg-[#F5F7FA] mt-2 block w-full px-4 py-3 border border-[#DDDDE4] rounded-full focus:ring focus:ring-gray-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='Enter your email'
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-normal text-[#191923]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="bg-[#F5F7FA] mt-2 block w-full px-4 py-3 border border-[#DDDDE4] rounded-full focus:ring focus:ring-gray-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Enter your password'
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-normal text-[#191923]"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="bg-[#F5F7FA] mt-2 block w-full px-4 py-3 border border-[#DDDDE4] rounded-full focus:ring focus:ring-gray-600"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder='Enter your password'
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full h-12 bg-[#191923] hover:shadow-lg text-white font-medium text-base py-2 rounded-full transition duration-300"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-base text-[#3E3E3E] mt-4 lg:mt-8">
          Already have an account?{" "}
          <Link to="/login" className="text-[#FF6C1F] text-base font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
      </div>
    </div>
  )
}

export default SignupPage