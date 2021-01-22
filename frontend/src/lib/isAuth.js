const isAuth = () => {
  return localStorage.getItem("token");
};

export default isAuth;
