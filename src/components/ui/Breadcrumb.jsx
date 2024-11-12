import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Breadcrumb = () => {
  const location = useLocation();

  // Divide la ruta en partes
  const pathnames = location.pathname.split('/').filter((x) => x);


  return (
    <div className="mx-auto w-full my-4 items-center md:flex justify-center">
      <ul className="gap-4 font-medium text-sm md:flex dark:text-white ">
        {pathnames.map((pathname, index) => {
          // Crea un enlace para cada parte de la ruta
          const route = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isActive = index === pathnames.length - 1; // Verifica si es la ruta activa

          return (
            <React.Fragment key={index}>
              <li>
                <Link to={route}
                  className={`dark:text-gray-300 ${isActive ? 'text-gray-500 dark:text-gray-400' : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'}`} // Clase para atenuar el enlace activo
                >
                  {pathname.charAt(0).toUpperCase() + pathname.slice(1)} {/* Capitaliza la primera letra */}
                </Link>
              </li>
              {index < pathnames.length - 1 && (
                <li className="h-6 border-r border-gray-300 -skew-x-12 dark:border-gray-500"></li>
              )}
            </React.Fragment>
          );
        })}

      </ul>

    </div>
  );
};

