import { Navigate, useLocation } from "react-router-dom";

export function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // console.log(location.pathname, isAuthenticated);
  console.log(user[0]);

  if (location.pathname === "/") {
    if (!isAuthenticated) {
      // return <Navigate to="/auth/login" />;
      return <Navigate to="/" />;
    } else {
      if (user[0].role_speaker === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }
  }

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user[0].role_speaker === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  if (
    isAuthenticated &&
    user[0].role_speaker !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthenticated &&
    user[0].role_speaker === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}
