import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/laztcatlogo2-1.png";
import dogMobile from "../assets/dogMobile.png";
import dogDesktop from "../assets/dogDesktop.png";

const LoginPage = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      setUser(data.user); // Save user to AuthContext
      navigate("/dashboard"); // Redirect after successful login
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Login failed. Please try again."
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
      <img src={dogMobile} alt="dog" className="h-70 w-98 lg:hidden" />
      <img src={dogDesktop} alt="dog" className="hidden lg:block lg:max-h-full lg:w-auto object-contain"/>
    </div>
  </div>

  {/* Form */}
  <div className="bg-white p-4 lg:w-1/2 lg:bg-white lg:px-34 lg:py-12 lg:flex lg:flex-col lg:justify-center lg:items-center ">
    <div className="gap-2 flex flex-row items-center mb-8 lg:mb-12"> 
      <img src={Logo} alt="logo lazy cat" className="hidden lg:block lg:h-12 lg:w-10" />
      <h3 className="hidden lg:block lg:text-[#191923] lg:text-xl lg:font-normal">Lazy Cat</h3>
    </div>
    <h1 className="text-[#191923] text-3xl font-bold lg:text-5xl lg:font-bold lg:mt-24">WelcomeBack ✌️</h1>
    <p className="text-base text-[#3D3D3D] font-normal mt-3 lg:text-base lg:text-[#3D3D3D] lg:font-normal lg:mt-3">Enter your email and password to access your account</p>

    {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6 w-full mt-8 ">
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
              autoFocus
              placeholder="Enter your email"
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
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full h-12 bg-[#191923] hover:shadow-lg text-white font-medium text-base py-2 rounded-full transition duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-base text-[#3E3E3E] mt-4 lg:mt-24">
          Don't have an account?{" "}
          <a href="/signup" className="text-[#FF6C1F] text-base font-medium hover:underline">
            Sign up
          </a>
        </p>
  </div>
  </div>
</div>
  );
};

export default LoginPage;
