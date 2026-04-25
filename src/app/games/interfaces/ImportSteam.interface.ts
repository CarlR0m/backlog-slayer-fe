/**
 * Respuesta de autenticación de Steam
 * @property {string} url - Url para iniciar sesión en Steam
 */
export interface SteamAuthResponse {
  url: string;
}

/**
 * @interface SteamSyncResponse
 * @description Respuesta de la sincronización
 * @property {string} message - Mensaje de estado de la sincronización
 * @property {SyncStats} stats - Estadísticas de la sincronización
 */
export interface SteamSyncResponse {
  message: string;
  stats: SyncStats;
}

/**
 * @interface SyncStats
 * @description Estadísticas de sincronización
 * @property {number} total_steam_games - Número total de juegos en Steam
 * @property {number} new_games_added - Número de juegos nuevos añadidos
 * @property {number} playtime_updated - Número de horas de juego actualizadas
 * @property {number} metadata_pending_jobs - Numero de juegos en cola
 */
export interface SyncStats {
  total_steam_games: number;
  new_games_added: number;
  playtime_updated: number;
  metadata_pending_jobs: number;
}
