import styles from "./CountryItem.module.css";
import PropTypes from "prop-types";

function CountryItem({ country }) {
  CountryItem.propTypes = {
    country: PropTypes.arrayOf(
      PropTypes.shape({
        country: PropTypes.string.isRequired,
        emoji: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
