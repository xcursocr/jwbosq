export function _url(endpoint, queryParams) {
  // return `${process.env.REACT_APP_API_URL}${endpoint}?${new URLSearchParams(
  //   queryParams
  // ).toString()}`;
  return `https://apinw.domcloud.dev${endpoint}?${new URLSearchParams(
    queryParams
  ).toString()}`;
  // }
  // return `http://apirest.test${endpoint}?${new URLSearchParams(
  //   queryParams
  // ).toString()}`;
}
export function _Headers(_method, _body = {}) {
  if (_method === "POST" || _method === "PUT") {
    return {
      method: _method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "sfsagwshsGRgsXFJDF46234SDGSrtery", // Reemplaza con tu token de autorización
      },
      body: new URLSearchParams(_body).toString(), // Enviar los datos como parámetros de consulta
    };
  } else if (_method === "DELETE" || _method === "GET") {
    return {
      method: _method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "sfsagwshsGRgsXFJDF46234SDGSrtery", // Reemplaza con tu token de autorización
      },
    };
  } else {
    return {
      message: "Error en el Metodo REQUEST",
    };
  }
}

export function getCurrentDateForMySQL() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Meses son de 0-11
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  // EJEMPLO DE USO
  // const MyComponent = () => {
  //   const currentDate = getCurrentDateForMySQL();

  //   return (
  //     <div>
  //       <h1>Fecha actual para MySQL:</h1>
  //       <p>{currentDate}</p>
  //     </div>
  //   );
  // };

  // export default MyComponent;
}
