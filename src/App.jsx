import { Route, Routes } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthLayout } from "./components/auth/AuthLayout";
import { AdminLayout } from "./components/admin/AdminLayout";
import { ShoppingLayout } from "./components/shop/ShoppingLayout";
import { WebLayout } from "./components/web/WebLayout";

import { AuthLogin } from "./pages/auth/AuthLogin";
import { AuthRegister } from "./pages/auth/AuthRegister";

import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { Locales } from "./pages/admin/Locales";
import { DetailLocales } from "./pages/admin/Locales/DetailLocales";
import { Bosquejos } from "./pages/admin/Bosquejos";
import { Visitantes } from "./pages/admin/Visitantes";
import { Asignaciones } from "./pages/admin/Asignaciones";
import { Reportes } from "./pages/admin/Reportes";

import { ShoppingHome } from "./pages/shop/ShoppingHome";

import { Home } from "./pages/web/Home";
import { Contact } from "./pages/web/Contact";

import { CheckAuth } from "./components/common/CheckAuth";
import { NotFound } from "./pages/not-found";
import { NotAuth } from "./pages/not-auth";
import { NuevaAsignacion } from "./components/admin/Asignaciones/New";
import { EditAsignaciones } from "./components/admin/Asignaciones/Edit";
import { NewBosquejo } from "./components/admin/Bosquejos/New";
import { EditSketch } from "./components/admin/Bosquejos/Edit";
import { TopicsSketchs } from "./pages/admin/Topics";
import { NewTopic } from "./components/admin/Topics/New";
import { EditTopic } from "./components/admin/Topics/Edit";
import { Speakers } from "./pages/admin/Speakers";
import { NewSpeakers } from "./components/admin/Speakers/New";
import { EditSpeaker } from "./components/admin/Speakers/Edit";
import { Congregations } from "./pages/admin/Congregation";
import { NewCongregation } from "./components/admin/Congregations/New";
import { EditCongregation } from "./components/admin/Congregations/Edit";
import { useAuth } from "./hooks";

function App() {
  // console.log(useAuth());
  const { isAutenticado, usuario } = useAuth();
  // console.log(usuario);

  // test not Autenticate
  /*
    const isAuthenticated = false
    const user = null

    const isAuthenticated = true
  const user = [{
    name_admin: "Administrador",
    rol_admin: "admin",
    rol_admin: "user",
  }]
  */

  const isAuthenticated = isAutenticado;
  const user = [usuario];
  // console.log(user);

  return (
    <div className=" md:mt-32 mt-96">
      {/* alert */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

      {/* alert */}

      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* rutas autenticado */}

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="bosquejos" element={<Bosquejos />} />
          <Route path="bosquejos/nuevo" element={<NewBosquejo />} />
          <Route path="bosquejos/edit/:id" element={<EditSketch />} />
          <Route path="locales" element={<Locales />} />
          <Route path="locales/:id" element={<DetailLocales />} />
          <Route path="visitantes" element={<Visitantes />} />
          <Route path="asignaciones" element={<Asignaciones />} />
          <Route path="asignaciones/nuevo" element={<NuevaAsignacion />} />
          <Route path="asignaciones/:id" element={<EditAsignaciones />} />
          <Route path="topics" element={<TopicsSketchs />} />
          <Route path="topics/nuevo" element={<NewTopic />} />
          <Route path="topics/edit/:id" element={<EditTopic />} />
          <Route path="speakers" element={<Speakers />} />
          <Route path="speakers/nuevo" element={<NewSpeakers />} />
          <Route path="speakers/edit/:speakerId" element={<EditSpeaker />} />
          <Route path="congregaciones" element={<Congregations />} />
          <Route path="congregaciones/nuevo" element={<NewCongregation />} />
          <Route
            path="congregaciones/edit/:congregationId"
            element={<EditCongregation />}
          />
          <Route path="reportes" element={<Reportes />} />
        </Route>

        {/* rutas publicas con authenticacion*/}

        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          {/* <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} /> */}
        </Route>
        {/* rutas publicas sin authenticacion*/}
        <Route
          path="/"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <WebLayout />
            </CheckAuth>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          {/* <Route path="bosquejos" element={<Bosquejos />} /> */}
        </Route>

        <Route path="*" element={<NotFound />} />

        <Route path="/unauth-page" element={<NotAuth />} />
      </Routes>
    </div>
  );
}

export default App;
