import { _url, _Headers } from "../helpers";

export class ctrSpeakers {
  async getSpeakers() {
    const queryParams = {
      select: "*",
    };
    try {
      const url = _url("/speakers", queryParams);
      const headers = _Headers("GET");
      const response = await fetch(url, headers);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }
  async getSpeakerByOrigen(origen) {
    //visitantes o locales
    const queryParams = {
      sql: `SELECT * FROM speakers WHERE local_speaker = ${origen}`,
    };
    try {
      const url = _url("/query", queryParams);
      const headers = _Headers("GET");
      const response = await fetch(url, headers);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getSpeakerOne(id) {
    const queryParams = {
      select: "*",
      linkTo: "id_speaker",
      equalTo: id,
    };
    try {
      const url = _url("/speakers", queryParams);
      const headers = _Headers("GET");
      const response = await fetch(url, headers);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getMe(accessToken) {
    const queryParams = {
      select: "*",
      linkTo: "token_speaker",
      equalTo: accessToken,
    };
    try {
      const url = _url("/speakers", queryParams);
      const headers = _Headers("GET");
      const response = await fetch(url, headers);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }


  async saveSpeaker(data) {
    const queryParams = {
      token: "no",
      table: "speakers",
      suffix: "speaker",
      except: "name_speaker",
    };
    try {
      const url = _url("/speakers", queryParams);
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

  async updateSpeaker(id, data) {
    const queryParams = {
      id: id,
      nameId: "id_speaker",
      token: "no",
      table: "speakers",
      suffix: "speaker",
      except: "name_speaker",
    };
    try {
      const url = _url("/speakers", queryParams);
      const headers = _Headers("PUT", data);
      const response = await fetch(url, headers);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteSpeaker(id) {
    const queryParams = {
      id: id,
      nameId: "id_speaker",
      token: "no",
      table: "speakers",
      suffix: "speaker",
      except: "name_speaker",
    };
    try {
      const url = _url("/speakers", queryParams);
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
