import { Link } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
function NavRoutes() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <Link to="/product">products</Link>
        </li>
        <li>
          <Link to="/price">Price</Link>
        </li>
        <li>
          <Link to="/login" className={styles.ctaLink}>
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavRoutes;
