import {
  Dot,
  FilePenLineIcon,
  MessageCircleReply,
  Repeat2,
  Trash2,
} from "lucide-react";
import { ctrlAssignment, ctrSketche, ctrlCongregation } from "../../../api";
import { useEffect, useState } from "react";
import { LoadingDots } from "../../ui/IsLoading";
import { Link } from "react-router-dom";
import { obtenerFechaActual } from "../../../helpers";

const ctrlAssgn = new ctrlAssignment();
const ctrlSketc = new ctrSketche();
const ctrlCongre = new ctrlCongregation();

export function ListAsignaciones() {
  const [isLoading, setIsLoading] = useState(false);
  const [errores, setErrores] = useState(false);
  const [dataAssignment, setDataAssignment] = useState([]);

  // console.log(dataAssignment);

  // const getAssignment = async () => {
  //   try {
  //     setIsLoading(true);
  //     const resp = await ctrlAssgn.getAssignations();

  //     const assignmentsWithSketches = await Promise.all(
  //       resp.results.map(async (assignment) => {
  //         // console.log(assignment);

  //         // Realiza las peticiones en paralelo
  //         const [respSket, respCongre, filterSketch] = await Promise.all([
  //           ctrlSketc.getSketcheOne(assignment.id_sketche_assignment),
  //           ctrlCongre.getCongregationOne(
  //             assignment.id_congregation_assignment
  //           ),
  //           // de un determinado rango de fecha filtramos cuantas veces se ha dado ese discurso en esa congregacion
  //           ctrlAssgn.filterByDate(
  //             "2024-01-01",
  //             // "2024-10-31",
  //             // "2025-12-31",
  //             obtenerFechaActual(),
  //             assignment.id_sketche_assignment,
  //             assignment.id_congregation_assignment
  //           ),
  //         ]);

  //         // console.log(filterSketch);

  //         return {
  //           ...assignment,
  //           sketches: respSket.results || [],
  //           congregation: respCongre.results || [],
  //           sketchCount: filterSketch.total || 0,
  //         };
  //       })
  //     );

  //     setDataAssignment(assignmentsWithSketches);
  //   } catch (error) {
  //     setErrores(true);
  //     console.error("Error al obtener los datos:", error);
  //   } finally {
  //     setIsLoading(false); // Asegúrate de que se llame al final
  //   }
  // };

  // CONSULTA CON SQL PERSONALIZADO RELACIONANDO TABLAS PARA NO HACER MUCHAS PETICIONES
  const getAssignment = async () => {
    try {
      setIsLoading(true);
      const resp = await ctrlAssgn.getAssignationsSql();
      // console.log(resp);

      const assignmentsWithSketches = await Promise.all(
        resp.results.map(async (assignment) => {
          // console.log(assignment);

          // Realiza las peticiones en paralelo
          const [filterSketch] = await Promise.all([
            // de un determinado rango de fecha filtramos cuantas veces se ha dado ese discurso en esa congregacion
            ctrlAssgn.filterByDate(
              "2024-01-01",
              // "2024-10-31",
              // "2025-12-31",
              obtenerFechaActual(),
              assignment.id_sketche_assignment,
              assignment.id_congregation_assignment
            ),
          ]);

          // console.log(filterSketch);

          return {
            ...assignment,
            sketchCount: filterSketch.total || 0,
          };
        })
      );

      setDataAssignment(assignmentsWithSketches);
    } catch (error) {
      setErrores(true);
      console.error("Error al obtener los datos:", error);
    } finally {
      setIsLoading(false); // Asegúrate de que se llame al final
    }
  };

  useEffect(() => {
    getAssignment();
  }, []);

  if (isLoading) return <LoadingDots />;

  // console.log(dataAssignment);

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
                  className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                >
                  {" "}
                  Fecha{" "}
                </th>
                <th
                  scope="col"
                  className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                >
                  {" "}
                  Nombre{" "}
                </th>
                <th
                  scope="col"
                  className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                >
                  {" "}
                  Telefono
                </th>
                <th
                  scope="col"
                  className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                >
                  {" "}
                  Congregacion
                </th>
                <th
                  scope="col"
                  className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                >
                  {" "}
                  #Bosquejo{" "}
                </th>
                <th
                  scope="col"
                  className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize min-w-[150px]"
                >
                  {" "}
                  Tema del discurso{" "}
                </th>

                <th
                  scope="col"
                  className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                >
                  {" "}
                  Prsentado entre: <br />
                  el 2019 - Hoy{" "}
                </th>

                <th
                  scope="col"
                  className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                >
                  {" "}
                  Message{" "}
                </th>

                <th
                  scope="col"
                  className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                >
                  {" "}
                  Actions{" "}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 ">
              {!errores ? (
                dataAssignment?.map((item, index) => (
                  <tr
                    className="bg-white transition-all duration-500 hover:bg-gray-50"
                    key={index}
                  >
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-400 ">
                      {" "}
                      {item.date_assignment}
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-400 ">
                      {" "}
                      {item.name_speaker}
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-400 ">
                      {" "}
                      {item.phone_speaker}
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-400 ">
                      {" "}
                      {/* {item.congregation[0].name_congregation} */}
                      {item.name_congregation}
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-400 ">
                      {" "}
                      {/* {item.sketches[0].num_sketch} */}
                      {item.num_sketch}
                    </td>
                    <td className=" px-5 py-3">
                      <div className="w-48 flex items-center gap-3">
                        <div className="data">
                          <p className="font-normal text-xs text-gray-400">
                            {/* {item.sketches[0].cod_sketch} */}
                            {item.cod_sketch}
                          </p>
                          <p className="font-normal text-sm leading-5 text-gray-500">
                            {" "}
                            {/* {item.sketches[0].topic_sketche} */}
                            {item.topic_sketche}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                      <div
                        className={`py-1.5 px-1.5 ${
                          item.sketchCount !== 0 ? "bg-red-500" : "bg-green-500"
                        } rounded-full flex justify-center w-20 items-center gap-1`}
                      >
                        <span className="font-medium text-xs text-white flex items-center gap-2">
                          <Repeat2 />{" "}
                          <span className="font-bold">{item.sketchCount}</span>
                        </span>
                      </div>
                    </td>

                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                      <div className="py-1.5 px-2.5 bg-emerald-50 rounded-full flex justify-center w-20 items-center gap-1">
                        <a
                          target="_blank"
                          href={`https://wa.me/+506${item.phone_speaker}?text=Saludos, mi hermano ${item.name_speaker}, le escribo de la congregación ${item.name_congregation} tengo el privilegio de comunicarme cada semana con el hermano que nos visitara para dar el discurso publico de esta semana. Mi hermano, usted esta asignado para darnos un discurso publico en nuestra congregación para la fecha: ${item.date_assignment}. El tema del discurso que tenemos en nuestro registro es: ${item.topic_sketche}. Si es asi mi hermano, nos gustaría que nos confirmara su visita. También hemos hechos arreglos para brindarle hospitalidad a usted y si es posible a sus acompañantes. Si hiciera aprovechamiento de este arreglo de hospitalidad, tenga la bondad de informarnos cuantos le acompañarían a esta ocasión donde tendremos la oportunidad de compartir con ustedes. Muchas gracias hermano`}
                        >
                          <span className="font-medium text-xs text-emerald-600 ">
                            <MessageCircleReply />
                          </span>
                        </a>
                      </div>
                    </td>

                    <td className="flex p-5 items-center gap-0.5">
                      <Link
                        to={`/admin/asignaciones/${item.id_assignment}`}
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
                ))
              ) : (
                <tr>
                  <th colSpan="7">No hay datos que mostrar</th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
