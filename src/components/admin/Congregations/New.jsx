import { useState } from "react";
import { ctrlCongregation } from "../../../api/congregation";
import { Breadcrumb } from "../../ui/Breadcrumb";
import { DynamicForm } from "../../ui/DinamycForm";
import { formatName, obtenerFechaActual } from "../../../helpers";
import { toast } from "react-toastify";
import Swal from "sweetalert2"; // Importar SweetAlert
import { useNavigate } from "react-router-dom";

// controladores
const controllerCongregation = new ctrlCongregation();

export function NewCongregation() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSumit = async (formData) => {
    try {
      // console.log(formData);
      setIsLoading(true);
      const resp = await controllerCongregation.saveCongregation(formData);
      // Mostrar SweetAlert al guardar correctamente
      Swal.fire({
        title: "¡Registro guardado!",
        text: "La congregación ha sido registrada exitosamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      }).then(() => {
        // Redirigir después de que el usuario cierre la alerta
        navigate("/admin/congregaciones"); // Cambia "/ruta-a-redirigir" por la URL a la que quieras redirigir
      });
    } catch (error) {
      console.log(error);
      toast.error("Error al guardar el orador");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb />
      <div className="max-w-screen-sm mx-auto my-8">
        <DynamicForm
          fields={fields}
          isLoading={false}
          onSubmit={handleSumit}
          validationRules={validationRules}
          initialData={{}}
        />
      </div>
    </>
  );
}

const fields = [
  {
    name: "name_congregation",
    label: "Congregación",
    value: "",
    type: "text",
    placeholder: "Nombre de la congregación",
  },
  {
    name: "direction_congregation",
    label: "Dirección",
    value: "",
    type: "text",
    placeholder: "Dirección exacta",
  },
  {
    name: "date_created_congregation",
    // label: "Dirección",
    value: obtenerFechaActual(),
    type: "hidden",
    // placeholder: "Fecha de registro",
  },
];

// Validaciones
const validationRules = {
  // propiedades de validaciones
  name_congregation: {
    label: "Nombre de la congregación",
    required: true,
    minLength: 4,
  },

  direction_congregation: {
    label: "Dirección de la congregación",
    required: true,
    minLength: 4,
  },
};
