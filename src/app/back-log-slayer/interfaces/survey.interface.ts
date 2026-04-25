import { GameTag, GamePlatform } from '../../games/interfaces/Game.interface';

/**
 * @interface RecommendedGame
 * @description Juego recomendado por el algoritmo de la encuesta
 * @property {number} id - ID del juego
 * @property {string} title - Título
 * @property {string} score - Puntuación calculada
 * @property {GamePlatform[]} platforms - Plataformas
 * @property {string} [img] - URL de la imagen
 * @property {string | null} [description] - Descripción
 * @property {GameTag[]} [genders] - Géneros
 * @property {string} [tiempojugado] - Tiempo jugado
 * @property {string} [image] - URL de la imagen
 */
export interface RecommendedGame {
  id: number;
  title: string;
  score: string;
  platforms: GamePlatform[];
  img?: string;
  description?: string | null;
  genders?: GameTag[];
  tiempojugado?: string;
  image?: string;
}

/**
 * @interface SurveyResponse
 * @description Respuesta con un juego principal y una lista de juegos secundarios
 * @property {RecommendedGame | null} mainRecommendation - Recomendación principal
 * @property {RecommendedGame[]} secondaryRecommendations - Recomendaciones secundarias
 */
export interface SurveyResponse {
  mainRecommendation: RecommendedGame | null;
  secondaryRecommendations: RecommendedGame[];
}
