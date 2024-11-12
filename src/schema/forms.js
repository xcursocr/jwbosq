export const validationRulesEdit = {
  id_speaker_assignment: {
    label: "Nombre del discursante",
    required: true,
    minLength: 1,
  },

  id_congregation_assignment: {
    label: "Nombre de la congregacion",
    required: true,
    minLength: 1,
  },

  id_sketche_assignment: {
    label: "Tema del discurso",
    required: true,
    minLength: 1,
  },

  date_assignment: {
    label: "Fecha del discurso",
    required: true,
    minLength: 2,
  },
};

// Validar Sketch
export const validateSketch = {
  // propiedades de validaciones
  num_sketch: {
    label: "Numero del discurso",
    required: true,
    minLength: 1,
    number: true,
  },

  cod_sketch: {
    label: "Referencia de la discurso",
    required: true,
    minLength: 1,
  },

  id_category_sketche: {
    label: "Categoria del discurso",
    required: true,
  },

  topic_sketche: {
    label: "Tema del discurso",
    required: true,
    minLength: 5,
  },

  update_sketch: {
    label: "Actualización del discurso",
    isChecked: false, // true || false
  },
};
