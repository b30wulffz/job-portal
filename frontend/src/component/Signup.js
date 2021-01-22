import { useEffect } from "react";
import { Redirect } from "react-router-dom";

const Logout = (props) => {
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);
  return <Redirect to="/login" />;
};

export default Logout;
