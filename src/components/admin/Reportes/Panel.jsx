import { Handshake, NotepadText, PersonStanding, User } from "lucide-react";
import { TitleHeader } from "../../ui/TitleHeader";
import { useEffect, useState } from "react";
import { ctrSpeakers } from "../../../api/speaker";
import { ctrSketche } from "../../../api/sketche";
import { ctrlAssignment } from "../../../api/assignments";
import { LoadingDots } from "../../ui/IsLoading";
import { Link } from "react-router-dom";
import { obtenerFechaActual } from "../../../helpers";
import { ctrlCongregation } from "../../../api";

// Controllers
const controllerSpeakers = new ctrSpeakers();
const controllerSketch = new ctrSketche();
const controllerAssign = new ctrlAssignment();
const controllerCongre = new ctrlCongregation();

export function Panel() {
  const [isLoading, setIsLoading] = useState(false);
  const [locales, setLocales] = useState(null);
  const [visitantes, setVisitantes] = useState(null);
  const [sketches, setSketches] = useState(null);
  const [assignations, setAssignations] = useState(null);
  const [dataCongregation, setDataCongregation] = useState(null);
  const [discursosRepetidos, setDiscursosRepetidos] = useState(null);
  const [ultimosCincoAssignaciones, setUltimosCincoAssignaciones] =
    useState(null);
  const [formData, setFormData] = useState({
    id_congregation_assignment: "",
  });

  // console.log(selectCongregation);

  // Capturar datos del select
  const selectChangeCongregation = async (e) => {
    setDiscursosRepetidos(null);
    const { name, value } = e.target;
    // Actualiza el estado del formulario
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    try {
      setIsLoading(true);
      const resp = await controllerAssign.getAssignationsSqlRepetidos(
        "2019-01-01",
        obtenerFechaActual(),
        e.target.value
      );
      // console.log(resp);
      const { status, results, total } = resp;
      setDiscursosRepetidos({ results, total });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const ultimosFiceAssignations = async () => {
    try {
      setIsLoading(true);
      const resp = await controllerAssign.getAssignationLastesFive();
      const { results } = resp;
      setUltimosCincoAssignaciones(results);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    setIsLoading(true); // Activamos el loading

    try {
      const [
        localsData,
        visitorsData,
        sketchesData,
        assignmentsData,
        congregationData,
      ] = await Promise.all([
        controllerSpeakers.getSpeakerByOrigen(0), // Datos locales
        controllerSpeakers.getSpeakerByOrigen(1), // Datos visitantes (por ejemplo, otro endpoint o parámetro)
        controllerSketch.getSketches(), // Datos de bosquejos
        controllerAssign.getCountAssignations(), // Datos de asignaciones
        controllerCongre.getCongregations(), // Datos de congregaciones
      ]);

      // Desestructuramos las respuestas de la API
      const {
        status: statusLocales,
        results: localesResults,
        total: localesTotal,
      } = localsData;
      const {
        status: statusVisitantes,
        results: visitantesResults,
        total: visitantesTotal,
      } = visitorsData;
      const {
        status: statusSketches,
        results: sketchesResults,
        total: sketchesTotal,
      } = sketchesData;
      const {
        status: statusAssignments,
        results: assignmentsResults,
        total: assignmentsTotal,
      } = assignmentsData;
      const {
        status: statusCongregation,
        results: congregationResults,
        total: congregationTotal,
      } = congregationData;

      if (statusLocales === 200) {
        setLocales({ results: localesResults, total: localesTotal });
      } else {
        setLocales({ results: [], total: 0 });
      }
      if (statusVisitantes === 200) {
        setVisitantes({ results: visitantesResults, total: visitantesTotal });
      } else {
        setVisitantes({ results: [], total: 0 });
      }
      if (statusSketches === 200) {
        setSketches({ results: sketchesResults, total: sketchesTotal });
      } else {
        setSketches({ results: [], total: 0 });
      }

      if (statusAssignments === 200) {
        setAssignations({
          results: assignmentsResults,
          total: assignmentsTotal,
        });
      } else {
        setAssignations({ results: [], total: 0 });
      }

      if (statusCongregation === 200) {
        setDataCongregation({
          results: congregationResults,
          total: congregationTotal,
        });
      } else {
        setDataCongregation({ results: [], total: 0 });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Desactivamos el loading
    }
  };

  useEffect(() => {
    fetchData(); // Llamamos a la función para obtener todos los datos al montar el componente
    ultimosFiceAssignations();
  }, []); // Se ejecuta solo una vez cuando el componente se monta

  if (isLoading) return <LoadingDots />;

  // console.log(assignations);
  // console.log(sketches);
  // console.log(dataCongregation);
  // console.log(discursosRepetidos);
  console.log(ultimosCincoAssignaciones);

  return (
    <>
      <TitleHeader
        titulo={"Reportes"}
        subTitulo={"Encuentra información más rápido"}
      />
      {/* paneles */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-8">
        {/* Oradores Locales */}
        <Link to={"/admin/speakers"}>
          <div className="hover:border-2 flex flex-col justify-center items-center gap-2 border border-dashed border-gray-500 p-4 rounded-md h-32">
            <div className="flex gap-2 items-center">
              <span className="font-bold text-4xl">{locales?.total}</span>
              <User />
            </div>
            <span className="font-semibold opacity-70 text-sm text-center">
              Oradores Locales
            </span>
          </div>
        </Link>

        {/* Bosquejos */}
        <Link to={"/admin/bosquejos"}>
          <div className="hover:border-2 flex flex-col justify-center items-center gap-2 border border-dashed border-gray-500 p-4 rounded-md h-32">
            <div className="flex gap-2 items-center">
              <span className="font-bold text-4xl">{sketches?.total}</span>
              <NotepadText />
            </div>
            <span className="font-semibold opacity-70 text-sm text-center">
              Bosquejos
            </span>
          </div>
        </Link>

        {/* Asignaciones */}
        <Link to={"/admin/asignaciones"}>
          <div className="hover:border-2 flex flex-col justify-center items-center gap-2 border border-dashed border-gray-500 p-4 rounded-md h-32">
            <div className="flex gap-2 items-center">
              <span className="font-bold text-4xl">{assignations?.total}</span>
              <Handshake />
            </div>
            <span className="font-semibold opacity-70 text-sm text-center">
              Asignaciones
            </span>
          </div>
        </Link>

        {/* Oradores Visitantes */}
        <Link to={"/admin/speakers"}>
          <div className="hover:border-2 md:col-start-2 lg:col-auto flex flex-col justify-center items-center gap-2 border border-dashed border-gray-500 p-4 rounded-md h-32">
            <div className="flex gap-2 items-center">
              <span className="font-bold text-4xl">{visitantes?.total}</span>
              <PersonStanding />
            </div>
            <span className="font-semibold opacity-70 text-sm text-center">
              Oradores Visitantes
            </span>
          </div>
        </Link>
      </div>

      {/* Numero de veces que se ha repetido un discurso */}
      <div className="grid grid-cols-1 gap-3 px-4 ">
        <header className="bg-gray-200 p-3 text-gray-500 md:flex md:justify-between gap-3">
          <h3>Desde 01-01-2019 - {obtenerFechaActual()} se ha repetido en:</h3>
          <select
            id="id_congregation_assignment"
            name="id_congregation_assignment"
            className="border border-gray-400 p-2 w-64 rounded-lg focus:outline-none focus:border-blue-400"
            value={formData.id_congregation_assignment}
            onChange={selectChangeCongregation}
          >
            <option value="">Seleccione</option>
            {dataCongregation?.results?.map((item, index) => (
              <option key={index} value={item.id_congregation}>
                {item.name_congregation}
              </option>
            ))}
          </select>
        </header>
        <div className="px-3">
          <ul>
            {discursosRepetidos?.results.map((item, index) => (
              <li
                key={index}
                className="text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between my-3"
              >
                <span className="flex items-center">
                  <span className="text-xs  text-blue-500 w-14">
                    {" "}
                    {item.codSketch}
                  </span>
                  <span className="text-xs"> {item.sketch_name} </span>
                </span>
                {discursosRepetidos != null && (
                  <span className="text-xs ms-12 md:text-end text-red-500 ">
                    {" "}
                    {discursosRepetidos?.results[index].times_assigned > 1
                      ? `Se ha presentado ${discursosRepetidos?.results[index].times_assigned} Veces`
                      : `Se ha presentado ${discursosRepetidos?.results[index].times_assigned} Vez`}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* ultimas 5 asignaciones pendientes */}
      <div className="grid grid-cols-1 gap-3 px-4 my-8">
        <header className="bg-gray-200 p-3 text-gray-500 text-center">
          Las ultimas Asignaciones pendientes:
        </header>
        <div className="px-3">
          <ul>
            {Array.isArray(ultimosCincoAssignaciones) &&
              ultimosCincoAssignaciones.length > 0 &&
              ultimosCincoAssignaciones?.map((item, index) => (
                <li key={index} className="border p-2 shadow-sm mb-5">
                  <span className="text-green-800 text-sm">Orador:</span>{" "}
                  <span className="text-xs text-gray-900">
                    {" "}
                    {item.nameSpeaker}
                  </span>{" "}
                  <p className="text-green-800 text-sm">
                    Congregación donde lo dará:{" "}
                  </p>
                  <span className="text-xs text-gray-900">
                    {item.name_congregation}{" "}
                  </span>
                  <p className="text-green-800 text-sm">Tema del discurso: </p>{" "}
                  <span className="text-xs text-gray-900">
                    {item.sketch_name}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
