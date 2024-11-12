export const validateFields = (formData, validationRules) => {
  const errors = {};

  for (const field in validationRules) {
    const rules = validationRules[field];
    const value = formData[field];

    // Validación requerida
    if (rules.required && !value) {
      errors[field] = `${rules.label} es obligatorio.`;
      continue;
    }

    // Validación de números (ya estaba en tu código)
    if (rules.number && /[^0-9 ]/.test(value)) {
      errors[field] = `${rules.label} no es válido.`;
    }

    // Validación de longitud mínima
    if (rules.minLength && value.length < rules.minLength) {
      errors[
        field
      ] = `${rules.label} debe tener al menos ${rules.minLength} caracteres.`;
    }

    // Validación de correo electrónico
    if (rules.isEmail && value && !/\S+@\S+\.\S+/.test(value)) {
      errors[field] = `${rules.label} no es válido.`;
    }

    // Validación de rango (para números)
    if (rules.range && value) {
      const { min, max } = rules.range;
      if (value < min || value > max) {
        errors[field] = `${rules.label} debe estar entre ${min} y ${max}.`;
      }
    }

    if (rules.isChecked && !value) {
      errors[field] = `${rules.label} debe ser aceptado.`;
    }
  }

  return errors;
};

/* 
Ejemplo de Uso
Puedes definir las reglas de validación y usar la función de esta manera:
*/

/*
const formData = {
    userName: "A",
    userEmail: "invalidEmail",
    userPassword: "12345",
    userAge: 150,
};

const validationRules = {
    userName: {
        label: "Nombre de usuario",
        required: true,
        minLength: 2,
    },
    userEmail: {
        label: "Correo electrónico",
        required: true,
        isEmail: true,
    },
    codePhone: {
        label: "Código del teléfono",
        required: true,
        number: true,
    },
    userPassword: {
        label: "Contraseña",
        required: true,
        minLength: 6,
    },
    userAge: {
        label: "Edad",
        range: { min: 0, max: 120 },
    },
};

const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateFields(formData, validationRules);
    
    if (Object.keys(errors).length > 0) {
        console.log("Errores:", errors);
        return; // Detiene el envío si hay errores
    }
    
    // Aquí puedes enviar formData a tu API
    console.log("Datos enviados:", formData);
};

*/
