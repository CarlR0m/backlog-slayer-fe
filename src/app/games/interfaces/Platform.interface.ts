/**
 * @interface Platform
 * @description Plataforma de juegos disponible en la aplicación
 * @property {number} id - Identificador único de la plataforma
 * @property {string} name - Nombre de la plataforma
 * @property {boolean} is_active - Indica si la plataforma está activa y disponible para el usuario
 */
export interface Platform {
  id: number;
  name: string;
  is_active: boolean;
}

