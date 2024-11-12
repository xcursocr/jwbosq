import { useState } from "react";
import { Locales } from "./Locales";
import { Visitantes } from "./Visitantes";

export function ListSpeakers() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLocales, setIsLocales] = useState(true);
  const [isVisitantes, setIsVisitantes] = useState(false);
  const [arrData, setArrData] = useState([])

  return (
    <>
      <div className="flex items-center">
        <button
          type="button"
          className="w-full border-l border-t border-b text-base font-medium rounded-l-md text-white  px-4 py-2 bg-slate-700 hover:bg-slate-600"
          onClick={() => {
            setIsLocales(true);
            setIsVisitantes(false);
          }}
        >
          Locales
        </button>

        <button
          type="button"
          className="w-full border-t border-b border-r text-base font-medium rounded-r-md text-white  px-4 py-2 bg-slate-800 hover:bg-slate-900"
          onClick={() => {
            setIsLocales(false);
            setIsVisitantes(true);
          }}
        >
          Visitantes
        </button>
      </div>

      {/* data */}
      <div className="">
        {isLocales && <Locales
          setIsLocales={() => setIsLocales(false)}

        />}

        {isVisitantes && (
          <Visitantes
            setIsVisitantes={() => setIsVisitantes(false)}

          />
        )}
      </div>
    </>


  );
}