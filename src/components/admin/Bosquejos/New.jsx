import React, { useEffect, useState } from "react";
import { Breadcrumb } from "../../ui/Breadcrumb";
import { Alert } from "../../ui/Alert";
import { useNavigate } from "react-router-dom";
import { Undo2 } from "lucide-react";
import { obtenerFechaActual, validateFields } from "../../../helpers";
import { validateSketch } from "../../../schema/forms";
import { ctrlCategory, ctrSketche } from "../../../api";
import { toast } from "react-toastify";
import { LoadingDots } from "../../ui/IsLoading";

const ctrlSketch = new ctrSketche();
const controllerCategories = new ctrlCategory();

export function NewBosquejo() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState(fieldForm);
  const [dataCategories, setDataCategories] = useState([]);

  const navigate = useNavigate(); // solo para volver atrás
  const handleGoBack = () => {
    navigate(-1); // Vuelve a la página anterior
  };

  const getCategories = async () => {
    try {
      setIsLoading(true);
      const resp = await controllerCategories.getCategories();
      setDataCategories(resp);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleOnChange = async (e) => {
    const { name, type, checked, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value, // Asignamos 1 o 0
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Validate = validateFields(formData, validateSketch);
    if (Object.keys(Validate).length > 0) {
      setErrors(Validate);
      return;
    }

    try {
      setErrors({});
      setIsLoading(true);
      // guardar
      const resp = await ctrlSketch.postSketch(formData);
      // console.log(resp);

      if (resp?.status === 200) {
        toast.success(resp?.results.comment);
        setIsLoading(false);
        setTimeout(() => {
          navigate("/admin/bosquejos");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setErrors([error.results]);
    }
  };

  // console.log(formData);

  useEffect(() => {
    getCategories();
  }, []);

  // console.log(dataCategories);

  if (isLoading) return <LoadingDots />;

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb />

      {/* endBreadcrumb */}

      {/* Volver atrás */}
      <div className=" md:hidden w-full flex items-center align-middle justify-center  text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 py-5">
        <Undo2 />
        <button
          onClick={handleGoBack}
          className="float-end  dark:border-gray-500"
        >
          Volver
        </button>
      </div>
      {/* end Volver atras */}

      <div className="flex items-center justify-center px-12 ">
        <div className="mx-auto w-full max-w-[550px] bg-white p-5">
          {/* Alerta, validaciones del formulario */}
          {Object.values(errors).map((error, index) => (
            <Alert key={index} errores={error} />
          ))}
          {/*Alerta, validaciones del formulario */}

          <form onSubmit={handleSubmit}>
            <div className="md:flex flex-col md:flex-row md:justify-between items-center gap-5">
              <div className="mb-5">
                <label
                  htmlFor="num_sketch"
                  className="mb-3 block text-base font-medium"
                >
                  Numero de Discurso
                </label>
                <input
                  type="text"
                  name="num_sketch"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  value={formData.num_sketch}
                  onChange={handleOnChange}
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="cod_sketch"
                  className="mb-3 block text-base font-medium"
                >
                  Código referencia
                </label>
                <input
                  type="text"
                  name="cod_sketch"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  value={formData.cod_sketch.toUpperCase()}
                  onChange={handleOnChange}
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="update_sketch"
                  className="md:mb-8 block text-center text-base md:text-start font-medium md:-mt-1"
                >
                  Actualizado
                </label>
                <input
                  // checked
                  type="checkbox"
                  name="update_sketch"
                  className="w-full   py-8 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] "
                  value={formData.update_sketch}
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <div className="mb-5">
              <label
                htmlFor="id_category_sketche"
                className="mb-3 block text-base font-medium"
              >
                Tema
              </label>
              <select
                id="id_category_sketche"
                name="id_category_sketche"
                className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                value={formData.id_category_sketche}
                onChange={handleOnChange}
              >
                <option value="">Seleccione</option>
                {dataCategories?.results?.map((item, index) => (
                  <option key={index} value={item.id_category}>
                    {item.name_category}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <label
                htmlFor="topic_sketche"
                className="mb-3 block text-base font-medium"
              >
                Tema del discurso
              </label>
              <input
                type="text"
                name="topic_sketche"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.topic_sketche}
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

const fieldForm = {
  num_sketch: "",
  cod_sketch: "",
  topic_sketche: "",
  id_category_sketche: "",
  topic_sketche: "",
  update_sketch: 0,
  date_created_sketch: obtenerFechaActual(),
};
