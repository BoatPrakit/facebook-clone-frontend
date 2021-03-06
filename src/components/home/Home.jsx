import { useState, useEffect } from "react";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { GlobalContext } from "../../App";
import Navbar from "../utility/Navbar";
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
      <div className="text-white min-h-header relative top-header">
        This is home.
      </div>
    </div>
  );
}
