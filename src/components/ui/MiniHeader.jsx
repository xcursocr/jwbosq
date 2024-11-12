import { Link } from "react-router-dom";
import { SquarePlus } from "lucide-react";

export function MiniHeader({
  total = 0, // Número de elementos a mostrar (default a 0)
  text = "Discursos", // Texto que se muestra después de "Mostrando"
  linkText = "Nuevo tema", // Texto del enlace
  linkTo = "/admin/topics/nuevo", // URL de destino para el enlace
  Icon = SquarePlus, // Ícono que se muestra en el enlace
}) {
  return (
    <div className="border rounded-lg border-gray-300 p-2 text-center md:text-start flex justify-between items-center my-3">
      {/* Mostrando {total} Discursos */}
      <span className="text-gray-500 text-sm mx-4">
        Mostrando <span className="font-bold">{total}</span> {text}
      </span>

      {/* Enlace a la página de "Nuevo tema" */}
      <span className="text-gray-500 text-sm mx-4">
        <Link
          to={linkTo}
          className="flex gap-1 items-center justify-center text-indigo-700 hover:text-indigo-600"
        >
          <Icon />
          {linkText}
        </Link>
      </span>
    </div>
  );
}
