import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input.jsx";
import { validateEmail } from "../../utils/helper.js";
import AuthLayout from "../../components/Layouts/AuthLayout.jsx";
import ProfilePhotoInput from "../../components/Inputs/ProfilePhotoInput.jsx";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    let profilePic = "";
    if(!fullName) {
      setError("Please enter your full name");
      return;
    }
    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;
    }
    if(!password || password.length < 8){
      setError("Password must be at least 8 characters long");
      return;
    }

  };
  return (
    <AuthLayout>
      <div className="lg:w-[90%] md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an account</h3>
        <p className="text-xs text-slate-700 mt-1 pb-10">
          Sign up and get started today!
        </p>

        <form onSubmit={handleSignUp} className="w-full"> 
          <div className="p-4">
          <ProfilePhotoInput image={profilePic} setImage={setProfilePic} /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John Doe"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="johndoe@example.com"
              type="text"
            />
            <div className="col-span-2">
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
              className="w-full bg-cyan-800 text-white py-3 rounded-md mt-4 hover:bg-cyan-500 transition"
            >
              Login
            </button>
            </div>
          </div>
        </form>

        <p className="text-sm mt-4">
          Already have an account?{" "}
          <Link className="text-cyan-600 hover:underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
