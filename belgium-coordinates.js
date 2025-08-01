/**
 * COORDENADAS PRECISAS DE BÉLGICA
 * 
 * Este archivo contiene las coordenadas reales de los límites de Bélgica
 * para crear un polígono preciso en Leaflet.
 */

// Coordenadas precisas de los límites de Bélgica
// Basadas en puntos clave de la frontera belga (sin Luxemburgo)
const BELGIUM_BOUNDARIES = [
  // Costa del Mar del Norte (de oeste a este)
  [51.148, 2.544],  // Knokke-Heist (costa este)
  [51.185, 2.801],  // Ostende
  [51.345, 3.314],  // Brujas
  [51.620, 3.830],  // Gante
  [51.475, 4.973],  // Amberes
  
  // Frontera norte con Holanda
  [51.505, 5.607],  // Norte de Amberes
  [51.037, 5.607],  // Hasselt
  
  // Frontera este con Alemania
  [50.501, 5.758],  // Lieja
  [50.128, 5.607],  // Namur
  
  // Frontera sur con Francia
  [49.576, 5.782],  // Sur de Bélgica
  [49.529, 5.674],  // Suroeste
  [49.443, 5.897],  // Oeste
  
  // Regreso al punto de inicio
  [49.529, 5.674],  // Suroeste
  [50.128, 5.607],  // Centro
  [50.501, 5.758],  // Este
  [51.037, 5.607],  // Norte
  [51.475, 4.973],  // Noroeste
  [51.620, 3.830],  // Oeste
  [51.345, 3.314],  // Noroeste
  [51.185, 2.801],  // Oeste
  [51.148, 2.544]   // Costa (punto de inicio)
];

// Coordenadas simplificadas para mejor rendimiento (solo Bélgica)
const BELGIUM_SIMPLIFIED = [
  [51.505, 2.544],  // Costa este
  [51.505, 5.607],  // Norte
  [50.501, 5.758],  // Este
  [50.128, 5.607],  // Centro-este
  [49.576, 5.782],  // Sur
  [49.443, 5.897],  // Suroeste
  [49.529, 5.674],  // Centro-sur
  [50.128, 5.607],  // Centro
  [51.037, 5.607],  // Centro-norte
  [51.475, 4.973],  // Noroeste
  [51.620, 3.830],  // Oeste
  [51.345, 3.314],  // Noroeste
  [51.148, 2.544]   // Costa (cierre)
];

// Estilo corporativo para Bélgica
const BELGIUM_STYLE = {
  stroke: false,                    // Sin trazo visible
  fillColor: '#2A9D8F',            // Color corporativo
  fillOpacity: 0.08,               // Muy transparente
  clickTolerance: 3,
  smoothFactor: 1
};

// Función para crear el polígono de Bélgica
function createBelgiumPolygon(mapInstance, useDetailed = false) {
  const coordinates = useDetailed ? BELGIUM_BOUNDARIES : BELGIUM_SIMPLIFIED;
  
  const belgiumPolygon = L.polygon(coordinates, BELGIUM_STYLE);
  
  // Añadir tooltip
  belgiumPolygon.bindTooltip('Bélgica', {
    permanent: false,
    direction: 'top',
    className: 'belgium-tooltip'
  });
  
  // Añadir al mapa
  belgiumPolygon.addTo(mapInstance);
  
  return belgiumPolygon;
}

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    BELGIUM_BOUNDARIES,
    BELGIUM_SIMPLIFIED,
    BELGIUM_STYLE,
    createBelgiumPolygon
  };
} 