import { _url, _Headers } from "../helpers";

export class ctrlCongregation {
  async getCongregations() {
    const queryParams = {
      select: "*",
    };
    try {
      const url = _url("/congregations", queryParams);
      const headers = _Headers("GET");
      const response = await fetch(url, headers);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getCongregationOne(id) {
    const queryParams = {
      select: "*",
      linkTo: "id_congregation",
      equalTo: id,
    };
    try {
      const url = _url("/congregations", queryParams);
      const headers = _Headers("GET");
      const response = await fetch(url, headers);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async saveCongregation(data) {
    const queryParams = {
      token: "no",
      table: "speakers",
      suffix: "speaker",
      except: "name_congregation",
    };
    try {
      const url = _url("/congregations", queryParams);
      const headers = _Headers("POST", data);
      const response = await fetch(url, headers);
      const result = await response.json();
      if (response.status !== 200) {
        return 0;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteCongregation(id) {
    const queryParams = {
      id: id,
      nameId: "id_congregation",
      token: "no",
      table: "speakers",
      suffix: "speaker",
      except: "name_congregation",
    };
    try {
      const url = _url("/congregations", queryParams);
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

  async updateCongregation(id, data) {
    const queryParams = {
      id: id,
      nameId: "id_congregation",
      token: "no",
      table: "speakers",
      suffix: "speaker",
      except: "name_congregation",
    };
    try {
      const url = _url("/congregations", queryParams);
      const headers = _Headers("PUT", data);
      const response = await fetch(url, headers);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }
}
