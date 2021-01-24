import { useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";

import { SetPopupContext } from "../App";

const Logout = (props) => {
  const setPopup = useContext(SetPopupContext);
  useEffect(() => {
    localStorage.removeItem("token");
    setPopup({
      open: true,
      severity: "success",
      message: "Logged out successfully",
    });
  }, []);
  return <Redirect to="/login" />;
};

export default Logout;
