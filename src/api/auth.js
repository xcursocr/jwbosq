import { _url, _Headers, ENV } from "../helpers";
export class Auth {
  async register(data) {
    const queryParams = {
      register: "true",
      suffix: "speaker",
    };
    try {
      const url = _url("/speakers", queryParams);
      // https://apinw.domcloud.dev/admins?register=true&suffix=admin
      const headers = _Headers("POST", data);
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
  async login(data) {
    const queryParams = {
      login: "true",
      suffix: "speaker",
    };
    try {
      const url = _url("/speakers", queryParams);
      // https://apinw.domcloud.dev/admins?login=true&suffix=admin
      const headers = _Headers("POST", data);
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

  setAccessToken(token) {
    localStorage.setItem(ENV.JWT.ACCESS, token);
  }
  getAcessToken() {
    return localStorage.getItem(ENV.JWT.ACCESS);
  }
  setRefreshToken(token) {
    localStorage.setItem(ENV.JWT.REFRESH, token);
  }
  getRefreshToken() {
    return localStorage.getItem(ENV.JWT.REFRESH);
  }

  removeToken() {
    localStorage.removeItem(ENV.JWT.ACCESS);
    localStorage.removeItem(ENV.JWT.REFRESH);
  }
}
