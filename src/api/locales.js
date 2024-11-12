import { _url, _Headers } from "../helpers";

export class ctrDiscLocales {

  async getDiscursosLocales(id) {
    const queryParams = {
      rel: "sketches,speakers",
      type: "sketche,speaker",
      select: "*",
      linkTo: "id_speaker",
      equalTo: id,
    };
    try {
      const url = _url("/relations", queryParams);
      const headers = _Headers("GET");
      const response = await fetch(url, headers);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }


}
