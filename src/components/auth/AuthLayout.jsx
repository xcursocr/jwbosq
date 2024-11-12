import { Outlet } from "react-router-dom";
import { AuthHeader } from "./AuthHeader";

export function AuthLayout() {
  return (
    < >
      <AuthHeader />
      <div >
        <Outlet />
      </div>
    </>
  );
}