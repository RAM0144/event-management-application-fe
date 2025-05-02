import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/header.module.css";
import { Link, useNavigate} from "react-router-dom";


const Header = () => {
  
   const naviagte = useNavigate()
   const dispatch = useDispatch()
   const isAuthenticated = useSelector((state) => state.account.authenticated)

   const handleLogout = () => {
      dispatch({ type: "account_logout" })
      localStorage.removeItem("authToken")
    naviagte("/login")
  }
  return (
    <header className={styles.header}>
      <div className={styles.logo}>WeddingWise</div>
      <nav className={styles.navLinks}>
        <Link to="/">Home</Link>
        <Link to="/event-list">Events</Link>
        <Link to="/vendor-list">Vendors</Link>
        <Link to="/booking-list">Bookings</Link>
        {!isAuthenticated && <Link to="/login" className={styles.logoutBtn}>Login</Link>}
        {isAuthenticated && (
          <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
        )}
      </nav>
      
    </header>
  );
};

export default Header;
