import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const checkAuth = (Component) => (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  useEffect(() => {
    async function checkPermission() {
      try {
        const response = await axios.get("http://localhost:5000/checkAuth", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setIsLoading(false);
        }
      } catch (err) {
        setRedirectToLogin(true);
        setIsLoading(false);
      }
    }
    checkPermission();
  });
  if (isLoading) return null;
  if (redirectToLogin) return <Redirect to="/login" />;
  return <Component {...props} />;
};
export default checkAuth;
