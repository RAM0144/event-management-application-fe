import { useState, useEffect } from "react";
import { apiGet } from "../api/api.js"; 
import styles from "../styles/events.module.css"
import { useNavigate } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiGet("/events/events"); // Create the GET request route in your backend
        setEvents(response.events || "");
      } catch (error) {
        alert("Error fetching events", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Your Events</h2>
      <ul className={styles.eventList}>
        {events.map((event) => (
          <div key={event.id} className={styles.eventCard}>
            <h3>{event.name}</h3>
            <p>Date: {event.date}</p>
            <h3>Type: {event.type}</h3>
            <button
              onClick={() => navigate("/bookingForm")}
              className={styles.bookBtn}
            >
              Book
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
