import { ListSpeakers } from "../../../components/admin/Speakers/List";

export function Speakers() {
  return (
    <div>
      <div className="mx-auto max-w-6xl py-6">
        <h2 className="text-center font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Lista de discursantes
        </h2>
        <p className="text-center text-xs font-semibold leading-7 text-primary-500 ">
          Locales & Visitantes
        </p>
      </div>

      <div>
        <ListSpeakers />
      </div>
    </div>
  );
}