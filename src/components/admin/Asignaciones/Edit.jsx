import { useEffect, useState } from "react";
import {
  ctrlCongregation,
  ctrSpeakers,
  ctrSketche,
  ctrlAssignment,
} from "../../../api";
import { obtenerFechaActual, validateFields } from "../../../helpers";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "../../ui/Alert";
import { LoadingDots } from "../../ui/IsLoading";
import { validationRulesEdit } from "../../../schema/forms";
import { Undo2 } from "lucide-react";

const ctrlCong = new ctrlCongregation();
const ctrlSpeak = new ctrSpeakers();
const ctrlSketc = new ctrSketche();
const ctrlAssgn = new ctrlAssignment();

export function EditAsignaciones() {
  const [isLoading, setIsLoading] = useState(false);
  const [divErrores, setDivErrores] = useState({});
  const [selectCongregations, setSelectCongregations] = useState([]);
  const [selectSpeaker, setSelectSpeaker] = useState([]);
  const [selectSketche, setSelectSketche] = useState([]);
  const [alertMessage, setAlertMessage] = useState([]);
  const [typeAlert, setTypeAlert] = useState("");
  const [alerMsgSpeaker, setAlerMsgSpeaker] = useState("");
  const [typeAlertSpeaker, setTypeAlertSpeaker] = useState("");
  const [dataParams, setDataParams] = useState(null);

  // 1. Estado para almacenar el valor de los select
  const [valorSeleccionado, setValorSeleccionado] = useState("");
  const [valorSegundoSelect, setValorSegundoSelect] = useState("");
  const [valorTerceroSelect, setValorTerceroSelect] = useState("");

  // estados para guardar asignaciones
  const navigate = useNavigate();
  const { id } = useParams();

  const handleGoBack = () => {
    navigate(-1); // Vuelve a la página anterior
  };

  const getAssignmet = async () => {
    try {
      setIsLoading(true);
      const resp = await ctrlAssgn.getAssignationOne(id);
      setIsLoading(false);
      // console.log(resp);
      setDataParams(resp.results[0]);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  // propiedades de campo
  const [formInputs, setFormInputs] = useState({
    id_speaker_assignment: "",
    id_congregation_assignment: "",
    id_sketche_assignment: "",
    date_assignment: "",
    date_created_assignment: obtenerFechaActual(),
  });

  const getCongregations = async () => {
    try {
      setIsLoading(true);
      const resp = await ctrlCong.getCongregations();
      setSelectCongregations(resp.results);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const getSpeakers = async () => {
    try {
      setIsLoading(true);
      const resp = await ctrlSpeak.getSpeakers();
      setSelectSpeaker(resp.results);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const getSketches = async () => {
    try {
      setIsLoading(true);
      const resp = await ctrlSketc.getSketches();
      setSelectSketche(resp.results);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  // Capturar datos del formulario
  const handleOnChange = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setFormInputs((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const selectChangeSegundoSelect = (evento) => {
    const { name, value } = evento.target;
    setValorSegundoSelect(value);

    // Actualiza el estado del formulario
    setFormInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const selectChangeSketche = (evento) => {
    const { name, value } = evento.target;
    setValorSeleccionado(value);

    // Actualiza el estado del formulario
    setFormInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const selectChangeSpeaker = (evento) => {
    const { name, value } = evento.target;
    setValorTerceroSelect(value);

    // Actualiza el estado del formulario
    setFormInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Guardar en BD y redireccionar a la tabla
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formInputs);
    // Validar
    const validationErrors = validateFields(formInputs, validationRulesEdit);

    if (Object.keys(validationErrors).length > 0) {
      setDivErrores(validationErrors); // Actualiza el estado de errores
      return; // Detiene el envío si hay errores
    }

    setDivErrores({}); // Limpia errores si todo es válido
    setIsLoading(true);
    try {
      const resp = await ctrlAssgn.updateAssignment(id, formInputs);
      // console.log(resp);
      if (resp?.status === 200) {
        toast.success(resp?.results);
        setIsLoading(false);
        navigate("/admin/asignaciones");
      }
    } catch (error) {
      console.log(error);
      if (error.status === 400) toast.error(error.results);
    }
  };

  useEffect(() => {
    getCongregations(), getSpeakers(), getSketches();
    getAssignmet();
  }, [id]);

  useEffect(() => {
    if (dataParams) {
      // Actualiza formInputs cuando dataParams cambie
      setFormInputs({
        id_speaker_assignment: dataParams.id_speaker_assignment || "",
        id_congregation_assignment: dataParams.id_congregation_assignment || "",
        id_sketche_assignment: dataParams.id_sketche_assignment || "",
        date_assignment: dataParams.date_assignment || "",
        date_created_assignment: obtenerFechaActual(),
      });

      // Actualiza los valores de los selects para que muestren los valores correctos
      setValorSeleccionado(dataParams.id_sketche_assignment || ""); // Actualiza el estado del sketch
      setValorSegundoSelect(dataParams.id_congregation_assignment || ""); // Actualiza el estado de la congregación
      setValorTerceroSelect(dataParams.id_speaker_assignment || ""); // Actualiza el estado del speaker
    }
    // console.log(dataParams?.id_sketche_assignment);
  }, [dataParams]); // Este efecto se ejecuta cada vez que dataParams cambia

  // verificar si el el discurso ya se dio en la congregacion que elegida cuando cambia el valor del select tanto de la congre como del discurso
  const VerifySketchByCongregation = async () => {
    if (valorSeleccionado && valorSegundoSelect) {
      try {
        setIsLoading(true);
        const resp = await ctrlAssgn.filterByDate(
          "2024-01-01",
          obtenerFechaActual(),
          valorSeleccionado,
          valorSegundoSelect
        );

        // console.log(resp);

        if (resp !== 0) {
          let _message = "";
          if (resp?.total > 1) {
            _message = `${resp.total} Veces se ha presentado este discurso entre 2019 y 2024 en esta congregación`;
            setTypeAlert("bg-red-700");
          } else {
            setTypeAlert("bg-red-600");
            _message = `${resp.total} Vez se ha presentado este discurso entre 2019 y 2024 en esta congregación`;
          }
          setAlertMessage(_message);
        } else {
          setTypeAlert("bg-green-700");
          setAlertMessage(
            "Excelente, NO se ha presentado este discurso entre 2019 y 2024 en esta congregación"
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // verificar si el discursante tiene permiso de salida cada vez que cambia el valor del select
  const VerifySpeakerPermiso = async () => {
    if (valorTerceroSelect) {
      try {
        // console.log(valorSelectSpeaker);
        setIsLoading(true);
        const resp = await ctrlSpeak.getSpeakerOne(valorTerceroSelect);
        // console.log(resp);
        if (resp.status === 200) {
          if (resp.results[0].active_speaker === 0) {
            setAlerMsgSpeaker(`Este discursante NO tiene permiso de salida`);
            setTypeAlertSpeaker("bg-red-700");
          } else {
            setAlerMsgSpeaker(`Este discursante SI tiene permiso de salida`);
            setTypeAlertSpeaker("bg-green-700");
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        getSpeakers();
      }
    }
  };

  useEffect(() => {
    if (valorSeleccionado && valorSegundoSelect) {
      VerifySketchByCongregation();
    }
  }, [valorSeleccionado, valorSegundoSelect]); // Ejecutar cuando cualquiera de los valores cambia

  useEffect(() => {
    if (valorTerceroSelect) {
      VerifySpeakerPermiso();
    }
  }, [valorTerceroSelect]); // Ejecutar cuando cualquiera de los valores cambia

  // console.log(formInputs);

  if (isLoading) return <LoadingDots />;

  return (
    <>
      {/* Volver atrás */}
      <div className=" w-full flex items-center align-middle justify-center  text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 py-5">
        <Undo2 />
        <button
          onClick={handleGoBack}
          className="float-end  dark:border-gray-500"
        >
          Volver
        </button>
      </div>
      {/* end Volver atras */}

      <div className="flex items-center justify-center p-12 ">
        <div className="mx-auto w-full max-w-[550px] bg-white p-5">
          {/* Alerta, validaciones del formulario */}
          {Object.values(divErrores).map((error, index) => (
            <Alert key={index} errores={error} />
          ))}
          {/*Alerta, validaciones del formulario */}

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="date_assignment"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Fecha asignada del discurso
              </label>
              <input
                type="date"
                name="date_assignment"
                id="date_assignment"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formInputs.date_assignment}
                onChange={handleOnChange}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="id_congregation_assignment"
                className="block text-gray-700 font-medium mb-2"
              >
                Congregacion en la que presentara el discurso
              </label>

              <select
                id="id_congregation_assignment"
                name="id_congregation_assignment"
                className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                value={formInputs.id_congregation_assignment}
                onChange={selectChangeSegundoSelect}
              >
                <option value="">Seleccione</option>
                {selectCongregations?.map((item, index) =>
                  isLoading ? (
                    "Cargando"
                  ) : (
                    <option key={index} value={item.id_congregation}>
                      {item.name_congregation}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="mb-5">
              <label
                htmlFor="id_speaker_assignment"
                className="block text-gray-700 font-medium mb-2"
              >
                Discursante
              </label>
              <select
                id="id_speaker_assignment"
                name="id_speaker_assignment"
                className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                // value={valorSelectSpeaker}
                value={formInputs.id_speaker_assignment}
                onChange={selectChangeSpeaker}
              >
                <option value="">Seleccione</option>
                {selectSpeaker?.map((item, index) =>
                  isLoading ? (
                    "Cargando"
                  ) : (
                    <option key={index} value={item.id_speaker}>
                      {item.name_speaker}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* alerta si al escoger el bosquejo que revise si ya se dio ese discurso en 2 a;os atras o en un ano atras */}
            <div
              className={
                alerMsgSpeaker.length &&
                " w-full mx-auto bg-white py-12" + "hidden"
              }
            >
              {alerMsgSpeaker.length ? (
                <div
                  className={`mb-5 flex items-center justify-between p-5 leading-normal   rounded-lg ${typeAlertSpeaker}`}
                  role="alert"
                >
                  <p className="text-sm text-white">
                    <span className="text-md font-bold">{alerMsgSpeaker}</span>
                    !!!
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>

            {/* alerta si ya se dio ese discurso en 2 a;os atras o en un ano atras */}

            <div className="mb-5">
              <label
                htmlFor="id_sketche_assignment"
                className="block text-gray-700 font-medium mb-2"
              >
                Tema del discurso que presentara
              </label>
              <select
                id="id_sketche_assignment"
                name="id_sketche_assignment"
                className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                value={formInputs.id_sketche_assignment}
                onChange={selectChangeSketche}
              >
                <option value="">Seleccione</option>
                {selectSketche?.map((item, index) =>
                  isLoading ? (
                    "Cargando"
                  ) : (
                    <option key={index} value={item.id_sketch}>
                      {`${item.cod_sketch} - ${item.topic_sketche}`}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* alerta si al escoger el bosquejo que revise si ya se dio ese discurso en 2 a;os atras o en un ano atras */}
            <div
              className={
                alertMessage.length && " w-full mx-auto bg-white py-12" + "hidden"
              }
            >
              {alertMessage.length ? (
                <div
                  className={`mb-5 flex items-center justify-between p-5 leading-normal   rounded-lg ${typeAlert}`}
                  role="alert"
                >
                  <p className="text-sm text-white">
                    <span className="text-md font-bold">{alertMessage}</span>
                    !!!
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>

            {/* alerta si ya se dio ese discurso en 2 a;os atras o en un ano atras */}

            <div>
              <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                {isLoading ? "Cargando" : "Asignar discurso"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
