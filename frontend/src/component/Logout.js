import { useEffect } from "react";
import { Redirect } from "react-router-dom";

const Logout = (props) => {
  useEffect(() => {
    localStorage.removeItem("token");
    props.setPopup({
      open: true,
      severity: "success",
      message: "Logged out successfully",
    });
  }, []);
  return <Redirect to="/login" />;
};

export default Logout;
