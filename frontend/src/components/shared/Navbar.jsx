import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, User2, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const navLinkClass = "hover:text-purple-400 transition-all duration-200";

  return (
    <div className="bg-gray-900 text-white border-b border-gray-800 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16 px-4">
        {/* Animated Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            to="/"
            className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            <span className="text-white dark:text-white">Next</span>
            <span className="text-purple-400 dark:text-purple-500">Hire</span>
          </Link>
        </motion.div>

        {/* Navigation Links */}
        <div className="flex items-center gap-10">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {user?.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies" className={navLinkClass}>
                    Manage Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className={navLinkClass}>
                    Manage Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className={navLinkClass}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className={navLinkClass}>
                    Job Listings
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className={navLinkClass}>
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="/" className={navLinkClass}>
                    About Us
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Auth Controls */}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="user-avatar"
                  />
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-gray-800 text-white border-gray-700 shadow-lg rounded-lg p-4">
                <div className="flex gap-3 items-center">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="user-avatar"
                    />
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{user?.fullname}</h4>
                    <p className="text-sm text-gray-400">
                      {user?.profile?.bio || "No bio set"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  {user?.role === "student" && (
                    <div className="flex items-center gap-2">
                      <User2 size={18} />
                      <Link to="/profile">
                        <Button
                          variant="link"
                          className="text-purple-400 hover:text-purple-500 px-0"
                        >
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <LogOut size={18} />
                    <Button
                      onClick={logoutHandler}
                      variant="link"
                      className="text-red-400 hover:text-red-500 px-0"
                    >
                      Logout
                    </Button>
                  </div>
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
