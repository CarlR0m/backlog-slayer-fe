/**
 * @interface Game
 * @description Información de un juego
 * @property {number} id - ID del juego
 * @property {string} title - Título
 * @property {string} img - URL de la imagen
 * @property {string} description - Descripción
 * @property {GameTag[]} genders - Géneros
 * @property {string} score - Puntuación media
 * @property {GamePlatform[]} platforms - Plataformas
 * @property {string} tiempojugado - Tiempo jugado
 * @property {StoreLink} links - Enlace a la tienda
 */
export interface Game {
  id: number;
  title: string;
  img: string;
  description: string;
  genders: GameTag[];
  score: string;
  platforms: GamePlatform[];
  tiempojugado: string;
  links: StoreLink;
}

/**
 * @interface GameTag
 * @description Etiqueta de un juego
 * @property {number} id - ID de la etiqueta
 * @property {string} name - Nombre de la etiqueta
 */
export interface GameTag {
  id: number;
  name: string;
}

/**
 * @interface GamePlatform
 * @description Plataforma de un juego
 * @property {number} id - ID de la plataforma
 * @property {string} name - Nombre de la plataforma
 */
export interface GamePlatform {
  id: number;
  name: string;
}

/**
 * @interface StoreLink
 * @description Enlace de compra del juego en una tienda
 * @property {string} store - URL de la tienda
 */
export interface StoreLink {
  store: string;
}

/**
 * @interface UserGame
 * @description Juego de un usuario, incluyendo datos de progreso
 * @property {number} id - ID del juego
 * @property {number} steam_app_id - ID de Steam
 * @property {string} title - Título
 * @property {string} cover_image_url - URL de la imagen
 * @property {string | null} [short_description] - Descripción
 * @property {number | null} [estimated_duration] - Duración
 * @property {GamePivot} pivot - Datos relacionados con el usuario y un juego
 */
export interface UserGame {
  id: number;
  steam_app_id: number;
  title: string;
  cover_image_url: string;
  short_description?: string | null;
  estimated_duration?: number | null;
  pivot: GamePivot;
}

/**
 * @interface GamePivot
 * @description Relacion entre un usuario y un juego
 * @property {number} id - ID del juego
 * @property {'backlog' | 'playing' | 'completed' | 'dropped'} status - Estado del juego
 * @property {number} playtime_forever - Tiempo total jugado en minutos
 * @property {number} priority_score - Puntuación de prioridad
 * @property {number | null} user_rating - Valoración del usuario
 * @property {string} created_at - Fecha de creación
 * @property {string} updated_at - Fecha de actualización
 */
export interface GamePivot {
  id: number;
  status: 'backlog' | 'playing' | 'completed' | 'dropped';
  playtime_forever: number;
  priority_score: number;
  user_rating: number | null;
  created_at: string;
  updated_at: string;
}

/**
 * @interface Tag
 * @description Etiqueta de un juego
 * @property {number} id - ID de la etiqueta
 * @property {string} name - Nombre de la etiqueta
 */
export interface Tag {
  id: number;
  name: string;
}

/**
 * @interface TopGame
 * @description Juego más jugado del usuario
 * @property {number} id - ID del juego
 * @property {string} title - Título
 * @property {string} img - URL de la imagen
 * @property {number} playtime - Tiempo jugado
 */
export interface TopGame {
  id: number;
  title: string;
  img: string;
  playtime: number;
}

/**
 * @interface GameSummary
 * @description Resumen de actividad de juego del usuario
 * @property {TopGame | null} topGame - Juego más jugado del usuario
 * @property {never[]} recentHistory - Historial reciente de recomendaciones
 */
export interface GameSummary {
  topGame: TopGame | null;
  recentHistory: never[];
}

/**
 * @interface PaginatedGames
 * @description Respuesta paginada del los juegos de la base de datos
 * @property {Game[]} data - Lista de juegos de la página actual
 * @property {number} current_page - Página actual
 * @property {number} last_page - Última página disponible
 * @property {number} per_page - Resultados por página
 * @property {number} total - Total de juegos en la BD
 */
export interface PaginatedGames {
  data: Game[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ProfileGame {
  id: number;
  title: string;
  img: string;
}

export interface ProfileTopGame extends ProfileGame {
  playtime: number; // minutos totales jugados
}

export interface UserProfile {
  user: {
    id: number;
    username: string;
    steam_id: string | null;
  };
  tags: { id: number; name: string }[];
  topGame: ProfileTopGame | null;
  recentGames: ProfileGame[];
  totalPlaytime: number; // minutos totales de toda la biblioteca
  statistics: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      hoverOffset: number;
    }[];
  };
}
