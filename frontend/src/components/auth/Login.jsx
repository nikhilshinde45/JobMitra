import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Loader, Loader2 } from "lucide-react"; // for icons
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import store from "../../redux/store";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "", // added role for radio buttons
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        dispatch(setLoading(true));
        const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  // console.log("Hi");
  // console.log(res.token);
        if (res.data.success) {
          //console.log(res.token);
            localStorage.setItem("token", res.data.token);

          dispatch(setUser(res.data.user));
          navigate("/");
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      } finally {
        dispatch(setLoading(false));
      }
    };

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     dispatch(setLoading(true));

  //     // Create request config similar to your JSON format
  //     const requestConfig = {
  //       method: "POST",
  //       url: `${USER_API_END_POINT}/login`,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       data: {
  //         email: input.email,
  //         password: input.password,
  //         role: input.role,
  //       },
  //     };

  //     const res = await axios(requestConfig);
  //     const data = res.data;

  //     if (data.success) {
  //       localStorage.setItem("token", data.token);
  //       dispatch(setUser(data.user));
  //       navigate("/");
  //       toast.success(data.message);
  //     } else {
  //       toast.error(data.message || "Login failed");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.response?.data?.message || error.message);
  //   } finally {
  //     dispatch(setLoading(false));
  //   }
  // };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-10">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl"
        >
          {/* Title */}
          <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
            Welcome Back 👋
          </h1>
          <p className="mb-8 text-sm text-center text-gray-500">
            Login to continue your journey with{" "}
            <span className="text-[#F83002] font-semibold">JobPortal</span>
          </p>

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
                placeholder="abc@example.com"
                required
                className="pl-10 border-gray-300 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
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
                placeholder="••••••••"
                required
                value={input.password}
                name="password"
                onChange={changeEventHandler}
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

          {/* Role (Student / Recruiter) */}
          <div className="my-6">
            <Label className="text-gray-700">Role</Label>
            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                  required
                />
                Student
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                  required
                />
                Recruiter
              </label>
            </div>
          </div>

          {/* Remember Me + Forgot Password
          <div className="flex items-center justify-between my-4 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="cursor-pointer" />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-indigo-600 hover:underline">
              Forgot Password?
            </Link>
          </div> */}
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
              Login
            </Button>
          )}

          {/* Submit Button */}

          {/* Signup Link */}
          <p className="mt-6 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-indigo-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
