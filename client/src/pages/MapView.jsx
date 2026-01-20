import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

// Create CSS-based Icons
const createStatusIcon = (color) => {
  return new L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${color};
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 0 10px rgba(0,0,0,0.5);
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

const pendingIcon = createStatusIcon('#ef4444'); // Red-500
const resolvedIcon = createStatusIcon('#22c55e'); // Green-500

// Sub-component to handle map recentering
const RecenterMap = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 15, { animate: true }); // Zoom level 15
    }
  }, [center, map]);
  return null;
};

function MapView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [issues, setIssues] = useState([]);
  const markerRefs = useRef({});

  // Extract navigation state
  const targetCenter = location.state?.center;
  const targetId = location.state?.id;

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/issues');
        console.log("Fetched issues:", res.data);
        setIssues(res.data);
      } catch (err) {
        console.error('Error fetching issues:', err);
      }
    };
    fetchIssues();
  }, []);

  // Auto-open popup effect
  useEffect(() => {
    if (targetId && issues.length > 0) {
      const marker = markerRefs.current[targetId];
      if (marker) {
        // Small timeout to ensure map/marker is ready
        setTimeout(() => {
          marker.openPopup();
        }, 300);
      }
    }
  }, [targetId, issues]);

  return (
    <div className="h-screen w-full relative bg-slate-950">

      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-[1000] bg-slate-900/80 backdrop-blur-md hover:bg-slate-800 text-white font-bold p-3 rounded-full shadow-xl border border-slate-700 transition-all hover:scale-110 flex items-center gap-2"
      >
        <FaArrowLeft /> <span className="hidden sm:inline">Back</span>
      </button>

      <MapContainer
        center={targetCenter || [7.8731, 80.7718]}
        zoom={targetCenter ? 15 : 8}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        {/* Recenter Map Component */}
        <RecenterMap center={targetCenter} />

        {/* Dark Theme Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {issues.map((issue, index) => {
          // Robust Status Check
          const isResolved = issue.status && issue.status.toLowerCase() === 'resolved';

          // Deterministic Offset to separate stacked markers
          const offset = index * 0.0003;

          return issue.latitude && issue.longitude ? (
            <Marker
              key={issue._id}
              position={[issue.latitude + offset, issue.longitude + offset]}
              icon={isResolved ? resolvedIcon : pendingIcon}
              ref={(el) => (markerRefs.current[issue._id] = el)}
            >
              <Popup className="custom-popup">
                <div className="text-slate-900 min-w-[200px]">
                  <h3 className="font-bold text-lg mb-1">{issue.title}</h3>
                  <div className="flex items-center justify-between gap-2 mb-2 border-b pb-1">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">{issue.category}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isResolved
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-100 text-amber-700 border border-amber-200'
                      }`}>
                      {isResolved ? '✅ Resolved' : '⏳ Pending'}
                    </span>
                  </div>

                  {issue.imageUrl && (
                    <div className="w-full h-32 overflow-hidden rounded-lg mb-2 relative bg-slate-200">
                      <img
                        src={issue.imageUrl}
                        alt={issue.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <p className="text-sm text-slate-700 leading-snug">{issue.description}</p>
                </div>
              </Popup>
            </Marker>
          ) : null;
        })}
      </MapContainer>

      {/* Global CSS for Markers and Popups */}
      <style>{`
        /* Reset Leaflet's default div icon styles to allow our custom shape */
        .custom-marker {
          background: none !important;
          border: none !important;
        }

        .leaflet-popup-content-wrapper {
          background: rgba(255, 255, 255, 0.98);
          border-radius: 16px;
          padding: 0;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .leaflet-popup-content {
          margin: 0;
          padding: 16px;
        }
        .leaflet-popup-tip {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}

export default MapView;
