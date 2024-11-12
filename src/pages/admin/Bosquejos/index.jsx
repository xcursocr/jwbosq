import { Link } from "react-router-dom";
import { ListBoquejos } from "../../../components/admin/Bosquejos/List";

export function Bosquejos() {
  return (
    <div>
      <div className="mx-auto max-w-6xl py-6">
        <h2 className="text-center font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Bosquejos
        </h2>
        <p className="text-center text-xs font-semibold leading-7 text-primary-500 ">
          Temas de discursos
        </p>
      </div>

      <div>
        <ListBoquejos />
      </div>
    </div>
  );
}
