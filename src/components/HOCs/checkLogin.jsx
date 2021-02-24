import { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
const checkLogin = (Component) => (props) => {
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function checkPermission() {
      try {
        const response = await axios.get("http://localhost:5000/checkAuth", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setRedirectToHome(true);
          setIsLoading(false);
        }
      } catch (err) {}
    }
    checkPermission();
  });
  if (isLoading) return null;
  if (redirectToHome) return <Redirect to="/" />;
  return <Component {...props} />;
};

export default checkLogin;
