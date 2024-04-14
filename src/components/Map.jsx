import React, { useState, useEffect } from "react";
import classes from "./map.module.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { toast } from "react-toastify";

export default function Map({ readonly, location, onChange }) {
  const [mapCenter, setMapCenter] = useState([0, 0]); // Default center
  const [mapZoom, setMapZoom] = useState(13); // Default zoom level

  useEffect(() => {
    if (location) {
      setMapCenter(location); // Update center when location changes
    }
  }, [location]);

  return (
    <div className="md:w-[35rem] h-[22rem] md:relative text-center ">
      <MapContainer
        className={classes.map}
        center={mapCenter}
        zoom={mapZoom}
        dragging={!readonly}
        touchZoom={!readonly}
        doubleClickZoom={!readonly}
        scrollWheelZoom={!readonly}
        boxZoom={!readonly}
        keyboard={!readonly}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FindButtonAndMarker
          readonly={readonly}
          location={location}
          onChange={onChange}
        />
      </MapContainer>
    </div>
  );
}

function FindButtonAndMarker({ readonly, location, onChange }) {
  const map = useMapEvents({
    click(e) {
      !readonly && onChange(e.latlng);
    },
    locationfound(e) {
      onChange(e.latlng);
      map.flyTo(e.latlng, map.getZoom()); // Fly to location when found
    },
    locationerror(e) {
      toast.error(e.message);
    },
  });

  return (
    <>
      {!readonly && (
        <button
          type="button"
          className={classes.find_location}
          onClick={() => map.locate()}
        >
          Find My Location
        </button>
      )}

      {location && (
        <Marker
          eventHandlers={{
            dragend: (e) => {
              onChange(e.target.getLatLng());
            },
          }}
          position={location}
          draggable={!readonly}
        >
          <Popup>Shipping Location</Popup>
        </Marker>
      )}
    </>
  );
}
