import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/common/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import CreateNote from "./pages/CreateNote.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";



function App() {
  return (
    <Router>
      <AuthProvider>
      <Navbar/>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/create" element={<CreateNote />} />
          <Route path="/dashboard" element={<DashboardPage />} />
           
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

