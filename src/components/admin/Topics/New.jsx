import { useState } from "react";
import { Alert } from "../../ui/Alert";
import { Breadcrumb } from "../../ui/Breadcrumb";
import { obtenerFechaActual } from "../../../helpers/dateActual";
import { ctrlCategory } from "../../../api/category";
import { validateFields } from "../../../helpers";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LoadingDots } from "../../ui/IsLoading";

const controllerCategory = new ctrlCategory()

// state initial
const formFields = {
  name_category: "",
  date_created_category: obtenerFechaActual()
}

// validation
const validateForm = {
  // propiedades de validaciones
  name_category: {
    label: "Nombre de la tema",
    required: true,
    minLength: 5,
  },
}

export function NewTopic() {
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const [formData, setFormData] = useState(formFields)

  const navigate = useNavigate()

  const handleOnChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value.toUpperCase() // Convertir el valor a mayúsculas
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const Validate = validateFields(formData, validateForm);
      if (Object.keys(Validate).length > 0) {
        setErrors(Validate);
        return;
      }
      setIsLoading(true)
      const resp = await controllerCategory.saveCategory(formData)
      if (resp?.status === 200) {
        toast.success(resp?.results.comment);
        setTimeout(() => {
          navigate("/admin/topics");
        }, 500);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <LoadingDots />


  return (
    <>
      <div className="max-w-screen-md mx-auto p-10 dark:bg-gray-800">

        <Breadcrumb />

        <div className="mx-auto w-full max-w-[550px] bg-white p-5">
          {/* Alerta, validaciones del formulario */}
          {Object?.values(errors).map((error, index) => (
            <Alert key={index} errores={error} />
          ))}
          {/*Alerta, validaciones del formulario */}

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="name_category"
                className="mb-3 block text-base font-medium"
              >
                Nombre del Tema
              </label>
              <input
                type="text"
                name="name_category"
                id="name_category"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.name_category}
                onChange={handleOnChange}
              />
            </div>

            <div>
              <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                {isLoading ? "Cargando" : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}