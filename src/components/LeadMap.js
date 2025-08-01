import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster';

// Importar iconos de Leaflet (necesario para que funcionen los marcadores)
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Configurar iconos por defecto de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

// Iconos personalizados para cada tipo de lead
const createCustomIcon = (type) => {
  const colors = {
    feria: '#E9C46A',
    importador: '#F4A261',
    distribuidor: '#E76F51',
    ice: '#2A9D8F'
  };

  return L.divIcon({
    html: `<div style="
      background-color: ${colors[type]};
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    className: 'custom-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

const LeadMap = ({ leads }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const geoJsonLayerRef = useRef(null);
  const markerClusterGroupRef = useRef(null);

  useEffect(() => {
    // Inicializar el mapa solo una vez
    if (!mapInstanceRef.current) {
      // Crear instancia del mapa centrada en Bélgica
      mapInstanceRef.current = L.map(mapRef.current).setView([50.85, 4.35], 7);

      // Añadir capa de tiles de OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstanceRef.current);

            // Coordenadas precisas de Bélgica (sin Luxemburgo)
      const belgiumCoordinates = [
        [51.505, 2.544],  // Costa este (Knokke-Heist)
        [51.505, 5.607],  // Norte (frontera con Holanda)
        [50.501, 5.758],  // Este (frontera con Alemania)
        [50.128, 5.607],  // Centro-este (Namur)
        [49.576, 5.782],  // Sur (frontera con Francia)
        [49.443, 5.897],  // Suroeste (frontera con Francia)
        [49.529, 5.674],  // Centro-sur
        [50.128, 5.607],  // Centro (Namur)
        [51.037, 5.607],  // Centro-norte (Hasselt)
        [51.475, 4.973],  // Noroeste (Amberes)
        [51.620, 3.830],  // Oeste (Gante)
        [51.345, 3.314],  // Noroeste (Brujas)
        [51.148, 2.544]   // Costa (cierre)
      ];
      
      // Crear un polígono simple de Bélgica
      const belgiumPolygon = L.polygon(belgiumCoordinates, {
        // Sin trazo visible para evitar distracciones
        stroke: false,
        // Relleno muy ligero con el color corporativo
        fillColor: '#2A9D8F',
        fillOpacity: 0.08,  // Muy transparente para no interferir
        // Configuración adicional para mejor rendimiento
        clickTolerance: 3,
        smoothFactor: 1
      }).addTo(mapInstanceRef.current);
      
      // Añadir tooltip sutil al hacer hover
      belgiumPolygon.bindTooltip('Bélgica', {
        permanent: false,
        direction: 'top',
        className: 'belgium-tooltip'
      });
      
      // Opcional: hacer clic para información
      belgiumPolygon.on('click', function() {
        console.log('🗺️ Clic en Bélgica');
      });
      
      console.log('✅ Silueta de Bélgica añadida al mapa con estilo sutil');
      
      // Guardar referencia para control futuro
      geoJsonLayerRef.current = belgiumPolygon;

      // Crear grupo de clusters para los marcadores
      markerClusterGroupRef.current = L.markerClusterGroup({
        chunkedLoading: true,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        maxClusterRadius: 50,
        iconCreateFunction: function(cluster) {
          const count = cluster.getChildCount();
          let className = 'marker-cluster-';
          
          if (count < 5) {
            className += 'small';
          } else if (count < 10) {
            className += 'medium';
          } else {
            className += 'large';
          }

          return L.divIcon({
            html: `<div><span>${count}</span></div>`,
            className: `marker-cluster ${className}`,
            iconSize: L.point(40, 40)
          });
        }
      });

      mapInstanceRef.current.addLayer(markerClusterGroupRef.current);
    }

    // Limpiar marcadores existentes
    if (markerClusterGroupRef.current) {
      markerClusterGroupRef.current.clearLayers();
    }

    // Añadir nuevos marcadores basados en los leads filtrados
    leads.forEach(lead => {
      const marker = L.marker([lead.lat, lead.lon], {
        icon: createCustomIcon(lead.type)
      });

      // Crear contenido del popup personalizado
      const popupContent = `
        <div class="custom-popup">
          <h3>${lead.name}</h3>
          <span class="lead-type ${lead.type}">${lead.type}</span>
          <p><strong>Sector:</strong> ${lead.sector}</p>
          <p>${lead.description}</p>
          <a href="${lead.link}" target="_blank" rel="noopener noreferrer">
            Ver más información →
          </a>
        </div>
      `;

      marker.bindPopup(popupContent);
      markerClusterGroupRef.current.addLayer(marker);
    });

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [leads]); // Re-ejecutar cuando cambien los leads

  return (
    <div 
      ref={mapRef} 
      style={{ 
        height: '100%', 
        width: '100%',
        zIndex: 1
      }} 
    />
  );
};

export default LeadMap; 