import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input.jsx";
import { validateEmail } from "../../utils/helper.js";
import AuthLayout from "../../components/Layouts/AuthLayout.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setError(null);

    try {
      console.log("Logging in with:", { email, password });
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
    }
    
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-1">Please enter your details!</p>

        <form onSubmit={handleLogin} className="w-full mt-8">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="johndoe@example.com"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Minimum 8 Characters"
            type="password"
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-cyan-800 text-white py-2 rounded-md mt-4 hover:bg-cyan-500 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm mt-4">
          Don't have an account?
          <Link className="text-cyan-600 hover:underline" to="/signup">
            Register
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
