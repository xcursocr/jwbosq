import { useState, useEffect } from "react";
import { DynamicForm } from "../../ui/DinamycForm";
import { Breadcrumb } from "../../ui/Breadcrumb";
import { toast } from "react-toastify";
import { ctrSpeakers } from "../../../api/speaker";
import { useNavigate, useParams } from "react-router-dom";

const controllerSpeaker = new ctrSpeakers();

export function EditSpeaker() {
  const [isLoading, setIsLoading] = useState(false);
  const [speakerData, setSpeakerData] = useState(null);
  const { speakerId } = useParams(); // Obtener el ID del orador de la URL (si estamos editando)
  const navigate = useNavigate();

  useEffect(() => {
    if (speakerId) {
      // Si tenemos un ID de orador, obtenemos los datos del orador
      const fetchSpeakerData = async () => {
        try {
          const data = await controllerSpeaker.getSpeakerOne(speakerId);
          // console.log(data);
          const { status, results, total } = data;
          // console.log(results[0]);
          setSpeakerData(results[0]); // Establecemos los datos del orador para editar
        } catch (error) {
          console.error("Error al obtener los datos del orador:", error);
        }
      };
      fetchSpeakerData();
    }
  }, [speakerId]);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      if (speakerId) {
        // Si estamos actualizando, usamos `updateSpeaker`
        await controllerSpeaker.updateSpeaker(speakerId, formData);
        toast.success("Orador actualizado exitosamente");
      } else {
        // Si estamos creando, usamos `saveSpeaker`
        await controllerSpeaker.saveSpeaker(formData);
        toast.success("Orador guardado exitosamente");
      }
      navigate("/admin/speakers");
    } catch (error) {
      console.error(error);
      toast.error(
        speakerId
          ? "Error al actualizar el orador"
          : "Error al guardar el orador"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Definimos los campos del formulario (los mismos que ya tienes)
  const fields = [
    {
      name: "name_speaker",
      label: "Nombre del orador",
      value: "",
      type: "text",
    },
    { name: "phone_speaker", label: "Teléfono", value: "", type: "tel" },
    {
      name: "type_speaker",
      label: "Nombramiento",
      value: "",
      type: "select",
      options: [
        { value: "A", label: "Anciano" },
        { value: "SM", label: "Siervo ministerial" },
      ],
    },
    { name: "email_speaker", label: "Correo", value: "", type: "email" },
    {
      name: "active_speaker",
      label: "Activar si tiene permiso de salida",
      value: 0,
      type: "checkbox",
    },
    {
      name: "local_speaker",
      label: "Activar si es orador local",
      value: 0,
      type: "checkbox",
    },
  ];

  // Las reglas de validación (igual que antes)
  const validationRules = {
    name_speaker: { required: true, minLength: 4 },
    phone_speaker: { required: true, number: true },
    email_speaker: { required: true, isEmail: true },
  };

  // Inicializamos el formulario con un objeto vacío o los datos de `speakerData`
  const initialData = speakerData || {
    name_speaker: "",
    phone_speaker: "",
    type_speaker: "",
    email_speaker: "",
    active_speaker: 0,
  };

  // Si aún no se han cargado los datos, mostramos un mensaje de "loading"
  if (!speakerData) {
    return <div>Loading...</div>;
  }

  // console.log(speakerData);

  return (
    <div className="max-w-screen-md mx-auto p-10 dark:bg-gray-800">
      <Breadcrumb />
      {/* Sólo pasamos speakerData cuando está disponible */}
      <DynamicForm
        fields={fields}
        validationRules={validationRules}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        initialData={initialData} // Aquí pasamos el initialData adecuado
      />
    </div>
  );
}
