import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Mail, Lock, Loader, Loader2 } from "lucide-react"; // icons
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import store from "../../redux/store";
import { setLoading } from "../../redux/authSlice";



const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
   const {loading} = useSelector(store=>store.auth);
   const dispatch = useDispatch();
  //For navigation
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }finally{
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* Navbar */}
      <Navbar />

      {/* Centered Signup Card */}
      <div className="flex items-center justify-center px-4 py-10">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-lg p-8 bg-white shadow-xl rounded-2xl"
        >
          {/* Title */}
          <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
            Create an Account
          </h1>
          <p className="mb-8 text-sm text-center text-gray-500">
            Join Job
            <span className="text-[#F83002] font-semibold">Portal</span> and
            start your journey 🚀
          </p>

          {/* Full Name */}
          <div className="my-4">
            <Label htmlFor="fullname" className="text-gray-700">
              Full Name
            </Label>
            <Input
              id="fullname"
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter your full name"
              className="mt-2 transition-all duration-200 border-gray-300 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email */}
          <div className="my-4">
            <Label htmlFor="email" className="text-gray-700">
              Email
            </Label>
            <div className="relative mt-2">
              <Mail className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
              <Input
                id="email"
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="abc@gmail.com"
                required
                className="pl-10 border-gray-300 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="my-4">
            <Label htmlFor="phone" className="text-gray-700">
              Mobile Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="Enter phone number"
              pattern="[0-9]{10}"
              maxLength="10"
              required
              className="mt-2 transition-all duration-200 border-gray-300 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div className="my-4">
            <Label htmlFor="password" className="text-gray-700">
              Password
            </Label>
            <div className="relative mt-2">
              <Lock className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="Enter a strong password"
                required
                className="pl-10 border-gray-300 focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="button"
                className="absolute text-sm text-indigo-600 right-3 top-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Role + Profile Upload */}
          <div className="flex flex-col justify-between gap-6 my-6 sm:flex-row">
            {/* Radio Group */}
            <RadioGroup className="flex gap-6">
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                  required
                />
                <Label>Student</Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                  required
                />
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>

            {/* Profile Upload */}
            <div className="flex items-center gap-3">
              <Label className="text-gray-700">Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="p-1 transition-all duration-200 border-gray-300 cursor-pointer file:mr-4 file:rounded-md file:border-0 file:bg-indigo-100 file:px-3 file:py-1 file:text-indigo-600 hover:file:bg-indigo-200"
              />
            </div>
          </div>

          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full py-3 mt-4 text-lg font-semibold text-white transition-all duration-300 shadow-md rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              Sign Up
            </Button>
          )}


          {/* Login Link */}
          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
