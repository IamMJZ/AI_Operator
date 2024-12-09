import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/home";
import Analyzes from "./pages/analyzes";
import Auth from "./pages/auth";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "./store/authSlice";
import { toast } from "react-toastify";
import { FaUsers } from "react-icons/fa";

import { TbAnalyze } from "react-icons/tb";
import Detail from "./pages/analyzes/Detail";

export default function App() {
  const { token } = useSelector((s: { auth: { token: string } }) => s.auth);

  if (token) return <MainLayout />;

  return <Auth />;
}

function MainLayout() {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }} className="">
      <div className="sticky top-0 self-start bg-transparent min-h-screen bg-[#FBFBFB]">
        <Sidebar collapsed={collapsed} className="h-full">
          <Menu>
            <MenuItem
              onClick={() => {
                navigate("/");
              }}
              icon={<FaUsers className="w-5 h-5" />}
            >
              Users
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/analyzes");
              }}
              icon={<TbAnalyze className="w-5 h-5" />}
            >
              Analyzes
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
      <div style={{ flex: 1 }} className="bg-gray-100">
        <nav className="flex justify-between px-5 py-3 sticky top-0 bg-gray-200 z-10">
          <button className="" onClick={() => setCollapsed(!collapsed)}>
            <IoMenu className="w-6 h-6" />
          </button>
          <span className="relative group">
            <IoPersonCircleSharp className="w-6 h-6" />
            <button
              onClick={() => {
                dispatch(signOut());
                toast.success("You have successfully Logged Out!");
              }}
              className="w-[100px] border border-gray-300 text-sm absolute text-red-500 font-bold right-0 mt-2 p-2 bg-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Log Out
            </button>
          </span>
        </nav>
        <hr />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyzes" element={<Analyzes />} />
          <Route path="/analyzes/:id" element={<Detail />} />
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </div>
    </div>
  );
}
