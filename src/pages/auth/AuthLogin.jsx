import { useState } from "react";
import { DynamicForm, LoadingDots } from "../../components/ui";
import { toast } from "react-toastify";
import { Auth } from "../../api";
import { useAuth } from "../../hooks";
import { useNavigate } from "react-router-dom";

const controllerAuth = new Auth();

export function AuthLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);

  // console.log(useAuth());
  const { login } = useAuth();
  const navigate = useNavigate();

  const initialValues = dataEdit || {
    email_speaker: "",
    password_speaker: "",
  };

  const fieldsForm = [
    {
      name: "email_speaker",
      label: "",
      value: "",
      type: "email",
      placeholder: "Escriba su correo",
    },
    {
      name: "password_speaker",
      label: "",
      value: "",
      type: "password",
      placeholder: "Escriba su contraseña",
    },
  ];

  const validateForm = {
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
      // console.log(formData);
      const { results } = await controllerAuth.login(formData);
      controllerAuth.setAccessToken(results[0].token_speaker);
      // console.log("LOGIN", results);
      login(results[0].token_speaker);
      // console.log(results);
      window.location.reload(); // Recarga la página completamente
    } catch (error) {
      console.log(error);
      toast.error(`Hubo un error al iniciar session ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingDots />;

  return (
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-400 mb-10 ">
            INICIO DE SESSION
          </h2>

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
