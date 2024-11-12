/**
 *
 *
 * @export
 * @param {*} name
 * @param {string} [format="capitalize"] [format="uppercase"] [format="lowercase"] [format="title"]
 * @return {*}
 */
export function formatName(name, format = "capitalize") {
  if (!name) return ""; // Si el nombre es vacío, devolvemos una cadena vacía.

  switch (format.toLowerCase()) {
    case "capitalize": // Capitaliza solo la primera letra
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    case "uppercase": // Todo en mayúsculas
      return name.toUpperCase();
    case "lowercase": // Todo en minúsculas
      return name.toLowerCase();
    case "title": // Capitaliza la primera letra de cada palabra (formato título)
      return name
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    default:
      return name; // Si el formato no se reconoce, devolvemos el nombre original
  }
}

/*
EJEMPLO DE USO
*/

/*
console.log(formatName('juan')); // 'Juan' (capitalize)
console.log(formatName('juan', 'uppercase')); // 'JUAN'
console.log(formatName('JUAN', 'lowercase')); // 'juan'
console.log(formatName('aNDrEs pEREZ', 'title')); // 'Andres Perez'
console.log(formatName('pablo', 'unknown')); // 'pablo' (por defecto)

*/
