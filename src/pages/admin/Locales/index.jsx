import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LoadingOvelShaped } from "../../../components/ui/IsLoading";
import { ctrSpeakers } from "../../../api";
import { role } from "../../../schema";

const ctrSpeaker = new ctrSpeakers();

export function Locales() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [errores, setErrores] = useState(false);

  // console.log(data);


  const getProducts = async () => {
    try {
      setIsLoading(true);
      const resp = await ctrSpeaker.getSpeakers();
      setIsLoading(false);
      setData(resp.results);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErrores(error.results);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (isLoading) return <LoadingOvelShaped />;

  // console.log(data);

  return (
    <>
      <div className="mx-auto max-w-6xl py-6">
        <h2 className="text-center font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Discursantes
        </h2>
        <p className="text-center text-xs font-semibold leading-7 text-primary-500">
          Discursantes hermanos locales
        </p>
      </div>

      <ul className="grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
        {!errores
          ? data.map((item, index) => (
            <li
              className="relative flex flex-col sm:flex-row xl:flex-col items-start"
              key={index}
            >
              <Link to={`/admin/locales/${item.id_speaker}`}>
                <img
                  src="https://images.pexels.com/photos/3779448/pexels-photo-3779448.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  alt=""
                  className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full"
                  width="1216"
                  height="640"
                />
              </Link>
              <div className="sm:ml-6 xl:ml-0 w-full align-middle">
                <div className="md:flex md:justify-between border-b-2">
                  <span className="text-xs text-gray-400 block md:inline-block">
                    {role(item.type_speaker)}
                  </span>
                  <span className="text-xs text-gray-400 block md:inline-block">
                    {item.email_speaker}
                  </span>
                </div>
                <h3 className="text-slate-900 font-semibold">
                  <span className=" block text-sm leading-6 text-indigo-500">
                    {item.name_speaker}
                  </span>
                </h3>
                {/* buto */}
                <div className="flex w-full md:max-w-xl  rounded shadow">
                  <Link
                    to={`/admin/locales/${item.id_speaker}`}
                    aria-current="false"
                    className="w-full flex justify-center md:text-sm text-xs text-center font-medium rounded-l px-5 py-2 border bg-white text-gray-800 border-gray-200 hover:bg-gray-100"
                  >
                    Ver sus discursos
                  </Link>
                </div>
              </div>
            </li>
          ))
          : "No hay datos que mostrar"}
      </ul>
    </>
  );
}
