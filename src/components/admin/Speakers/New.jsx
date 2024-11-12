import { useState } from "react";
import { DynamicForm } from "../../ui/DinamycForm";
import { Breadcrumb } from "../../ui/Breadcrumb";
import { toast } from "react-toastify";
import { ctrSpeakers } from "../../../api/speaker";
import { useNavigate } from "react-router-dom";
import { obtenerFechaActual } from "../../../helpers";

const controllerSpeaker = new ctrSpeakers();

export function NewSpeakers() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    // console.log(formData);
    setIsLoading(true);
    try {
      const response = await controllerSpeaker.saveSpeaker(formData);
      toast.success("Orador guardado exitosamente");
      // Limpiar el formulario o redirigir a otra página, si es necesario
      navigate("/admin/speakers");
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar el orador");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-screen-md mx-auto p-10 dark:bg-gray-800">
      <Breadcrumb />
      <DynamicForm
        fields={fields}
        validationRules={validationRules}
        onSubmit={handleSubmit}
        isLoading={false}
      />
    </div>
  );
}

const fields = [
  {
    name: "name_speaker",
    label: "Nombre del orador",
    value: "", // Valor inicial
    type: "text",
    placeholder: "Nombre del orador",
  },
  {
    name: "phone_speaker",
    label: "Telefono",
    value: "",
    type: "tel",
    placeholder: "87525157",
  },
  {
    name: "type_speaker",
    label: "Nombramiento",
    value: "",
    type: "select",
    options: [
      { value: "", label: "Seleccione" },
      { value: "A", label: "Anciano" },
      { value: "SM", label: "Siervo ministerial" },
    ],
  },
  {
    name: "email_speaker",
    label: "Correo",
    value: "", // Valor inicial
    type: "email",
    placeholder: "correo@correo.com",
  },
  {
    name: "active_speaker",
    label: "Activar si tiene permiso de salida",
    value: 0,
    type: "checkbox",
  },
  {
    name: "local_speaker",
    label: "Activar si el orador es local",
    value: 0,
    type: "checkbox",
  },
  {
    name: "date_created_speaker",
    // label: "Creado",
    value: obtenerFechaActual(),
    // type: "date",
    type: "hidden",
  },
];

// Validaciones
export const validationRules = {
  // propiedades de validaciones
  name_speaker: {
    label: "Nombre del Orador",
    required: true,
    minLength: 4,
  },

  type_speaker: {
    label: "Nombramiento del Orador",
    required: true,
  },

  phone_speaker: {
    label: "Teléfono del Orador",
    required: true,
    number: true,
  },

  email_speaker: {
    label: "Correo del Orador",
    required: true,
    isEmail: true,
  },
};
