const isAuth = () => {
  return localStorage.getItem("token");
};

export const userType = () => {
  return localStorage.getItem("type");
};

export default isAuth;
