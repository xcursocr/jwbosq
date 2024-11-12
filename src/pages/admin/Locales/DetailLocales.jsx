import { useParams } from "react-router-dom";
import { ctrDiscLocales } from "../../../api";
import { useEffect, useState } from "react";
import { LoadingOvelShaped } from "../../../components/ui/IsLoading";
import { isActive, role, sale } from "../../../schema";
import { Dot, FilePenLineIcon, Trash2 } from "lucide-react";

const ctrlDiscLocales = new ctrDiscLocales();

export function DetailLocales() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [errores, setErrores] = useState(false);

  const { id } = useParams();

  const getProduct = async () => {
    try {
      setIsLoading(true);
      const resp = await ctrlDiscLocales.getDiscursosLocales(id);
      setIsLoading(false);
      setData(resp.results);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErrores(true);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (isLoading) return <LoadingOvelShaped />;

  // console.log(data);

  return (
    <div className=" md:flex md:justify-between mx-auto w-full ">
      {/* <br />
        <span>Nombre: {data[0]?.name_speaker} </span>
        <span> Nombramiento: {role(data[0]?.type_speaker)}</span>
        <span> Permiso de salida: {isActive(data[0]?.active_speaker)}</span>
        <img src="https://pagedone.io/asset/uploads/1697536419.png" alt="Floyd image" /> */}
      {/* agregar aqui una card de usuario */}

      {/* card user */}
      <div className="max-w-xxl md:max-w-xs rounded overflow-hidden shadow-lg">
        <div className="relative">
          <img
            className="w-full clippy"
            src="https://images.pexels.com/photos/3779448/pexels-photo-3779448.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="Sunset in the mountains"
          />
          <div className="clippy absolute bottom-0 left-0 top-0 right-0 bg-blue-700 bg-opacity-50 p-4 text-white flex flex-col justify-end items-center"></div>
        </div>
        <div className="pt-3 pb-5 px-5 flex flex-col items-center">
          <p className="font-bold text-3xl">{data[0]?.name_speaker}</p>
          <p className="text-gray-500">{role(data[0]?.type_speaker)}</p>
          <p className="text-gray-500">{data[0]?.email_speaker}</p>
          <p className="text-gray-500">{data[0]?.phone_speaker}</p>
          {/* <p className={`text-center mb-2 text-green-400`}>{sale(data[0]?.active_speaker)}</p> */}
          <p
            className={
              "btn-group pull-right " +
              sale(data[0]?.active_speaker ? "text-green-600" : " text-red-600")
            }
          >
            {sale(data[0]?.active_speaker)}
          </p>
          {/* <div div className="mt-5 flex flex-row justify-center items-start">
            <div className="px-3 text-center">
              <p className="text-gray-500">Following</p>
              <b className="text-2xl">561</b>
            </div>
            <div className="px-3 text-center">
              <p className="text-gray-500">Tweets</p>
              <b className="text-2xl">1,337</b>
            </div>
            <div className="px-3 text-center">
              <p className="text-gray-500">Followers</p>
              <b className="text-2xl">781</b>
            </div>
          </div> */}
        </div>
      </div>

      <div>
        <div className="flex items-center md:justify-end my-4">
          <button
            type="button"
            className="md:w-64 w-full border text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 px-4 py-2"
          >
            Nuevo Bosquejo Preparado
          </button>
        </div>

        <div className=" overflow-x-auto pb-4">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden  border rounded-lg border-gray-300">
              {/* table */}
              <table className="table-auto min-w-full rounded-xl">
                <thead>
                  <tr className="bg-gray-50">
                    <th
                      scope="col"
                      className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      {" "}
                      #Bosquejo{" "}
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize min-w-[150px]"
                    >
                      {" "}
                      Tema &amp; Discurso{" "}
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      {" "}
                      Actualizado ?{" "}
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      {" "}
                      Actions{" "}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300 ">
                  {!errores
                    ? data?.map((item, index) => (
                        <tr
                          className="bg-white transition-all duration-500 hover:bg-gray-50"
                          key={index}
                        >
                          <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-400 ">
                            {" "}
                            {item.num_sketch}
                          </td>
                          <td className=" px-5 py-3">
                            <div className="w-48 flex items-center gap-3">
                              <div className="data">
                                <p className="font-normal text-xs text-gray-400">
                                  {item.cod_sketch}
                                </p>
                                <p className="font-normal text-sm leading-5 text-gray-500">
                                  {" "}
                                  {item.topic_sketche}{" "}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                            <div className="py-1.5 px-2.5 bg-emerald-50 rounded-full flex justify-center w-20 items-center gap-1">
                              {/* #3acb5e */}
                              {/* #D97706 */}
                              {/* text-emerald-600 */}
                              {/* text-red-600 */}
                              <Dot color="#3acb5e" />
                              <span className="font-medium text-xs text-emerald-600 ">
                                {isActive(item.update_sketch)}
                              </span>
                            </div>
                          </td>
                          <td className="flex p-5 items-center gap-0.5">
                            <button className="p-2  rounded-full bg-white group transition-all duration-500 hover:bg-indigo-600 flex item-center">
                              <div className="text-indigo-500 group-hover:text-white">
                                <FilePenLineIcon />
                              </div>
                            </button>
                            <button className="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-red-600 flex item-center">
                              <div className="text-red-600 hover:text-white">
                                <Trash2 />
                              </div>
                            </button>
                          </td>
                        </tr>
                      ))
                    : "No hay datos que mostrar"}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
