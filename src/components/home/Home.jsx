import { useState, useEffect } from "react";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { GlobalContext } from "../../App";
import Navbar from "../utility/Navbar";
import LeftSide from "./LeftSide";
import MainContent from "./MainContent";
import RightSide from "./RightSide";
export default function Home() {
  const { user } = useContext(GlobalContext);
  const [isRedirect, setIsRedirect] = useState(false);
  useEffect(() => {
    if (!user) setIsRedirect(true);
    else setIsRedirect(false);
  }, [user, isRedirect]);
  if (isRedirect || !user) return <Redirect to="/login" />;
  return (
    <div className="bg-bodyBg relative min-h-screen">
      <Navbar />
      <div className="flex justify-between text-white min-h-header pt-3 relative top-header">
        <LeftSide user={user} />
        <MainContent user={user} />
        <RightSide user={user} />
      </div>
    </div>
  );
}
