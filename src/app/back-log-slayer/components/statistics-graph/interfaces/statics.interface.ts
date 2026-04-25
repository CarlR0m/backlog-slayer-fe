/**
 * @interface Statistics
 * @description Estructura de datos para el gráfico de estadísticas
 * @property {string[]} labels - Etiquetas de cada sección del gráfico
 * @property {Dataset[]} datasets - Conjuntos de datos a representar en el gráfico
 */
export interface Statistics{
  labels: string[];
  datasets: Dataset[];
}

/**
 * @interface Dataset
 * @description Datos del gráfico
 * @property {string} label - Nombre del conjunto de datos
 * @property {number[]} data - Valores numéricos de cada segmento
 * @property {string[]} backgroundColor - Colores de cada segmento
 * @property {number} hoverOffset - Desplazamiento del segmento al pasar el cursor por encima
 */
export interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string[];
  hoverOffset: number;
}
