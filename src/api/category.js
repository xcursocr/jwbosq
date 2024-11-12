import { _url, _Headers } from "../helpers";

export class ctrlCategory {
  async getCategories() {
    const queryParams = {
      select: "*",
    };
    try {
      const url = _url("/categories", queryParams);
      const headers = _Headers("GET");
      const response = await fetch(url, headers);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async saveCategory(data) {
    const queryParams = {
      token: "no",
      table: "speakers",
      suffix: "speaker",
      except: "name_category",
    };
    try {
      const url = _url("/categories", queryParams);
      const headers = _Headers("POST", data);
      const response = await fetch(url, headers);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getCategory(id) {
    const queryParams = {
      select: "*",
      linkTo: "id_category",
      equalTo: id,
    };
    try {
      const url = _url("/categories", queryParams);
      const headers = _Headers("GET");
      const response = await fetch(url, headers);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateCategory(id, data) {
    const queryParams = {
      id: id,
      nameId: "id_category",
      token: "no",
      table: "speakers",
      suffix: "speaker",
      except: "name_category",
    };
    try {
      const url = _url("/categories", queryParams);
      const headers = _Headers("PUT", data);
      const response = await fetch(url, headers);
      const result = await response.json();
      //   console.log(response);
      // console.log(result);
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(id) {
    const queryParams = {
      id: id,
      nameId: "id_category",
      token: "no",
      table: "speakers",
      suffix: "speaker",
      except: "name_category",
    };
    try {
      const url = _url("/categories", queryParams);
      const headers = _Headers("DELETE");
      const response = await fetch(url, headers);
      const result = await response.json();
      //   console.log(response);
      // console.log(result);
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }
}
