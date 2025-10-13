import { useState } from "react";

function useGeolocation() {}

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  // const [countClicks, setCountClicks] = useState(0);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  const { lat, lng } = position;

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return [position, setPosition];
}
// <div>
//   <button onClick={getPosition} disabled={isLoading}>
//     Get my position
//   </button>

//   {isLoading && <p>Loading position...</p>}
//   {error && <p>{error}</p>}
//   {!isLoading && !error && lat && lng && (
//     <p>
//       Your GPS position:{" "}
//       <a
//         target="_blank"
//         rel="noreferrer"
//         href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
//       >
//         {lat}, {lng}
//       </a>
//     </p>
//   )}
// </div>
