import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getCurrentLocation, getRouteData } from '../services/api';

const vehicleIcon = new L.Icon({
  iconUrl: 'https://img.icons8.com/color/48/car--v1.png',
  iconSize: [38, 38],
  iconAnchor: [19, 38]
});

const MapView = () => {
  const [vehiclePos, setVehiclePos] = useState([17.385044, 78.486671]);
  const [path, setPath] = useState([]);

  useEffect(() => {
    getRouteData().then(res => {
      const route = res.data.map(p => [p.latitude, p.longitude]);
      setPath(route);
    });

    const interval = setInterval(() => {
      getCurrentLocation().then(res => {
        const newPos = [res.data.latitude, res.data.longitude];
        setVehiclePos(newPos);
        setPath(prev => [...prev, newPos]);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer center={vehiclePos} zoom={16} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={vehiclePos} icon={vehicleIcon} />
      <Polyline positions={path} color="red" />
    </MapContainer>
  );
};

export default MapView;
