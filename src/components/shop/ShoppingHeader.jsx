import { Link } from "react-router-dom";

export function ShoppingHeader() {
  return (
    <div>
      <h1>ShoppingHeader</h1>
      <Link to={'/'}>Home</Link><span>  </span>
      <Link to={'/contact'}>Contact</Link><span>  </span>
      <Link to={'/auth/register'}>Register</Link><span>  </span>
      <Link to={'/auth/login'}>Login</Link><span>  </span>
      <Link to={'/shop/home'}>Shop</Link><span>  </span>
      <Link to={'/admin/dashboard'}>Dashboard</Link><span>  </span>
    </div>
  );
}