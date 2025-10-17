import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useCities from "../contexts/useCities";
import Flag from "react-world-flags";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

CityItem.propTypes = {
  city: PropTypes.shape({
    emoji: PropTypes.string.isRequired,
    cityName: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    position: PropTypes.object.isRequired,
  }).isRequired,
};

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { emoji, cityName, date, id, position } = city;
  //   console.log(city);

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        {/* <span className={styles.emoji}>{emoji}</span> */}
        <Flag code={emoji} style={{ width: "1.5em" }} />
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
