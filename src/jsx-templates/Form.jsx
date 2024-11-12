import { useState } from "react";

export function FormExample() {
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState(['errors'])
  return (
    <>
      {/* Title */}
      <ul class="gap-4 items-center font-medium text-sm flex dark:text-white">

        <li>
          <a href="#" class="dark:text-gray-300">
            Products
          </a>
        </li>

        <li class="h-6 border-r border-gray-300 -skew-x-12 dark:border-gray-500"></li>

        <li>
          <a href="#" class="dark:text-gray-300">
            Iphone 20 max pro 7g ultimate gaming edition
          </a>
        </li>

        <li class="h-6 border-r border-gray-300 -skew-x-12 dark:border-gray-500"></li>

        <li>
          <a href="#" class="text-gray-500 dark:text-gray-400">
            Edit
          </a>
        </li>

      </ul>
      {/* endTitle */}
      <div className="flex items-center justify-center p-12 ">



        <div className="mx-auto w-full max-w-[550px] bg-white p-5">
          {/* Alerta, validaciones del formulario */}
          {Object?.values(errors).map((error, index) => (
            <Alert key={index} errores={error} />
          ))}
          {/*Alerta, validaciones del formulario */}

          <form>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="mb-3 block text-base font-medium"
              >
                name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div>
              <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                {isLoading ? "Cargando" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}