export const TitleHeader = ({ titulo, descripcion, subTitulo }) => {
  return (
    <div className="mx-auto max-w-6xl py-6">
      {/* Título principal */}
      <h2 className="text-center font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        {titulo}
      </h2>

      {/* Subtítulo */}
      {subTitulo && (
        <p className="text-center text-xs font-semibold leading-7 text-primary-500">
          {subTitulo}
        </p>
      )}

      {/* Descripción */}
      {descripcion && (
        <p className="text-center text-sm font-semibold leading-7 text-gray-600">
          {descripcion}
        </p>
      )}
    </div>
  );
};
