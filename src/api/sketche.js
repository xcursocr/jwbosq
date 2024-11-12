import { _url, _Headers } from "../helpers";

export class ctrSketche {

  // guardar  discurso
  async postSketch(data) {
    const queryParams = {
      token: "no",
      table: "speakers",
      suffix: "speaker",
      except: "num_sketch",
    };
    try {
      const url = _url("/sketches", queryParams);
      const headers = _Headers("POST", data);
      const response = await fetch(url, headers);
      const result = await response.json();
      if (response.status !== 200) {
        return 0;
      };
      return result;
    } catch (error) {
      throw error;
    }
  }

  // obtener todos los discursos
  async getSketches() {
    const queryParams = {
      select: "*",
    };
    try {
      const url = _url("/sketches", queryParams);
      const headers = _Headers("GET");
      const response = await fetch(url, headers);
      const result = await response.json();
      if (response.status !== 200) {
        return 0;
      };
      return result;
    } catch (error) {
      throw error;
    }
  }

  // obtener tanto los discursos como categorias que pertenecen
  async getSketchesRelCategories() {
    const queryParams = {
      sql: "SELECT * FROM sketches INNER JOIN categories ON sketches.id_category_sketche = categories.id_category",
    };
    try {
      const url = _url("/query", queryParams);
      const headers = _Headers("GET");
      const response = await fetch(url, headers);
      const result = await response.json();
      if (response.status !== 200) {
        return 0;
      };
      return result;
    } catch (error) {
      throw error;
    }
  }

  // obtener todos los discursos por categoria
  async getSketchesByCategory(id) {
    const queryParams = {
      sql: `SELECT * FROM sketches WHERE id_category_sketche = ${id}`,
    };
    try {
      const url = _url("/query", queryParams);
      const headers = _Headers("GET");
      const response = await fetch(url, headers);
      const result = await response.json();
      if (response.status !== 200) {
        return 0;
      };
      return result;
    } catch (error) {
      throw error;
    }
  }

  // obtener un  discurso
  async getSketcheOne(id_assignm) {
    const queryParams = {
      select: "*",
      linkTo: "id_sketch",
      equalTo: id_assignm,
    };
    try {
      const url = _url("/sketches", queryParams);
      const headers = _Headers("GET");
      const response = await fetch(url, headers);
      const result = await response.json();
      if (response.status !== 200) {
        return 0;
      };
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Actualizar  discurso
  async updateSketch(id, data) {
    const queryParams = {
      id: id,
      nameId: "id_sketch",
      token: "no",
      table: "speakers",
      suffix: "speaker",
      except: "num_sketch",
    };
    try {
      const url = _url("/sketches", queryParams);
      const headers = _Headers("PUT", data);
      const response = await fetch(url, headers);
      const result = await response.json();
      //   console.log(response);
      // console.log(result);
      if (response.status !== 200) {
        return 0;
      };
      return result;
    } catch (error) {
      throw error;
    }
  }

  // eliminar  discurso
  async deleteSketch(id) {
    const queryParams = {
      token: "no",
      table: "speakers",
      suffix: "speaker",
      except: "cod_sketch",
      id: id,
      nameId: "id_sketch",
    };
    try {
      const url = _url("/sketches", queryParams);
      const headers = _Headers("DELETE");
      const response = await fetch(url, headers);
      const result = await response.json();
      //   console.log(response);
      // console.log(result);
      if (response.status !== 200) {
        return 0;
      };
      return result;
    } catch (error) {
      throw error;
    }
  }
}
