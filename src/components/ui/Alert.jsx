export function Alert({ index, errores }) {
  return (
    <div key={index}>
      <ul className="mb-4">
        <li className="text-white bg-red-500 mt-4 p-4 text-center rounded-md">{errores}</li>
      </ul>
    </div>
  );
}