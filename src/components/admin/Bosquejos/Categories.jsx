import { SquarePlus } from "lucide-react";
import { Link } from "react-router-dom";
import { ctrlCategory, ctrSketche } from "../../../api";
import { useEffect, useState } from "react";
import { LoadingDots } from "../../ui/IsLoading";

const controllerCategory = new ctrlCategory();
const controllerSketche = new ctrSketche();

export function Categories({ dataSketches }) {
  const [isLoading, setIsLoading] = useState(false);
  const [dataSketche, setDataSketche] = useState([]);
  const [totalCategories, setTotalCategories] = useState(null);

  const getCategories = async () => {
    try {
      setIsLoading(true);
      const resp = await controllerCategory.getCategories();
      setTotalCategories(resp.total);
      // console.log(resp);

      const joinFectch = await Promise.all(
        resp.results.map(async (item) => {
          // console.log(item);

          // Realiza las peticiones en paralelo
          const [Sketches] = await Promise.all([
            // de un determinado rango de fecha filtramos cuantas veces se ha dado ese discurso en esa congregacion
            controllerSketche.getSketchesByCategory(item.id_category),
          ]);

          // console.log(filterSketch);

          return {
            ...item,
            _sketches: Sketches,
          };
        })
      );

      // console.log(joinFectch);
      setDataSketche(joinFectch);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      setIsLoading(false); // Asegúrate de que se llame al final
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // console.log(dataSketche);
  if (isLoading) return <LoadingDots />;

  return (
    <>
      <div className="max-w-screen-lg mx-auto p-10 dark:bg-gray-800">
        <div className=" border rounded-lg border-gray-300 p-2 text-center md:text-start flex justify-between items-center">
          <span className="text-gray-500 text-sm mx-4">
            Mostrando <span className="font-bold">{totalCategories}</span>{" "}
            Categorías
          </span>
          <span className="text-gray-500 text-sm mx-4">
            <Link
              to={"/admin/topics/nuevo"}
              className="flex gap-1 items-center justify-center  text-indigo-700 hover:text-indigo-600"
            >
              <SquarePlus />
              Nuevo tema
            </Link>
          </span>
        </div>

        <ul className="basis-1/2 bg-white dark:bg-gray-700 shadow-md rounded-md p-4 max-w-xxl mx-auto my-5">
          {dataSketche?.map((item, index) => (
            <li key={index} className="group">
              <button
                className="relative  flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-b  md:text-lg border-base-content/10"
                aria-expanded="false"
              >
                <span className="flex-1 text-base-content">
                  {item.name_category}
                </span>
                <svg
                  className="flex-shrink-0 w-4 h-4  ml-auto fill-current"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    y="7"
                    width="16"
                    height="2"
                    rx="1"
                    className="transform origin-center transition duration-200 ease-out false"
                  ></rect>
                  <rect
                    y="7"
                    width="16"
                    height="2"
                    rx="1"
                    className="block group-hover:opacity-0 origin-center rotate-90 transition duration-200 ease-out false"
                  ></rect>
                </svg>
              </button>
              <div
                className="transition-all duration-300 ease-in-out group-hover:max-h-60 max-h-0 overflow-hidden"
                style={{ transition: "max-height 0.3s ease-in-out 0s" }}
              >
                <div className=" leading-relaxed">
                  {item._sketches?.results?.length > 0 ? (
                    item?._sketches?.results.map((sk, i) => (
                      <div
                        key={i}
                        className="my-3 leading-relaxed text-gray-500"
                      >
                        {sk.topic_sketche}
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500">
                      No hay sketches disponibles
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
