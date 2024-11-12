import { useEffect, useState } from "react";
import { Titles } from "./Titles";
import { Categories } from "./Categories";
import { ctrSketche, ctrlCategory } from "../../../api";

const controllerSketche = new ctrSketche();
const controllerCategory = new ctrlCategory();

export function ListBoquejos() {
  const [isLoading, setIsLoading] = useState(false);
  const [isTitles, setIsTitles] = useState(true);
  const [isCategories, setIsCategories] = useState(false);
  const [dataSketches, setDataSketches] = useState([])

  const getSketches = async () => {
    try {
      setIsLoading(true);
      const resp = await controllerSketche.getSketchesRelCategories()
      // console.log(resp);
      setDataSketches(resp)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSketches();
  }, []);

  // console.log(dataSketches);

  return (
    <>
      <div className="flex items-center">
        <button
          type="button"
          className="w-full border-l border-t border-b text-base font-medium rounded-l-md text-white  px-4 py-2 bg-slate-700 hover:bg-slate-600"
          onClick={() => {
            setIsTitles(true);
            setIsCategories(false);
          }}
        >
          Títulos
        </button>

        <button
          type="button"
          className="w-full border-t border-b border-r text-base font-medium rounded-r-md text-white  px-4 py-2 bg-slate-800 hover:bg-slate-900"
          onClick={() => {
            setIsCategories(true);
            setIsTitles(false);
          }}
        >
          Temas
        </button>
      </div>

      {/* data */}
      <div className="">
        {isTitles && <Titles
          setIsTitles={() => setIsTitles(false)}
          dataSketches={dataSketches}
          setDataSketches={setDataSketches}
        />}

        {isCategories && (
          <Categories
            setIsCategories={() => setIsCategories(false)}
            dataSketches={dataSketches}
            isLoading={isLoading}
          />
        )}
      </div>
    </>
  );
}
