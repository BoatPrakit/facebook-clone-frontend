import logo from "../../assets/facebook_logo.png";
import { Link, Redirect } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../App";
import axios from "axios";
export default function Navbar() {
  const { user, setUser } = useContext(GlobalContext);
  const [isRedirectToLogin, setIsRedirectToLogin] = useState(false);
  async function logout() {
    try {
      await axios.get("http://localhost:5000/api/user/logout", {
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
    <div className="bg-navBarBg fixed flex height-header w-full items-center justify-between">
      <div className="p-1 pl-2">
        <Link to="/">
          <img src={logo} alt="" width="40px" />
        </Link>
      </div>
      <div className="flex text-2xl h-full">
        <Link
          to="/"
          className="text-primary flex justify-center items-center px-8 rounded border-b-2 border-primary"
        >
          <i className="fas fa-home"></i>
        </Link>
        <Link
          to="/"
          className="text-white flex justify-center hover:bg-gray-700 items-center px-8 rounded m-1"
        >
          <i className="fas fa-desktop"></i>
        </Link>
        <Link
          to="/"
          className="text-white flex justify-center hover:bg-gray-700 items-center px-8 rounded m-1"
        >
          <i className="fas fa-comments-dollar"></i>
        </Link>
        <Link
          to="/"
          className="text-white flex justify-center hover:bg-gray-700 items-center px-8 rounded m-1"
        >
          <i className="fas fa-users"></i>
        </Link>
        <Link
          to="/"
          className="text-white flex justify-center hover:bg-gray-700 items-center px-8 rounded m-1"
        >
          <i className="fas fa-gamepad"></i>
        </Link>
      </div>
      <div className="flex mr-2 items-center text-white">
        <div className="mr-3">{user.firstName}</div>
        <button className="cursor-pointer p-2 bg-gray-700" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
