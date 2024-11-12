export const role = (rol) => {
  switch (rol) {
    case "SM":
      rol = "Siervo Ministerial"
      break;
    case "A":
      rol = "Anciano"
      break;
    case "PR":
      rol = "Precursor regular"
      break;
    case "PA":
      rol = "Precursor auxiliar"
      break;

    default:
      break;
  }
  return rol
}

export const isActive = (value) => {
  switch (value) {
    case 0:
      value = "NO"
      break;
    case 1:
      value = "SI"
      break;


    default:
      break;
  }
  return value
}

export const sale = (value) => {
  switch (value) {
    case 0:
      value = "No tiene permiso de salida"
      break;
    case 1:
      value = "Si tiene permiso de salida"
      break;


    default:
      break;
  }
  return value
}