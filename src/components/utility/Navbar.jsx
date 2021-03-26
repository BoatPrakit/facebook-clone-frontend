import logo from "../../assets/facebook_logo.png";
import { Link, Redirect } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../App";
import axios from "../../axiosInstance/backend.instance";
import SearchList from "../searchbox/SearchList";
export default function Navbar() {
  const { user, setUser } = useContext(GlobalContext);
  const [isRedirectToLogin, setIsRedirectToLogin] = useState(false);
  async function logout() {
    try {
      await axios.get("/api/auth/logout", {
        withCredentials: true,
      });
      setIsRedirectToLogin(true);
    } catch (err) {}
  }
  useEffect(() => {
    return () => setUser(null);
  }, [isRedirectToLogin, setUser]);
  if (isRedirectToLogin) return <Redirect to="/login" />;
  return (
    <div className="bg-navBarBg fixed flex height-header w-full items-center justify-between z-10">
      <div className="p-1 pl-2 w-side flex">
        <Link to="/">
          <img src={logo} alt="" width="40px" />
        </Link>
        <SearchList />
      </div>
      <div className="flex text-2xl h-full w-main justify-between">
        <Link
          to="/"
          className="text-primary flex justify-center items-center w-full rounded border-b-2 border-primary"
        >
          <i className="fas fa-home"></i>
        </Link>
        <Link
          to="/"
          className="text-white flex justify-center hover:bg-gray-700 w-full items-center rounded m-1"
        >
          <i className="fas fa-desktop"></i>
        </Link>
        <Link
          to="/"
          className="text-white flex justify-center hover:bg-gray-700 w-full items-center rounded m-1"
        >
          <i className="fas fa-comments-dollar"></i>
        </Link>
        <Link
          to="/"
          className="text-white flex justify-center hover:bg-gray-700 w-full items-center rounded m-1"
        >
          <i className="fas fa-users"></i>
        </Link>
        <Link
          to="/"
          className="text-white flex justify-center hover:bg-gray-700 w-full items-center rounded m-1"
        >
          <i className="fas fa-gamepad"></i>
        </Link>
      </div>
      <div className="flex mr-2 items-center text-white w-side justify-end">
        <div className="mr-3">{user.firstName}</div>
        <button className="cursor-pointer p-2 bg-gray-700" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
