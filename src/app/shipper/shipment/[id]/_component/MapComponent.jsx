"use client";
import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

const MapComponent = ({ pickUpLocation = {}, dropOffLocations = [] }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  });

  const [directions, setDirections] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);

  React.useEffect(() => {
    if (isLoaded) {
      const directionsService = new google.maps.DirectionsService();

      const waypoints = dropOffLocations.map((location) => ({
        location: {
          lat: location.coordinates[1],
          lng: location.coordinates[0],
        },
        stopover: true,
      }));

      directionsService.route(
        {
          origin: {
            lat: pickUpLocation.coordinates[1],
            lng: pickUpLocation.coordinates[0],
          },
          destination: waypoints[waypoints.length - 1].location,
          waypoints: waypoints.slice(0, -1),
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error("Error fetching directions", result);
          }
        }
      );
    }
  }, [isLoaded, pickUpLocation, dropOffLocations]);

  if (!isLoaded) return <div>Loading...</div>;

  // Check if the pickup location matches any dropoff locations
  const isPickupAtDropoff = dropOffLocations.some(
    (location) =>
      location.coordinates[0] === pickUpLocation.coordinates[0] &&
      location.coordinates[1] === pickUpLocation.coordinates[1]
  );

  return (
    <GoogleMap
      center={{
        lat: pickUpLocation.coordinates[1],
        lng: pickUpLocation.coordinates[0],
      }}
      zoom={6}
      mapContainerStyle={{ height: "340px", width: "100%" }}
    >
      {/* Conditional rendering of the pickup location with car icon */}
      {!isPickupAtDropoff && (
        <Marker
          position={{
            lat: pickUpLocation.coordinates[1],
            lng: pickUpLocation.coordinates[0],
          }}
          options={{ 
            icon: "https://img.icons8.com/ios-filled/50/000000/car.png",
           }}
        />
      )}

      {/* Directions route */}
      {directions && <DirectionsRenderer directions={directions} />}

      {/* Dropoff locations as markers with tooltip */}
      {dropOffLocations.map((location, index) => (
        <Marker
          key={index}
          position={{
            lat: location.coordinates[1],
            lng: location.coordinates[0],
          }}
          onMouseOver={() => setActiveMarker(index)}
          onMouseOut={() => setActiveMarker(null)}
        >
        </Marker>
      ))}
    </GoogleMap>
  );
};

export default MapComponent;
