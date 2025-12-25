
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { School } from '../types';

interface MapViewProps {
  schools: School[];
  selectedSchool: School | null;
  onSelectSchool: (school: School) => void;
}

const MapView: React.FC<MapViewProps> = ({ schools, selectedSchool, onSelectSchool }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: number]: L.Marker }>({});
  const highlightLayerRef = useRef<L.Layer | null>(null);

  // Custom icons
  const defaultIcon = L.divIcon({
    className: 'custom-marker',
    html: `<div class="w-8 h-8 bg-indigo-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
          </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  const activeIcon = L.divIcon({
    className: 'custom-marker-active',
    html: `<div class="w-10 h-10 bg-amber-500 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-[#0a1a3a] animate-pulse">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
          </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  });

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map
    const map = L.map(mapContainerRef.current, {
      zoomControl: false // Custom placement for zoom
    }).setView([30.0444, 31.2357], 7);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors © CARTO'
    }).addTo(map);

    L.control.zoom({ position: 'bottomleft' }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Add new markers
    schools.forEach(school => {
      const marker = L.marker([school.lat, school.lng], { icon: defaultIcon })
        .addTo(mapRef.current!);
      
      // Popup Content with Button
      const popupContent = document.createElement('div');
      popupContent.className = 'p-2 text-right dir-rtl';
      popupContent.innerHTML = `
        <h3 class="font-bold text-gray-900 mb-1 text-base leading-tight">${school.name}</h3>
        <p class="text-xs text-gray-600 mb-3">${school.address}</p>
        <button id="view-details-${school.id}" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors shadow-sm">
          عرض التفاصيل الكاملة
        </button>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 250,
        className: 'custom-popup'
      });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`view-details-${school.id}`);
        if (btn) {
          btn.onclick = () => {
            onSelectSchool(school);
            marker.closePopup();
          };
        }
      });

      markersRef.current[school.id] = marker;
    });

    // If there are schools, fit bounds
    if (schools.length > 0) {
      const group = L.featureGroup(Object.values(markersRef.current));
      mapRef.current.fitBounds(group.getBounds().pad(0.2));
    }
  }, [schools, onSelectSchool]);

  useEffect(() => {
    if (mapRef.current) {
      // Reset all icons to default
      Object.keys(markersRef.current).forEach(id => {
        markersRef.current[Number(id)].setIcon(defaultIcon);
      });

      if (highlightLayerRef.current) {
        highlightLayerRef.current.remove();
        highlightLayerRef.current = null;
      }

      if (selectedSchool) {
        const marker = markersRef.current[selectedSchool.id];
        if (marker) {
          marker.setIcon(activeIcon);
          marker.setZIndexOffset(1000);
          mapRef.current.setView([selectedSchool.lat, selectedSchool.lng], 14, {
            animate: true,
            duration: 1
          });
          marker.openPopup();

          // Add a subtle highlight circle
          highlightLayerRef.current = L.circle([selectedSchool.lat, selectedSchool.lng], {
            radius: 200,
            color: '#f59e0b',
            fillColor: '#f59e0b',
            fillOpacity: 0.2,
            weight: 2
          }).addTo(mapRef.current);
        }
      }
    }
  }, [selectedSchool]);

  return (
    <div className="w-full h-[500px] md:h-[600px] shadow-inner relative overflow-hidden rounded-3xl group">
      <div ref={mapContainerRef} className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-[1.01]" />
      
      {/* Custom styles for Leaflet elements */}
      <style>{`
        .leaflet-popup-content-wrapper {
          border-radius: 1rem;
          padding: 0;
          overflow: hidden;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        .leaflet-popup-content {
          margin: 0;
          width: 220px !important;
        }
        .leaflet-popup-tip {
          background: white;
        }
        .dir-rtl {
          direction: rtl;
        }
      `}</style>
    </div>
  );
};

export default MapView;
