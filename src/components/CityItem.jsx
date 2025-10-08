import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

import PropTypes from "prop-types";

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
  const { emoji, cityName, date, id, position } = city;
  //   console.log(city);
  return (
    <li>
      <Link
        className={styles.cityItem}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
