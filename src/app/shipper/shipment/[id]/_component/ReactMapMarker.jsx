"use client"
import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
  InfoWindow,
  MarkerClusterer,
} from "@react-google-maps/api";

const ReactMapMarker = ({ pickUpLocation = {}, dropOffLocations = [] }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  });

  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
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
          destination: waypoints[waypoints.length - 1]?.location,
          waypoints: waypoints.slice(0, -1),
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
            setError(null); // Clear any previous error
          } else {
            console.error("Error fetching directions", result);
            setError("Could not fetch directions. Please try again.");
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

  // Style for the map
  const mapStyles = [
    {
      featureType: "all",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }], // Set geometry to white
    },
    {
      featureType: "all",
      elementType: "labels",
      stylers: [{ visibility: "off" }], // Optionally hide labels
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#ebdddd" }], // Set water to light gray
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#ecf3ee" }], // Set water to light gray
    },
  ];

  const pickupMarkerOptions = {
    icon: {
      url: "/l.svg",
      scaledSize: new window.google.maps.Size(40, 40), // Adjust size
    },
  };

  const dropoffMarkerOptions = {
    icon: "/d.svg",
    scaledSize: new window.google.maps.Size(30, 30), // Adjust size
  };

  return (
    <>
      {error && <div style={{ color: "red" }}>{error}</div>}{" "}
      {/* Error message */}
      <GoogleMap
        center={{
          lat: pickUpLocation.coordinates[1],
          lng: pickUpLocation.coordinates[0],
        }}
        mapContainerStyle={{ height: "360px", width: "100%" }}
        options={{
          styles: mapStyles,
        }}
      >
        {/* Conditional rendering of the pickup location with car icon */}
        {!isPickupAtDropoff && (
          <Marker
            position={{
              lat: pickUpLocation.coordinates[1],
              lng: pickUpLocation.coordinates[0],
            }}
            options={pickupMarkerOptions}
          />
        )}

        {/* Marker Clusterer for dropoff locations */}
        <MarkerClusterer>
          {(clusterer) =>
            dropOffLocations.map((location, index) => (
              <>
                <Marker
                  key={index}
                  position={{
                    lat: location.coordinates[1],
                    lng: location.coordinates[0],
                  }}
                  title={location?.name}
                  options={dropoffMarkerOptions}
                  clusterer={clusterer} // Add clusterer prop
                />

                <InfoWindow
                  position={{
                    lat: location?.coordinates[1],
                    lng: location?.coordinates[0],
                  }}
                  options={{
                    pixelOffset: new window.google.maps.Size(0, -20),
                    disableAutoPan: false, // Enable auto pan if desired
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#ffffff71",
                      paddingTop: "10px",
                      minWidth: "auto",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "12px",
                        fontWeight: "normal",
                        marginBottom: "5px",
                        color: "#333",
                      }}
                    >
                      {location?.name}
                    </h2>
                    {/* Optionally, you can add more content here */}
                  </div>
                </InfoWindow>
              </>
            ))
          }
        </MarkerClusterer>

        {/* Directions route */}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: "#62990f",
                strokeOpacity: 0.9,
                strokeWeight: 4,
              },
            }}
          />
        )}
      </GoogleMap>
    </>
  );
};

ReactMapMarker.propTypes = {
  pickUpLocation: PropTypes.shape({
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  }),
  dropOffLocations: PropTypes.arrayOf(
    PropTypes.shape({
      coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
      name: PropTypes.string,
    })
  ).isRequired,
};

export default ReactMapMarker;
