import logo from "../../assets/facebook_logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function Navbar() {
  const [username, setUsername] = useState("");
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
          <i class="fas fa-home"></i>
        </Link>
        <Link
          to="/"
          className="text-white flex justify-center hover:bg-gray-700 items-center px-8 rounded m-1"
        >
          <i class="fas fa-desktop"></i>
        </Link>
      </div>
      <div>Profile</div>
    </div>
  );
}
