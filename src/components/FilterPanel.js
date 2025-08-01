import React from 'react';

const FilterPanel = ({ activeFilters, onFilterChange }) => {
  // Configuración de los tipos de filtros con sus etiquetas y colores
  const filterTypes = [
    {
      key: 'feria',
      label: 'Ferias',
      color: '#E9C46A',
      description: 'Eventos y ferias comerciales'
    },
    {
      key: 'importador',
      label: 'Importadores',
      color: '#F4A261',
      description: 'Empresas importadoras'
    },
    {
      key: 'distribuidor',
      label: 'Distribuidores',
      color: '#E76F51',
      description: 'Canales de distribución'
    },
    {
      key: 'ice',
      label: 'Oficinas ICE',
      color: '#2A9D8F',
      description: 'Oficinas comerciales ICE'
    }
  ];

  return (
    <div className="filters-container">
      <div className="filters-title">
        Filtrar por tipo de lead:
      </div>
      <div className="filter-group">
        {filterTypes.map(filterType => (
          <div key={filterType.key} className="filter-item">
            <input
              type="checkbox"
              id={filterType.key}
              checked={activeFilters[filterType.key]}
              onChange={(e) => onFilterChange(filterType.key, e.target.checked)}
            />
            <label 
              htmlFor={filterType.key}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem' 
              }}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: filterType.color,
                  border: '1px solid #ddd'
                }}
              />
              {filterType.label}
            </label>
          </div>
        ))}
      </div>
      
      {/* Información adicional */}
      <div style={{ 
        marginTop: '0.5rem', 
        fontSize: '0.8rem', 
        color: '#666',
        fontStyle: 'italic'
      }}>
        Selecciona los tipos de leads que deseas visualizar en el mapa
      </div>
    </div>
  );
};

export default FilterPanel; 