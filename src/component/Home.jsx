import React from 'react';
import { Link } from 'react-router-dom';
import styles from "../styles/home.module.css";  // Make sure to create this CSS file

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <header className={styles.homeHeader}>
        <h1>WeddingWise</h1>
        <p className={styles.homeSubtext}>
          Plan your dream wedding with ease and elegance.
        </p>
      </header>

      <div className={styles.homeNav}>
        <Link to="/events" className={styles.navCard}>
          <h2>Create Event</h2>
          <p>Set up your wedding ceremonies and celebrations</p>
        </Link>

        <Link to="/vendors" className={styles.navCard}>
          <h2>Create Vendor</h2>
          <p>Add new service providers for your event</p>
        </Link>

        <Link to="/event-list" className={styles.navCard}>
          <h2>View Events</h2>
          <p>See all your planned events</p>
        </Link>

        <Link to="/vendor-list" className={styles.navCard}>
          <h2>View Vendors</h2>
          <p>Browse through your service partners</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
