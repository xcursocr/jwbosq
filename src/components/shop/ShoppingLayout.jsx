import { Outlet } from "react-router-dom";
import { ShoppingHeader } from "./ShoppingHeader";

export function ShoppingLayout() {
  return (
    <div >
      {/* common component header */}
      <ShoppingHeader />
      <main >
        <Outlet />
      </main>
    </div>
  );
}