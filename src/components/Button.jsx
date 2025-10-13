import PropTypes from "prop-types";
import styles from "./Button.module.css";
Button.propTypes = {
  children: PropTypes.node.isRequired, // Can be text, element, etc.
  type: PropTypes.string, // Only specific style types allowed
  onClick: PropTypes.func, // Optional function
};

function Button({ children, type, onClick }) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
