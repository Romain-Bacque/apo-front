import { useEffect, useState } from "react";

import { Marker, Tooltip, useMap } from "react-leaflet";
import locationIcon from "../icons/locationIcon";

const LocationMarker = () => {
  const [position, setPosition] = useState(null);

  const map = useMap();

  useEffect(() => {
    // Callback function is triggered when current user location change, thanks to 'locationfound' event.
    map.locate().on("locationfound", function (event) {
      setPosition(event.latlng);
      map.flyTo(event.latlng, map.getZoom()); // Sets the view of the map (geographical center and zoom) performing a smooth pan-zoom animation.
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position} icon={locationIcon}>
      <Tooltip>Vous êtes ici.</Tooltip>
    </Marker>
  );
};
export default LocationMarker;