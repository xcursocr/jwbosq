import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ctrSketche } from "../../../api";
import { LoadingDots } from "../../ui/IsLoading";
import { FilePenLine, SquarePlus, Trash } from "lucide-react";
import { toast } from "react-toastify";

const controllerSketche = new ctrSketche();

export function Titles({ dataSketches, setDataSketches }) {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const deleteSketh = async (id) => {
    try {
      const confirmate = confirm("Esta seguro de eliminar este discurso?");
      if (confirmate) {
        // Eliminar optimísticamente: Quitamos el sketch de la lista antes de la petición
        setDataSketches((prevData) => ({
          ...prevData,
          results: prevData.results.filter((sketch) => sketch.id_sketch !== id),
        }));
        setIsLoading(true);
        const resp = await controllerSketche.deleteSketch(id);
        // console.log(resp);
        if (resp?.status === 200) {
          toast.success(resp?.results.comment);
          setIsLoading(false);
          // setTimeout(() => {
          //   navigate("/admin/bosquejos");
          // }, 500);
        } else {
          toast.error("Error al eliminar el bosquejo");
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(dataSketches);

  if (isLoading) return <LoadingDots />;

  return (
    <>
      <>
        <div className="max-w-screen-lg mx-auto p-10 dark:bg-gray-800">
          <div className=" border rounded-lg border-gray-300 p-2 text-center md:text-start flex justify-between items-center">
            <span className="text-gray-500 text-sm mx-4">
              Mostrando <span className="font-bold">{dataSketches?.total}</span>{" "}
              Discursos
            </span>
            <span className="text-gray-500 text-sm mx-4">
              <Link
                to={"/admin/bosquejos/nuevo"}
                className="flex gap-1 items-center justify-center text-indigo-700 hover:text-indigo-600"
              >
                <SquarePlus />
                Nuevo Bosquejo
              </Link>
            </span>
          </div>

          {/* List */}
          <ul className="bg-white dark:bg-gray-700 shadow-md rounded-md p-4 max-w-xxl mx-auto my-5">
            {/* Name Column */}
            <div className=" border-b rounded-lg border-gray-300 p-2 text-center md:text-start mt-3 flex justify-between items-center align-middle gap-3">
              <span className="text-gray-500 text-sm">Tema del discurso</span>
              <span className="text-gray-500 text-sm">Acciones</span>
            </div>

            {dataSketches?.results?.length > 0 ? (
              dataSketches?.results?.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-500 dark:text-gray-300 text-sm md:text-md my-5 flex justify-between items-center gap-3"
                >
                  <Link to={"#"} className="hover:text-blue-500">
                    <p className="">
                      <span className="text-sm ">
                        {item?.topic_sketche}
                        <span className="font-light text-xs">
                          {" "}
                          [{item?.cod_sketch}]
                        </span>
                      </span>
                    </p>
                  </Link>
                  <span className="flex justify-between gap-3">
                    <Link
                      to={`/admin/bosquejos/edit/${item.id_sketch}`}
                      className="hover:text-yellow-400"
                    >
                      <FilePenLine />
                    </Link>
                    <button
                      onClick={() => deleteSketh(item.id_sketch)}
                      className="hover:text-red-400"
                    >
                      <Trash />
                    </button>
                  </span>
                </li>
              ))
            ) : (
              <li className="text-gray-500 dark:text-gray-300 text-sm md:text-md my-5 flex justify-center items-center gap-3">
                No hay datos que mostrar
              </li>
            )}
          </ul>
        </div>
      </>
    </>
  );
}
