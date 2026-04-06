import { FormGroup, ValidationErrors } from '@angular/forms';

export const getFieldErrorMsg = (form: FormGroup, field: string): string => {
  const control = form.get(field);

  if (!control || !control.errors || !control.touched) return '';

  const errors = control.errors;
  const firstKey = Object.keys(errors)[0];

  switch (firstKey) {
    case 'required':
      return 'Este campo es obligatorio.';
    case 'email':
      return 'El formato del correo electrónico no es válido.';
    case 'minlength':
      return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
    case 'passwordsNotEquals':
      return 'Las contraseñas no coinciden.';
    case 'backend':
      return errors['backend'];

    default: return 'Campo inválido.';
  }
};

export const setServerErrors = (form: FormGroup, serverErrorResponses: any) => {
  if (!serverErrorResponses || !serverErrorResponses.errors) return;

  const errorsBackend = serverErrorResponses.errors;
  Object.keys(errorsBackend).forEach(field => {
    const control = form.get(field);
    if (control) {
      control.setErrors({ backend: errorsBackend[field][0] });
    }
  });
};

export const SERVER_ERROR_MESSAGE = 'Error de servidor o conexión. Por favor, prueba en otro momento.';

export const getApiErrorMsg = (error: any): string => {
  if (error.status === 0 || error.status >= 500 || error?.error?.exception) {
    return SERVER_ERROR_MESSAGE;
  }
  return error?.error?.message || 'Algo salió mal. Por favor, inténtalo de nuevo.';
};

export const handleFormError = (form: FormGroup, error: any): string | null => {
  if (error.status === 422) {
    setServerErrors(form, error.error);
    return null;
  }
  return getApiErrorMsg(error);
};
