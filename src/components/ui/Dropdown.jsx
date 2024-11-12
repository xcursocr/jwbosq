import { useEffect, useRef, useState } from "react";

export function DropdownUi({ title, options }) {
  // Estado para manejar la visibilidad del dropdown
  const [isOpen, setIsOpen] = useState(false);

  // Función para manejar el click en el botón del dropdown
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Referencia al dropdown
  const dropdownRef = useRef(null);

  // Función para manejar clics fuera del dropdown
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // useEffect para agregar el listener de clics fuera del dropdown
  useEffect(() => {
    // Agregar el evento de clic fuera
    document.addEventListener("mousedown", handleClickOutside);

    // Limpiar el evento al desmontar el componente
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="inline-block relative " ref={dropdownRef}>
      {/* Botón para abrir o cerrar el dropdown */}
      <button
        onClick={toggleDropdown}
        className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 font-semibold py-2 px-4 rounded inline-flex items-center "
      >
        <span className="mr-1">{title}</span>
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <ul className=" block absolute  text-gray-700 dark:text-gray-300 pt-1 max-w-screen-lg">
          {options?.map((item, index) => (
            <li key={index}>
              <a
                className="rounded-t bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 py-2 px-4 block whitespace-no-wrap"
                href={item.url}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
