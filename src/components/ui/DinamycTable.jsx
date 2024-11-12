import React from "react";
import { Link } from "react-router-dom";
import { Trash2, FilePenLine } from "lucide-react";

export const DynamicTable = ({
  columns,
  data,
  actions,
  emptyMessage = "No hay datos que mostrar",
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto min-w-full rounded-xl">
        <thead>
          <tr className="bg-gray-50">
            {columns.map((col, index) => (
              <th
                key={index}
                scope="col"
                className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
              >
                {col.header}
              </th>
            ))}
            {/* Columna de acciones, si es necesario */}
            {actions && (
              <th
                scope="col"
                className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
              >
                Acciones
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {data?.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={index}
                className="bg-white transition-all duration-500 hover:bg-gray-50"
              >
                {columns.map((col, idx) => (
                  <td
                    key={idx}
                    className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-400"
                  >
                    {col.render
                      ? col.render(item[col.accessor])
                      : item[col.accessor]}
                  </td>
                ))}
                {/* Acciones */}
                {actions && (
                  <td className="flex p-5 items-center gap-0.5">
                    <Link
                      to={actions.editUrl(item)}
                      className="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-indigo-600 flex items-center"
                    >
                      <div className="text-indigo-500 group-hover:text-white">
                        <FilePenLine />
                      </div>
                    </Link>
                    <button
                      onClick={() => actions.delete(item)}
                      className="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-red-600 flex items-center"
                    >
                      <div className="text-red-600 hover:text-white">
                        <Trash2 />
                      </div>
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="text-center py-5"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

/**
 * EJEMPLO DE USO
 
import React, { useState, useEffect } from "react";
import { ctrAssignment } from "../../../api"; // Aquí importamos la API para obtener los datos de asignaciones
import { toast } from "react-toastify";
import DynamicTable from "../../ui/DynamicTable";

const controllerAssignment = new ctrAssignment();

export function Assignments() {
  const [dataAssignments, setDataAssignments] = useState([]);
  const [errores, setErrores] = useState(false);

  const getAssignments = async () => {
    try {
      const resp = await controllerAssignment.getAssignments();
      setDataAssignments(resp?.results || []);
      setErrores(false);
    } catch (error) {
      setErrores(true);
      console.error(error);
    }
  };

  useEffect(() => {
    getAssignments();
  }, []);

  // Definir las columnas de la tabla dinámicamente
  const columns = [
    { header: "Fecha", accessor: "date_assignment" },
    { header: "Nombre", accessor: "name_speaker" },
    { header: "Telefono", accessor: "phone_speaker" },
    { header: "Congregación", accessor: "name_congregation" },
    { header: "#Bosquejo", accessor: "num_sketch" },
    {
      header: "Tema del discurso",
      accessor: "topic_sketche",
      render: (item) => (
        <div>
          <p className="font-normal text-xs text-gray-400">{item.cod_sketch}</p>
          <p className="font-normal text-sm text-gray-500">{item.topic_sketche}</p>
        </div>
      ),
    },
    {
      header: "Presentado entre: el 2019 - Hoy",
      accessor: "sketchCount",
      render: (item) => (
        <div className={`py-1.5 px-1.5 ${item.sketchCount !== 0 ? "bg-red-500" : "bg-green-500"} rounded-full flex justify-center w-20 items-center gap-1`}>
          <span className="font-medium text-xs text-white flex items-center gap-2">
            <span className="font-bold">{item.sketchCount}</span>
          </span>
        </div>
      ),
    },
  ];

  // Definir las acciones (editar, eliminar)
  const actions = {
    editUrl: (item) => `/admin/asignaciones/${item.id_assignment}`,
    delete: (item) => {
      const confirmDelete = window.confirm("¿Estás seguro de eliminar esta asignación?");
      if (confirmDelete) {
        // Llamar a la API para eliminar el item
        controllerAssignment.deleteAssignment(item.id_assignment)
          .then(() => {
            toast.success("Asignación eliminada exitosamente");
            // Actualizar los datos después de la eliminación
            setDataAssignments(prev => prev.filter(a => a.id_assignment !== item.id_assignment));
          })
          .catch(error => toast.error("Hubo un error al eliminar la asignación"));
      }
    },
  };

  return (
    <div className="max-w-screen-md mx-auto p-10 dark:bg-gray-800">
      <DynamicTable columns={columns} data={dataAssignments} actions={actions} />
    </div>
  );
}
*/

/**
 *
 * OTRO EJEMPLO DE USO
 */

/**
 * 
 * import { useState } from "react";
import { MiniHeader } from "../../ui/MiniHeader";
import { DynamicTable } from "../../ui/Table";

export function Locales() {

  const [data, setData] = useState([{ name_speaker: "Luis" }])

  const columns = [
    { header: "Nombre", accessor: "name_speaker" },
    { header: "Telefono", accessor: "phone_speaker" },
    { header: "Tipo", accessor: "type_speaker" },
    { header: "Correo", accessor: "email_speaker" },
  ];

  // Definir las acciones (editar, eliminar)
  const actions = {
    editUrl: (item) => 1,//`/admin/asignaciones/${item.id_assignment}`,
    delete: (item) => 2 // `ontrollerAssignment.deleteAssignment(item.id_assignment)`
  };

  return (
    <div className="max-w-screen-md mx-auto p-10 dark:bg-gray-800">
      <MiniHeader />
      <DynamicTable columns={columns} data={data} actions={actions} />
    </div>
  );
 */
