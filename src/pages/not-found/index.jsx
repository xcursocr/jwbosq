import { Undo2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";


export function NotFound() {

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // Vuelve a la página anterior
  };

  return (
    <section className="flex items-center h-screen p-16 bg-gray-50 dark:bg-gray-700">
      <div className="container flex flex-col items-center ">
        <div className="flex flex-col gap-6 max-w-md text-center">
          <h2 className="font-extrabold text-9xl text-gray-600 dark:text-gray-100">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl md:text-3xl dark:text-gray-300">Lo siento esta pagina no existe.</p>
          {/* <Link to="/" className="px-8 py-4 text-xl font-semibold rounded bg-purple-600 text-gray-50 hover:text-gray-200">Regresar</Link> */}
          {/* Volver atrás */}
          <button
            onClick={handleGoBack}
            className="px-8 py-4 text-xl font-semibold rounded bg-purple-600 text-gray-50 hover:text-gray-200 flex gap-2 items-center justify-center"
          >
            <Undo2 />
            <span>Regresar</span>
          </button>
        </div>
        {/* end Volver atras */}
      </div>
    </section>
  );
}