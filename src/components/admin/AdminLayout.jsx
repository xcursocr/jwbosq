import { Outlet } from "react-router-dom";
import { AdminHeader } from "./AdminHeader";

export function AdminLayout() {
  return (
    <>
      {/* admin header */}
      < AdminHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
}