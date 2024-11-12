import { Link } from "react-router-dom";
import { ListAsignaciones } from "../../../components/admin/Asignaciones/List";
import { ctrlAssignment } from "../../../api";
import { useEffect, useState } from "react";
import { ListCheck } from "lucide-react";

const controllerAssign = new ctrlAssignment()

export function Asignaciones() {

  const [totalAssign, setTotalAssign] = useState(0)

  const countAssign = async () => {
    const resp = await controllerAssign.getCountAssignations()
    setTotalAssign(resp.total);
  }

  useEffect(() => {
    countAssign()
  }, []);


  return (
    <div>
      <div className="mx-auto max-w-6xl py-6">
        <h2 className="text-center font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Asignaciones
        </h2>
        <p className="text-center text-xs font-semibold leading-7 text-primary-500">
          Programa de discursos
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between w-full">
        <div className="text-base flex gap-3 justify-center text-center my-6 w-full  text-indigo-900 font-light ">
          <ListCheck />
          <div className="text-base text-indigo-700 font-medium">
            {totalAssign} Asignaciones
          </div>
        </div>
        <div className="text-base flex gap-3 justify-center text-center w-full my-4">
          <Link
            to={"/admin/asignaciones/nuevo"}
            className="md:w-64 border text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 px-4 py-2"
          >
            Asignar Discurso
          </Link>
        </div>
      </div>

      <ListAsignaciones />
    </div>
  );
}
