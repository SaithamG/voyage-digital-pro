import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { agencyConfig } from '../config/agencyConfig';
import { tripConfig } from '../config/tripConfig';

const colorHex = {
  red: '#9A2B25',
  amber: '#B5662A',
  emerald: '#4A7C6F',
  blue: '#36657F',
};

const makePin = (region, index) => {
  const color = colorHex[region.color] || colorHex.blue;
  return L.divIcon({
    className: 'lv-pin',
    html: `
      <div style="position:relative;width:44px;height:44px;">
        <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
          width:44px;height:44px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);
          background:#FCF8F0;border:3px solid ${color};box-shadow:0 6px 16px rgba(44,33,24,.28);">
          <span style="transform:rotate(45deg);font-size:18px;line-height:1;">${region.emoji}</span>
        </div>
        <div style="position:absolute;top:-6px;right:-6px;width:18px;height:18px;border-radius:50%;
          background:${color};color:#fff;font-size:10px;font-weight:900;
          display:flex;align-items:center;justify-content:center;border:2px solid #FCF8F0;">${index + 1}</div>
      </div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 44],
    popupAnchor: [0, -46],
  });
};

const FitBounds = ({ points }) => {
  const map = useMap();
  useEffect(() => {
    if (points.length > 1) {
      map.fitBounds(points, { padding: [60, 60] });
    }
  }, [map, points]);
  return null;
};

const TripMap = ({ regions, onSelectRegion, height = '60vh' }) => {
  const { colors } = agencyConfig;
  // Mémoïsé : référence stable entre les re-renders (le compte à rebours en
  // déclenche un par seconde) — sinon le cadrage auto se relancerait sans cesse
  // et annulerait le zoom/déplacement de l'utilisateur.
  const points = useMemo(() => regions.filter(r => r.coords).map(r => r.coords), [regions]);
  const center = points[0] || [35, 110];

  return (
    <MapContainer
      center={center}
      zoom={tripConfig.mapZoom || 5}
      scrollWheelZoom={false}
      style={{ height, width: '100%', background: '#EADFC9' }}
      className="rounded-2xl overflow-hidden border border-line z-0"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap &copy; CARTO'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      <Polyline
        positions={points}
        pathOptions={{ color: colors.primary, weight: 3, dashArray: '8 10', opacity: 0.9 }}
      />

      {regions.filter(r => r.coords).map((region, index) => (
        <Marker key={region.id} position={region.coords} icon={makePin(region, index)}>
          <Popup>
            <div style={{ minWidth: 180 }}>
              <div style={{ fontWeight: 900, fontSize: 15, marginBottom: 2 }}>
                {region.emoji} {region.name}
              </div>
              <div style={{ color: '#64748b', fontSize: 12, marginBottom: 6 }}>{region.description}</div>
              <div style={{ fontSize: 12, marginBottom: 2 }}>📅 {region.dates} · {region.nights} nuits</div>
              <div style={{ fontSize: 12, marginBottom: 8 }}>🏨 {region.hotel}</div>
              {onSelectRegion && (
                <button
                  onClick={() => onSelectRegion(region.id)}
                  style={{
                    background: colors.primary, color: '#fff', border: 'none', borderRadius: 8,
                    padding: '6px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer', width: '100%',
                  }}
                >
                  Voir l'itinéraire →
                </button>
              )}
            </div>
          </Popup>
        </Marker>
      ))}

      <FitBounds points={points} />
    </MapContainer>
  );
};

export default TripMap;
