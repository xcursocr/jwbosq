import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export function WebHeader() {
  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md lg:max-w-screen-lg border  border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl ">
        <div className="px-4">
          <div className="flex items-center justify-between">
            <div className="flex shrink-0">
              <Link to={"/"} aria-current="page" className="flex items-center">
                {/* <img className="h-7 w-auto " src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="" /> */}
                <div className="text-[#6A64F1]">
                  {/* <Apple size={32} fill="#6A64F1" /> */}
                  <BookOpen size={32} fill="#6A64F1" />
                </div>
                <p className="sr-only">Bosquejos JW APP</p>
              </Link>
            </div>

            <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
              <Link aria-current="page"
                className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                to="#">
                Tutotrial
              </Link>
              <Link aria-current="page"
                className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                to="#">
                Derechos de autor
              </Link>
            </div>

            <div className="flex items-center justify-end gap-3">
              <Link className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
                to="/auth/register">Registro</Link>
              <Link className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                to="/auth/login">Entrar</Link>
            </div>
          </div>
        </div>


      </header>
      {/* mobile */}
      <header className="md:hidden fixed inset-x-0 top-14 z-30 bg-white border mx-auto w-full max-w-screen-xl  p-6 lg:max-w-screen-lg  shadow-md rounded-lg dark:bg-gray-700 dark:text-gray-300">
        <div className="w-full max-w-screen-xl px-10 mx-auto">
          <ul className="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium items-center">
            <li>
              <Link to="/auth/register" className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:text-gray-700 dark:md:hover:text-blue-700">
                Registro
              </Link>
            </li>
            <li>
              <Link to="/auth/login" className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:text-gray-700 dark:md:hover:text-blue-700">
                Login
              </Link>
            </li>

          </ul>
        </div>
      </header>
    </>
  );
}