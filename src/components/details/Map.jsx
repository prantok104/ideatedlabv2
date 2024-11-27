"use client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// Define the position for the marker
const position = [51.505, -0.09];

const Map = () => {
  // Create a custom Leaflet icon using blue SVG
  const customIcon = L.divIcon({
    html: `
      <img src="https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png" alt="" />`,
    iconSize: [24, 24], // Adjust anchor point to center the icon
  });

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        zIndex: 10,
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={customIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
