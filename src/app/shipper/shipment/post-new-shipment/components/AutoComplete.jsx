"use client";
import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";
import Button from "@/components/button/Button";

const libraries = ["places"];

const getComponent = (place, componentName) => {
  const component = place.address_components.find((component) =>
    component.types.includes(componentName)
  );
  return component ? component.long_name : null;
};

const AutocompleteComponent = ({ onSelectLocation }) => {
  const [autocomplete, setAutocomplete] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [markerPosition, setMarkerPosition] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      setInputValue(place.name);

      // Set marker position based on the selected place's geometry
      if (place.geometry && place.geometry.location) {
        const position = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setMarkerPosition(position);
        setSelectedPlace(place);
        
      }
    }
  };

  const handleConfirm = () => {
    if (selectedPlace) {
      const placeInfo = {
        center: {
          name: selectedPlace.name || selectedPlace.formatted_address || "",
          city: selectedPlace.name || selectedPlace.formatted_address || "",
          type: selectedPlace.geometry ? "Point" : "",
          coordinates: selectedPlace.geometry
            ? [
                selectedPlace.geometry.location.lng(),
                selectedPlace.geometry.location.lat(),
              ]
            : [],
        },
        name:
          getComponent(selectedPlace, "locality") ||
          getComponent(selectedPlace, "administrative_area_level_1") ||
          "",
        country: { name: getComponent(selectedPlace, "country") || "" },
        zipCode: getComponent(selectedPlace, "postal_code") || "",
        label: selectedPlace.name || selectedPlace.formatted_address || "",
        value: `${
          selectedPlace.name || selectedPlace.formatted_address || ""
        }_${selectedPlace.geometry.location.lng()}_${selectedPlace.geometry.location.lat()}`
          .replace(/\s+/g, "")
          .toLowerCase(),
      };
      onSelectLocation(placeInfo);
    } else {
      console.log("No place selected.");
    }
  };

  const handleMarkerDragEnd = async (event) => {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarkerPosition(newPosition);

    // Use Google Maps Geocoder to get address from new position
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: newPosition }, (results, status) => {
      if (status === "OK" && results[0]) {
        const place = results[0];
        setSelectedPlace({
          ...place,
          name: place.formatted_address,
          geometry: {
            location: {
              lat: () => newPosition.lat,
              lng: () => newPosition.lng,
            },
          },
        });
        setInputValue(place.formatted_address);
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
      libraries={libraries}
    >
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder="Enter a location"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-3 my-3 border"
        />
      </Autocomplete>
      <GoogleMap
        id="autocomplete-map"
        mapContainerStyle={{ height: "400px", width: "800px" }}
        zoom={10}
        center={markerPosition || { lat: -34.397, lng: 150.644 }}
      >
        {markerPosition && (
          <Marker
            position={markerPosition}
            draggable={true}
            onDragEnd={handleMarkerDragEnd}
          />
        )}
      </GoogleMap>
      <div className="w-[90px] inline-block mt-2">
        <Button
          type="button"
          variant="base"
          size="medium"
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </div>
    </LoadScript>
  );
};

export default AutocompleteComponent;
