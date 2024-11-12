import { FilePenLineIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function ListTopics() {
  const [isLoading, setIsLoading] = useState(false);
  const [isErrors, setIsErrors] = useState([]);

  return (
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
              <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-400 ">
                  dff
                </td>
                <td className="flex p-5 items-center gap-0.5 whitespace-nowrap text-sm leading-6 font-medium text-gray-400 me-4">
                  <Link
                    to={`/admin/asignaciones/`}
                    className="p-2  rounded-full bg-white group transition-all duration-500 hover:bg-indigo-600 flex item-center"
                  >
                    <div className="text-indigo-500 group-hover:text-white">
                      <FilePenLineIcon />
                    </div>
                  </Link>
                  <button className="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-red-600 flex item-center">
                    <div className="text-red-600 hover:text-white">
                      <Trash2 />
                    </div>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
