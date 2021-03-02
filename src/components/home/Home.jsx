// import { useState, useEffect } from "react";
import Navbar from "../utility/Navbar";
export default function Home() {
  return (
    <div className="bg-bodyBg relative min-h-screen">
      <Navbar />
      <div className="text-white min-h-header relative top-header">
        This is home.
      </div>
    </div>
  );
}
