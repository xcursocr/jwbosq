import { _url, _Headers } from "../helpers";

export class ctrlAssignment {
  // Contar cuantas veces se ha dado un discurso
  async filterByDate(date1, date2, filter1, filter2) {
    /* 
    esta seria la consulta idonea donde hago 2 filtros tanto de id_discurso como id_congregacion
    
    SELECT count(*) FROM assignments  WHERE (
    date_created_assignment BETWEEN '2024-01-01'
    AND '2024-12-31' AND  id_sketche_assignment = 1 
    AND id_congregation_assignment = 1)

    
    */
    const queryParams = {
      linkTo: "date_assignment",
      between1: date1,
      between2: date2,
      select: "*",
      filterTo: "id_sketche_assignment,id_congregation_assignment",
      inTo: `${filter1},${filter2}`,
    };
    try {
      const url = _url("/assignments", queryParams);
      const headers = _Headers("GET");
      const response = await fetch(url, headers);
      const result = await response.json();
      if (response.status !== 200) {
        return 0;
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  // traer la lista de los discursos asignados a discursar, desde la fecha actual en adelante
  async getCountAssignations() {
    const queryParams = {
      select: "id_assignment",
    };
    try {
      const url = _url("/assignments", queryParams);
      const headers = _Headers("GET");
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
  // traer la lista de los discursos asignados a discursar, desde la fecha actual en adelante
  async getAssignations() {
    const queryParams = {
      rel: "assignments,speakers",
      type: "assignment,speaker",
      select: "*",
    };
    try {
      const url = _url("/relations", queryParams);
      const headers = _Headers("GET");
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
  // traer la lista de los discursos asignados pero con mi customSQL editada desde mi API
  async getAssignationsSqlRepetidos(date1, date2, id_congregacion) {
    const queryParams = {
      // sql: `SELECT assignments.id_assignment,assignments.id_speaker_assignment,assignments.id_congregation_assignment, assignments.id_sketche_assignment,assignments.date_assignment,speakers.name_speaker,speakers.phone_speaker,sketches.num_sketch,sketches.cod_sketch,sketches.topic_sketche,congregations.name_congregation FROM assignments INNER JOIN sketches ON assignments.id_sketche_assignment = sketches.id_sketch INNER JOIN speakers ON assignments.id_speaker_assignment = speakers.id_speaker INNER JOIN congregations ON assignments.id_congregation_assignment = congregations.id_congregation WHERE assignments.id_congregation_assignment = ${id_congregacion}`,
      sql: `SELECT sketches.id_sketch, sketches.topic_sketche AS sketch_name, sketches.cod_sketch AS codSketch,  COUNT(assignments.id_sketche_assignment) AS times_assigned FROM assignments INNER JOIN sketches ON assignments.id_sketche_assignment = sketches.id_sketch INNER JOIN congregations ON assignments.id_congregation_assignment = congregations.id_congregation WHERE assignments.date_assignment BETWEEN '${date1}' AND '${date2}' AND assignments.id_congregation_assignment = ${id_congregacion} GROUP BY sketches.id_sketch, sketches.topic_sketche ORDER BY times_assigned DESC`,
    };

    try {
      const url = _url("/query", queryParams);
      const headers = _Headers("GET");
      const response = await fetch(url, headers);
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }
  // traer la lista de los 5 ultimos discursos pendientes de dar
  async getAssignationLastesFive() {
    const queryParams = {
      // sql: `SELECT assignments.id_assignment,assignments.id_speaker_assignment,assignments.id_congregation_assignment, assignments.id_sketche_assignment,assignments.date_assignment,speakers.name_speaker,speakers.phone_speaker,sketches.num_sketch,sketches.cod_sketch,sketches.topic_sketche,congregations.name_congregation FROM assignments INNER JOIN sketches ON assignments.id_sketche_assignment = sketches.id_sketch INNER JOIN speakers ON assignments.id_speaker_assignment = speakers.id_speaker INNER JOIN congregations ON assignments.id_congregation_assignment = congregations.id_congregation WHERE assignments.id_congregation_assignment = ${id_congregacion}`,
      sql: `SELECT congregations.name_congregation, sketches.id_sketch, sketches.topic_sketche AS sketch_name, sketches.cod_sketch AS codSketch, assignments.date_assignment AS assignment_date, speakers.name_speaker AS nameSpeaker, COUNT(assignments.id_sketche_assignment) AS times_assigned FROM assignments INNER JOIN congregations ON assignments.id_congregation_assignment = congregations.id_congregation INNER JOIN sketches ON assignments.id_sketche_assignment = sketches.id_sketch INNER JOIN speakers ON assignments.id_speaker_assignment = speakers.id_speaker WHERE assignments.date_assignment > CURRENT_DATE GROUP BY congregations.name_congregation, sketches.id_sketch, sketches.topic_sketche, sketches.cod_sketch, assignments.date_assignment ORDER BY assignments.date_assignment ASC LIMIT 5`,
    };

    try {
      const url = _url("/query", queryParams);
      const headers = _Headers("GET");
      const response = await fetch(url, headers);
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }
  // traer la lista de los discursos asignados pero con mi customSQL editada desde mi API
  async getAssignationsSql() {
    const queryParams = {
      sql: "SELECT assignments.id_assignment,assignments.id_speaker_assignment,assignments.id_congregation_assignment, assignments.id_sketche_assignment,assignments.date_assignment,speakers.name_speaker,speakers.phone_speaker,sketches.num_sketch,sketches.cod_sketch,sketches.topic_sketche,congregations.name_congregation FROM assignments INNER JOIN sketches ON assignments.id_sketche_assignment = sketches.id_sketch INNER JOIN speakers ON assignments.id_speaker_assignment = speakers.id_speaker INNER JOIN congregations ON assignments.id_congregation_assignment = congregations.id_congregation",
    };
    try {
      const url = _url("/query", queryParams);
      const headers = _Headers("GET");
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

  // traer el detalle de una assignment
  async getAssignationOne(id) {
    const queryParams = {
      select: "*",
      linkTo: "id_assignment",
      equalTo: id,
    };
    try {
      const url = _url("/assignments", queryParams);
      const headers = _Headers("GET");
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

  // Guardar asignacion de discurso
  async saveAssignment(data) {
    const queryParams = {
      token: "no",
      table: "speakers",
      suffix: "speaker",
      except: "id_speaker_assignment",
    };
    try {
      const url = _url("/assignments", queryParams);
      const headers = _Headers("POST", data);
      const response = await fetch(url, headers);
      const result = await response.json();
      //   console.log(response);
      // console.log(result);
      if (response.status !== 200) {
        return 0;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Actualizar asignacion de discurso
  async updateAssignment(id, data) {
    const queryParams = {
      id: id,
      nameId: "id_assignment",
      token: "no",
      table: "speakers",
      suffix: "speaker",
      except: "id_speaker_assignment",
    };
    try {
      const url = _url("/assignments", queryParams);
      const headers = _Headers("PUT", data);
      const response = await fetch(url, headers);
      const result = await response.json();
      //   console.log(response);
      // console.log(result);
      if (response.status !== 200) {
        return 0;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
}
