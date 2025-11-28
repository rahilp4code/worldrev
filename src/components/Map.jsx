import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import useCities from "../contexts/useCities";
import PropTypes from "prop-types";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Flag from "react-world-flags";

function Map() {
  const {
    isLoading: loadingPosition,
    position: positionData,
    getPosition,
  } = useGeolocation();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();

  const [mapLat, mapLng] = useUrlPosition();
  // const [searchParam, setSearchParam] = useSearchParams();
  // const mapLat = searchParam.get("lat");
  // const mapLng = searchParam.get("lng");
  // console.log(mapLat, mapLng);
  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(
    function () {
      if (positionData) setMapPosition([positionData.lat, positionData.lng]);
    },
    [positionData]
  );

  // onClick={() => navigate("form")
  return (
    <div className={styles.mapContainer}>
      {!positionData && (
        <Button type="position" onClick={getPosition}>
          {loadingPosition ? "Loading.." : "USE YOUR POSITION"}
        </Button>
      )}
      <MapContainer
        // center={[mapLat, mapLng]}
        center={mapPosition}
        zoom={8}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              {/* <span>{city.emoji}</span> */}
              <span><Flag code={city.emoji} style={{ width: "1em" }} /></span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <SetCenter position={mapPosition} />
        <MapClick />
      </MapContainer>
    </div>
  );
}
SetCenter.propTypes = {
  position: PropTypes.array,
};
function SetCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function MapClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
export default Map;
