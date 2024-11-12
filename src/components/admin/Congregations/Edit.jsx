import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ctrlCongregation } from "../../../api";
import { Breadcrumb, DynamicForm, LoadingDots } from "../../ui";
import { toast } from "react-toastify";

// controllers
const controllerCongregation = new ctrlCongregation();

export function EditCongregation() {
  const [isLoading, setIsLoading] = useState(false);
  const [editData, setEditData] = useState(null);
  const { congregationId } = useParams(); // Obtener el ID del orador de la URL (si estamos editando)

  const navigate = useNavigate();

  useEffect(() => {
    if (congregationId) {
      // Si tenemos un ID de orador, obtenemos los datos del orador
      const fetchDataEdit = async () => {
        try {
          setIsLoading(true);
          const data = await controllerCongregation.getCongregationOne(
            congregationId
          );
          // console.log(data);
          const { status, results, total } = data;
          // console.log(results[0]);
          setEditData(results[0]); // Establecemos los datos del orador para editar
        } catch (error) {
          console.error("Error al obtener los datos del orador:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchDataEdit();
    }
  }, [congregationId]);

  // console.log(editData);
  // Definimos los campos del formulario (los mismos que ya tienes)
  const fieldsForm = [
    {
      name: "name_congregation",
      label: "Nombre de congregación",
      value: "",
      type: "text",
    },
    {
      name: "direction_congregation",
      label: "Dirección de la congregación",
      value: "",
      type: "text",
    },
  ];
  // Inicializamos el formulario con un objeto vacío o los datos de `speakerData`
  const initialData = editData || {
    name_congregation: "",
    direction_congregation: "",
  };

  // Las reglas de validación (igual que antes)
  const validationRules = {
    name_congregation: { required: true, minLength: 4 },
    direction_congregation: { required: true, minLength: 4 },
  };

  const handleSubmit = async (formData) => {
    try {
      if (congregationId) {
        // Si estamos actualizando, usamos `updateSpeaker`
        await controllerCongregation.updateCongregation(
          congregationId,
          formData
        );
        toast.success("Se ha actualizado exitosamente");
      } else {
        // Si estamos creando, usamos `saveSpeaker`
        await controllerCongregation.saveCongregation(formData);
        toast.success("Se ha guardado exitosamente");
      }
      navigate("/admin/congregaciones");
    } catch (error) {
      console.error(error);
      toast.error(congregationId ? "Error al actualizar" : "Error al guardar");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingDots />;

  return (
    <>
      <div className="max-w-screen-md mx-auto p-10 dark:bg-gray-800">
        <Breadcrumb />
        <DynamicForm
          fields={fieldsForm}
          isLoading={false}
          onSubmit={handleSubmit}
          validationRules={validationRules}
          initialData={initialData}
        />
      </div>
    </>
  );
}
