import React, { useState, useEffect } from 'react';
import LeadMap from './components/LeadMap';
import FilterPanel from './components/FilterPanel';
import './App.css';

function App() {
  // Estado para los filtros activos
  const [activeFilters, setActiveFilters] = useState({
    feria: true,
    importador: true,
    distribuidor: true,
    ice: true
  });

  // Estado para los datos de leads
  const [leadsData, setLeadsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos de leads al montar el componente
  useEffect(() => {
    const loadLeadsData = async () => {
      try {
        const response = await fetch('/leads.json');
        const data = await response.json();
        setLeadsData(data.leads);
        setLoading(false);
      } catch (error) {
        console.error('Error cargando datos de leads:', error);
        setLoading(false);
      }
    };

    loadLeadsData();
  }, []);

  // Función para manejar cambios en los filtros
  const handleFilterChange = (filterType, isChecked) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: isChecked
    }));
  };

  // Filtrar leads basado en los filtros activos
  const filteredLeads = leadsData.filter(lead => activeFilters[lead.type]);

  return (
    <div className="app-container">
      {/* Header con información del proyecto */}
      <header className="header">
        <h1>Comextoolbox - Lead Discovery Dashboard</h1>
        <p>Descubre y prioriza leads comerciales en Bélgica, Reino Unido y Benelux</p>
      </header>

      {/* Panel de filtros */}
      <FilterPanel 
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
      />

      {/* Contenedor del mapa */}
      <div className="map-container">
        {loading ? (
          <div className="loading">
            <p>Cargando datos de leads...</p>
          </div>
        ) : (
          <LeadMap leads={filteredLeads} />
        )}
      </div>
    </div>
  );
}

export default App; 