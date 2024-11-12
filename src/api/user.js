import { _url, _Headers } from "../helpers";

export class Users {
  // user logeado
  async getMe(accessToken) {
    const queryParams = {
      select: "*",
      linkTo: "token_speaker",
      equalTo: accessToken,
    };
    try {
      const url = _url("/speakers", queryParams);
      // https://apinw.domcloud.dev/admins?register=true&suffix=admin
      const headers = _Headers("GET");
      const response = await fetch(url, headers);
      const result = await response.json();
      //   console.log(response);
      //   console.log(result);
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }
  // create user
  async createUser(data) {
    const queryParams = {
      register: "true",
      suffix: "admin",
    };
    try {
      const url = _url("/admins", queryParams);
      const headers = _Headers("POST", data);
      const response = await fetch(url, headers);
      const result = await response.json();
      //   console.log(response);
      //   console.log(result);
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }
  // All users
  async getUsers(active = undefined) {
    const queryParams = {
      select: "*",
      linkTo: "active_admin",
      equalTo: active,
    };
    try {
      const url = _url("/admins", queryParams);
      const headers = _Headers("GET");
      const response = await fetch(url, headers);
      const result = await response.json();
      //   console.log(response);
      //   console.log(result);
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  // update user
  async updateUser(accessToken, _id, data) {
    const queryParams = {
      id: _id,
      nameId: "id_admin",
      token: accessToken,
      table: "admins",
      suffix: "admin",
    };
    try {
      const url = _url("/admins", queryParams);
      const headers = _Headers("PUT", data);
      const response = await fetch(url, headers);
      const result = await response.json();
      //   console.log(response);
      //   console.log(result);
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }
}
