import { FilePenLineIcon, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ctrlCategory } from "../../../api/category";
import { LoadingDots } from "../../ui/IsLoading";
import { MiniHeader } from "../../ui/MiniHeader";
import { toast } from "react-toastify";

const controllerTopics = new ctrlCategory();

export function ListTopics() {
  const [isLoading, setIsLoading] = useState(false);
  const [datos, setDatos] = useState([]);

  const navigate = useNavigate();

  const getTopics = async () => {
    try {
      setIsLoading(true);
      const resp = await controllerTopics.getCategories();
      // console.log(resp);
      setDatos(resp);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTopic = async (id) => {
    try {
      setIsLoading(true);
      const confirmate = confirm("Esta seguro de eliminar este discurso?");
      if (confirmate) {
        const resp = await controllerTopics.deleteCategory(id);
        // console.log(resp);
        if (resp?.status === 200) {
          toast.success(resp?.results?.comment);
          setTimeout(() => {
            navigate("/admin/topics");
          }, 200);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      getTopics();
    }
  };

  useEffect(() => {
    getTopics();
  }, []);

  if (isLoading) return <LoadingDots />;
  // console.log(datos);

  return (
    <>
      <div className="mx-auto max-w-6xl py-6">
        <h2 className="text-center font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Temas
        </h2>
        <p className="text-center text-xs font-semibold leading-7 text-primary-500">
          Temas para discursos
        </p>
      </div>

      <MiniHeader total={datos.total} text="Temas" />

      <div className=" overflow-x-auto pb-4">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden  border rounded-lg border-gray-300">
            {/* table */}
            <table className="table-auto min-w-full rounded-xl">
              <thead>
                <tr className="bg-gray-50">
                  <th
                    scope="col"
                    className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize min-w-[250px] md:min-w-[800px]"
                  >
                    Nombre Categoría
                  </th>
                  <th
                    scope="col"
                    className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300 ">
                {datos?.results?.length > 0 ?
                  datos?.results?.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white transition-all duration-500 hover:bg-gray-50"
                    >
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-400 ">
                        {item.name_category}
                      </td>
                      <td className="flex p-5 items-center gap-0.5 whitespace-nowrap text-sm leading-6 font-medium text-gray-400 me-4">
                        <Link
                          to={`/admin/topics/edit/${item.id_category}`}
                          className="p-2  rounded-full bg-white group transition-all duration-500 hover:bg-indigo-600 flex item-center"
                        >
                          <div className="text-indigo-500 group-hover:text-white">
                            <FilePenLineIcon />
                          </div>
                        </Link>
                        <button
                          className="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-red-600 flex item-center"
                          onClick={() => deleteTopic(item.id_category)}
                        >
                          <div className="text-red-600 hover:text-white">
                            <Trash2 />
                          </div>
                        </button>
                      </td>
                    </tr>
                  ))
                  : (
                    <tr>
                      <th colSpan="2">No hay datos que mostrar</th>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
