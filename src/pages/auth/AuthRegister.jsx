import { DynamicForm, LoadingDots } from "../../components/ui";
import { toast } from "react-toastify";
import { useState } from "react";
import { Auth } from "../../api";
import { useNavigate } from "react-router-dom";
import { obtenerFechaActual } from "../../helpers";

const controllerAuth = new Auth();

export function AuthRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);

  const navigate = useNavigate();

  const initialValues = dataEdit || {
    name_speaker: "",
    phone_speaker: "",
    type_speaker: "",
    email_speaker: "",
    password_speaker: "",
    type_speaker: "SM",
    date_created_speaker: obtenerFechaActual(),
  };

  const fieldsForm = [
    {
      name: "name_speaker",
      label: "",
      value: "",
      type: "text",
      placeholder: "Escriba su nombre",
    },
    {
      name: "phone_speaker",
      label: "",
      value: "",
      type: "tel",
      placeholder: "Escriba su # de teléfono",
    },
    {
      name: "email_speaker",
      label: "",
      value: "",
      type: "email",
      placeholder: "Escriba su correo",
    },
    {
      name: "type_speaker",
      label: "",
      value: "SM",
      type: "hidden",
      placeholder: "",
    },
    {
      name: "password_speaker",
      label: "",
      value: "",
      type: "password",
      placeholder: "Escriba su contraseña",
    },
    {
      name: "date_created_speaker",
      label: "",
      value: obtenerFechaActual(),
      type: "hidden",
      placeholder: "",
    },
  ];

  const validateForm = {
    name_speaker: {
      label: "Nombre del usuario",
      required: true,
      minLength: 4,
    },
    phone_speaker: {
      label: "Telefono del usuario",
      required: true,
      number: true,
    },
    email_speaker: {
      label: "Correo del usuario",
      required: true,
      isEmail: true,
    },
    password_speaker: {
      label: "Contraseña del usuario",
      required: true,
      minLength: 8,
    },
  };

  const handleSumit = async (formData) => {
    try {
      setIsLoading(true);
      console.log(formData);
      const { results } = await controllerAuth.register(formData);
      // console.log(results);
      setTimeout(() => {
        toast.success("Ha iniciado session correctamente");
      }, 500);
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
      toast.error(`Hubo un error al guardar el usuario ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // if (isLoading) return <LoadingDots />

  return (
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white shadow-md rounded-md p-6">
          {/* <img className="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt="" /> */}

          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-400 mb-10 ">
            Registrarse en el sistema
          </h2>

          {/* <form className="space-y-6" method="POST">

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
              <div className="mt-1">
                <input name="name" type="name" required
                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo</label>
              <div className="mt-1">
                <input name="email" type="email-address" required
                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
              <div className="mt-1">
                <input name="password" type="password" required
                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
              <div className="mt-1">
                <input name="confirm_password" type="password" required
                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
              </div>
            </div>

            <div>
              <button type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">
                Registrarse
              </button>
            </div>
          </form> */}

          <DynamicForm
            fields={fieldsForm}
            isLoading={false}
            onSubmit={handleSumit}
            validationRules={validateForm}
            initialData={initialValues}
          />
        </div>
      </div>
    </div>
  );
}
