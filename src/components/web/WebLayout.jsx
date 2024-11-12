import { Outlet } from "react-router-dom";
import { WebHeader } from "./WebHeader";

export function WebLayout() {
  return (
    <div>
      {/* common component header */}
      <WebHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
}