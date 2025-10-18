// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";

import Flag from "react-world-flags";
import DatePicker from "react-datepicker";
import Button from "./Button";
import Message from "./Message";
import Spinner from "./Spinner";
import useCities from "../contexts/useCities";

// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

// const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
const BASE_URL = "https://nominatim.openstreetmap.org/reverse?format=json";

function Form() {
  const [lat, lng] = useUrlPosition();
  const [isLoadingFetchData, setIsLoadingFetchData] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [geoError, setGeoError] = useState("");
  const [emoji, setEmoji] = useState("");

  const { addCity, isLoading } = useCities();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName && !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await addCity(newCity);
    navigate("/app/cities");
  }

  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchData() {
        try {
          setIsLoadingFetchData(true);
          setGeoError("");

          // const res = await fetch(
          //   `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          // );
          const res = await fetch(`${BASE_URL}&lat=${lat}&lon=${lng}`);
          if (!res.ok) throw new Error("Network error while fetching data.");
          const data = await res.json();
          console.log(data);
          // const data = await res.json();
          // console.log(data.countryCode);

          // if (!data.countryCode)
          //   throw new Error("Doesnt seem to be a city, Click somewhere else");
          if (data.error)
            throw new Error("Doesnt seem to be a city, Click somewhere else");

          setCityName(
            data.address.city || data.address.town || data.address.village || ""
          );
          setCountry(data.address.country);
          setEmoji(data.address.country_code);
          // setCityName(data.city || data.locality || "");
          // setCountry(data.countryName);
          // setEmoji(data.countryCode);
        } catch (err) {
          setGeoError(err.message);
        } finally {
          setIsLoadingFetchData(false);
        }
      }
      fetchData();
    },
    [lat, lng]
  );
  if (!lat && !lng)
    return <Message message={"Start by Clicking Somewhere On The Map "} />;
  if (isLoadingFetchData) return <Spinner />;
  if (geoError) return <Message message={geoError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={`${cityName}${cityName ? "," : ""} ${country}`}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
        <Flag className={styles.flag} code={emoji} />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat={"dd/MM/yyyy"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </button>
      </div>
    </form>
  );
}

export default Form;
