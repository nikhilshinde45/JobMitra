import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, User2 } from "lucide-react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../../utils/constant";
import { setLoading, setUser } from "../../redux/authSlice";

import { toast } from "sonner";
import axios from "axios";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found, user not authenticated");
        return;
      }
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#6A38C2] via-[#8752e0] to-[#6A38C2] shadow-md">
      <div className="flex items-center justify-between h-16 px-6 mx-auto text-white max-w-7xl">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold tracking-wide">
            Job<span className="text-[#FBBF24]">Mitra</span>
          </h1>
        </div>

        {/* Nav Items + Profile */}
        <div className="flex items-center gap-12">
          <ul className="flex items-center gap-6 font-medium">
            {user && user.role === "recruiter" ? (
              <>
                <a
                  href="/admin/companies"
                  className="hover:text-[#FBBF24] transition duration-300"
                >
                  Companies
                </a>
                <a
                  href="/admin/jobs"
                  className="hover:text-[#FBBF24] transition duration-300"
                >
                  Jobs
                </a>
              </>
            ) : (
              <>
                <a
                  href="/"
                  className="hover:text-[#FBBF24] transition duration-300"
                >
                  Home
                </a>
                <a
                  href="/jobs"
                  className="hover:text-[#FBBF24] transition duration-300"
                >
                  Jobs
                </a>
                <a
                  href="/browse"
                  className="hover:text-[#FBBF24] transition duration-300"
                >
                  Browse
                </a>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex gap-3">
              <Link to="/login">
                <Button className="bg-transparent text-white border border-white hover:bg-white hover:text-[#6A38C2] transition duration-300">
                  Login
                </Button>
              </Link>

              <Link to="/signup">
                <Button className="!bg-[#FBBF24] text-black font-semibold hover:!bg-[#e6a800] transition duration-300">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="w-10 h-10 rounded-full cursor-pointer ring-2 ring-white hover:ring-[#FBBF24] transition duration-300">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                    className="object-cover w-full h-full rounded-full"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="h-auto p-4 mt-2 text-gray-800 bg-white shadow-xl rounded-xl w-72">
                {/* Profile Info */}
                <div className="flex items-center gap-3 pb-3 border-b">
                  <Avatar className="w-20 h-10 rounded-full">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                      className="object-cover w-full rounded-full"
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {user?.fullname}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                {user && user.role === "student" && (
                  <div className="mt-4 space-y-2">
                    <a
                      href="/profile"
                      className="flex items-center gap-2 text-gray-700 hover:text-[#6A38C2] transition duration-200"
                    >
                      <User2 size={18} />
                      View Profile
                    </a>
                  </div>
                )}

                {/* Links */}
                <div className="mt-4 space-y-2">
                  <a
                    href="#"
                    onClick={logoutHandler}
                    className="flex items-center gap-2 text-gray-700 transition duration-200 hover:text-[#6A38C2] "
                  >
                    {" "}
                    <LogOut size={18} /> Log Out{" "}
                  </a>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
