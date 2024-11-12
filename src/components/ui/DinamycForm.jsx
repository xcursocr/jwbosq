import React, { useState } from "react";
import { validateFields } from "../../helpers";

export const DynamicForm = ({ fields, validationRules, onSubmit, isLoading, initialData = {} }) => {
  const [formData, setFormData] = useState(() => {
    // Usamos los valores iniciales si se pasan
    return fields.reduce((acc, field) => {
      acc[field.name] = initialData[field.name] || field.value || (field.type === 'checkbox' ? 0 : "");
      return acc;
    }, {});
  });

  const [errors, setErrors] = useState({}); // Para manejar los errores de validación

  const handleOnChange = (e) => {
    const { name, value, type, checked, options } = e.target;

    if (type === "checkbox") {
      // Guardar 1 para marcado, 0 para no marcado
      setFormData((prev) => ({
        ...prev,
        [name]: checked ? 1 : 0,
      }));
    } else if (type === "radio") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (type === "select-multiple") {
      const selectedValues = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setFormData((prev) => ({
        ...prev,
        [name]: selectedValues,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar los datos del formulario
    const validationErrors = validateFields(formData, validationRules);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Si hay errores, los guardamos en el estado
      return; // Detenemos el envío del formulario
    }

    // Si no hay errores, llamamos a la función `onSubmit` pasada como prop
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {fields.map((field) => (
        <div key={field.name} className="mb-5">
          <label
            htmlFor={field.name}
            className="mb-3 block text-base font-medium"
          >
            {field.label}
          </label>

          {/* Renderizamos diferentes tipos de campos según el tipo */}
          {field.type === "text" || field.type === "email" || field.type === "number" || field.type === "tel" || field.type === "search" ? (
            <input
              type={field.type}
              name={field.name}
              id={field.name}
              className={`w-full rounded-md border ${errors[field.name] ? 'border-red-500' : 'border-[#e0e0e0]'} bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md`}
              value={formData[field.name]}
              onChange={handleOnChange}
              placeholder={field.placeholder || ""}
            />
          ) : field.type === "password" ? (
            <input
              type="password"
              name={field.name}
              id={field.name}
              className={`w-full rounded-md border ${errors[field.name] ? 'border-red-500' : 'border-[#e0e0e0]'} bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md`}
              value={formData[field.name]}
              onChange={handleOnChange}
              placeholder={field.placeholder || ""}
            />
          ) : field.type === "textarea" ? (
            <textarea
              name={field.name}
              id={field.name}
              className={`w-full rounded-md border ${errors[field.name] ? 'border-red-500' : 'border-[#e0e0e0]'} bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md`}
              value={formData[field.name]}
              onChange={handleOnChange}
              placeholder={field.placeholder || ""}
              rows={field.rows || 4} // Agregar número de filas por defecto
            />
          ) : field.type === "select" ? (
            <select
              name={field.name}
              id={field.name}
              className={`w-full rounded-md border ${errors[field.name] ? 'border-red-500' : 'border-[#e0e0e0]'} bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md`}
              value={formData[field.name]}
              onChange={handleOnChange}
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === "select-multiple" ? (
            <select
              name={field.name}
              id={field.name}
              className={`w-full rounded-md border ${errors[field.name] ? 'border-red-500' : 'border-[#e0e0e0]'} bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md`}
              value={formData[field.name]}
              onChange={handleOnChange}
              multiple
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === "checkbox" ? (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name={field.name}
                id={field.name}
                // checked={formData[field.name] === 1} // Usamos 1 para marcado y 0 para no marcado
                checked={formData[field.name]} // Usamos 1 para marcado y 0 para no marcado
                onChange={handleOnChange}
                className="text-indigo-600"
              />
              <span>{field.label}</span>
            </div>
          ) : field.type === "radio" ? (
            <div className="flex items-center gap-3">
              {field.options.map((option) => (
                <div key={option.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={field.name}
                    value={option.value}
                    checked={formData[field.name] === option.value}
                    onChange={handleOnChange}
                    className="text-indigo-600"
                  />
                  <label>{option.label}</label>
                </div>
              ))}
            </div>
          ) : field.type === "date" ? (
            <input
              type="date"
              name={field.name}
              id={field.name}
              className={`w-full rounded-md border ${errors[field.name] ? 'border-red-500' : 'border-[#e0e0e0]'} bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md`}
              value={formData[field.name]}
              onChange={handleOnChange}
            />
          ) : field.type === "datetime-local" ? (
            <input
              type="datetime-local"
              name={field.name}
              id={field.name}
              className={`w-full rounded-md border ${errors[field.name] ? 'border-red-500' : 'border-[#e0e0e0]'} bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md`}
              value={formData[field.name]}
              onChange={handleOnChange}
            />
          ) : field.type === "time" ? (
            <input
              type="time"
              name={field.name}
              id={field.name}
              className={`w-full rounded-md border ${errors[field.name] ? 'border-red-500' : 'border-[#e0e0e0]'} bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md`}
              value={formData[field.name]}
              onChange={handleOnChange}
            />
          ) : field.type === "file" ? (
            <input
              type="file"
              name={field.name}
              id={field.name}
              className="w-full py-3 px-6 text-base font-medium text-[#6B7280] border-[#e0e0e0] outline-none"
              onChange={handleOnChange}
            />
          ) : field.type === "hidden" ? (
            <input
              type="hidden"
              name={field.name}
              id={field.name}
              value={formData[field.name]}
            />
          ) : null}

          {/* Mostrar el mensaje de error debajo del campo si existe */}
          {errors[field.name] && (
            <div className="text-red-500 text-sm mt-1">{errors[field.name]}</div>
          )}
        </div>
      ))}

      <div>
        <button
          type="submit"
          className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
        >
          {isLoading ? "Cargando..." : "Guardar"}
        </button>
      </div>
    </form>
  );
};





/**
 * 
 * EJEMPLO DE USO PARA NUEVO REGISTRO
 */


/**
 * import { useState } from "react";
import { DynamicForm } from "../../ui/DinamycForm";
import { Breadcrumb } from "../../ui/Breadcrumb";
import { toast } from "react-toastify";
import { ctrSpeakers } from "../../../api/speaker";
import { useNavigate } from "react-router-dom";
import { obtenerFechaActual } from "../../../helpers";

const controllerSpeaker = new ctrSpeakers()

export function NewSpeakers() {
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (formData) => {
    // console.log(formData);
    setIsLoading(true);
    try {
      const response = await controllerSpeaker.saveSpeaker(formData)
      toast.success("Orador guardado exitosamente");
      // Limpiar el formulario o redirigir a otra página, si es necesario
      navigate("/admin/speakers")
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
    label: "Permiso de salida",
    value: 0,
    type: "checkbox",
  },
  {
    name: "date_created_speaker",
    // label: "Creado",
    value: obtenerFechaActual(),
    // type: "date",
    type: "hidden",
  }

];

// Validaciones
export const validationRules = {
  // propiedades de validaciones
  name_speaker: {
    label: "Nombre del discurso",
    required: true,
    minLength: 4,
  },

  phone_speaker: {
    label: "Telefono de la discurso",
    required: true,
    number: true,
  },

  email_speaker: {
    label: "Correo del orador",
    required: true,
    isEmail: true
  },

};


 */

/**
 * EJEMPLO DE USO PARA ACTUALIZACION
 */

/**
 * 
 * 
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


 */