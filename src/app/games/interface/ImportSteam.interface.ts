/**
 * Respuesta de autenticación de Steam
 * @property {string} url - Url de respuesta para iniciar sesion en steam
 */

export interface SteamAuthResponse {
  url: string;
}
export interface SteamSyncResponse {
  message: string;
  stats: SyncStats;
}
/**
 * Estadísticas de sincronización de Steam
 * @property {number} total_steam_games - Número total de juegos en Steam
 * @property {number} new_games_added - Número de juegos nuevos añadidos
 * @property {number} playtime_updated - Número de horas de juego actualizadas
 * @property {number} metadata_pending_jobs - Numero de juegos en cola para descargar etiquetas y descripciones en segundo plano.
 */
export interface SyncStats {
  total_steam_games: number;
  new_games_added: number;
  playtime_updated: number;
  metadata_pending_jobs: number;
}
