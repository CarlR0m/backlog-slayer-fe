/**
 * @interface UserResponse
 * @description Interfaz para la respuesta del login y verificación del token
 * @property {string} message - Mensaje de la respuesta
 * @property {string} access_token - Token JWT
 * @property {User} user - Usuario autenticado
 */
export interface UserResponse {
  message:      string;
  access_token: string;
  user:         User;
}

/**
 * @interface User
 * @description Datos del usuario autenticado
 * @property {number} id - ID del usuario
 * @property {string} username - Nombre de usuario
 * @property {string} email - Correo electrónico
 * @property {string} [steam_id] - ID de Steam
 * @property {string} [role] - Rol del usuario
 */
export interface User {
  id:        number;
  username:  string;
  email:     string;
  steam_id?: string;
  role?:     string;
}

