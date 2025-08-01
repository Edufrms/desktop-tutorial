/**
 * CARGADOR DE GEOJSON PARA BÉLGICA - Comextoolbox Dashboard
 * 
 * Este script carga y estiliza específicamente la silueta de Bélgica
 * con un estilo sutil y no invasivo para el dashboard de leads.
 */

// ========================================
// CONFIGURACIÓN DE ESTILOS PARA BÉLGICA
// ========================================
const BELGIUM_STYLE = {
  // Sin trazo visible para evitar distracciones
  stroke: false,
  // Alternativa: trazo muy sutil si prefieres un contorno
  // stroke: true,
  // color: 'rgba(42, 157, 143, 0.3)',
  // weight: 1,
  
  // Relleno muy ligero con el color corporativo
  fillColor: '#2A9D8F',
  fillOpacity: 0.08,  // Muy transparente para no interferir
  
  // Configuración adicional para mejor rendimiento
  clickTolerance: 3,
  smoothFactor: 1
};

// ========================================
// FUNCIÓN PRINCIPAL DE CARGA DE GEOJSON
// ========================================
function loadBelgiumGeoJSON(mapInstance) {
  console.log('🔄 Cargando GeoJSON de Bélgica...');
  
  // 1. CARGAR EL ARCHIVO GEOJSON
  fetch('/custom.geo.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(geojson => {
      console.log('✅ GeoJSON cargado exitosamente');
      
      // 2. FILTRAR SOLO BÉLGICA
      const belgiumFeatures = geojson.features.filter(feature => {
        // Múltiples criterios de filtrado para mayor robustez
        const properties = feature.properties || {};
        
        // Criterio 1: Por código de país
        if (properties.country === 'BEL') return true;
        
        // Criterio 2: Por nombre
        if (properties.name === 'Belgium') return true;
        
        // Criterio 3: Por código ISO
        if (properties.ISO_A2 === 'BE') return true;
        if (properties.ISO_A3 === 'BEL') return true;
        
        // Criterio 4: Por nombre administrativo
        if (properties.ADMIN === 'Belgium') return true;
        
        // Si no coincide con ningún criterio, no mostrar
        return false;
      });
      
      console.log(`🎯 Encontradas ${belgiumFeatures.length} features de Bélgica`);
      
      // 3. CREAR COLECCIÓN FILTRADA
      const belgiumGeoJSON = {
        type: 'FeatureCollection',
        features: belgiumFeatures
      };
      
      // 4. APLICAR ESTILOS Y AÑADIR AL MAPA
      if (belgiumFeatures.length > 0) {
        const belgiumLayer = L.geoJSON(belgiumGeoJSON, {
          style: BELGIUM_STYLE,
          
          // Función de estilo adicional para mayor control
          style: function(feature) {
            return {
              ...BELGIUM_STYLE,
              // Puedes añadir lógica adicional aquí si es necesario
            };
          },
          
          // Eventos opcionales para interactividad
          onEachFeature: function(feature, layer) {
            // Añadir tooltip sutil al hacer hover
            layer.bindTooltip('Bélgica', {
              permanent: false,
              direction: 'top',
              className: 'belgium-tooltip'
            });
            
            // Opcional: hacer clic para información
            layer.on('click', function() {
              console.log('🗺️ Clic en Bélgica:', feature.properties);
            });
          }
        });
        
        // 5. AÑADIR LA CAPA AL MAPA
        belgiumLayer.addTo(mapInstance);
        console.log('✅ Silueta de Bélgica añadida al mapa');
        
        // 6. RETORNAR LA REFERENCIA PARA CONTROL FUTURO
        return belgiumLayer;
        
      } else {
        console.warn('⚠️ No se encontraron features de Bélgica en el GeoJSON');
      }
    })
    .catch(error => {
      console.error('❌ Error cargando GeoJSON de Bélgica:', error);
      
      // Fallback: mostrar mensaje de error en el mapa
      L.popup()
        .setLatLng([50.85, 4.35])
        .setContent('<strong>Error</strong><br>No se pudo cargar la silueta de Bélgica')
        .openOn(mapInstance);
    });
}

// ========================================
// FUNCIÓN DE LIMPIEZA (OPCIONAL)
// ========================================
function removeBelgiumGeoJSON(mapInstance, layerReference) {
  if (layerReference && mapInstance) {
    mapInstance.removeLayer(layerReference);
    console.log('🗑️ Capa de Bélgica removida del mapa');
  }
}

// ========================================
// EJEMPLO DE USO EN HTML INDEPENDIENTE
// ========================================
/*
// Si usas este script en un HTML independiente:
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar mapa
  const map = L.map('map').setView([50.85, 4.35], 7);
  
  // Añadir tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  
  // Cargar Bélgica con el estilo mejorado
  loadBelgiumGeoJSON(map);
});
*/

// ========================================
// EXPORTAR PARA USO EN MÓDULOS
// ========================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { loadBelgiumGeoJSON, removeBelgiumGeoJSON, BELGIUM_STYLE };
} 