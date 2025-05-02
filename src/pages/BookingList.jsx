import { useEffect, useState } from "react";
import { apiGet, apiPatch } from "../api/api.js";
import styles from "../styles/booking.module.css";

const BookingList = () => {
    const [bookings, setBookings] = useState([]);
  
    useEffect(() => {
      const fetchBookings = async () => {
        try {
          const response = await apiGet("/bookings/bookings");
          setBookings(response.bookings || "")// Assuming your API returns an array of bookings
        } catch (error) {
          alert("Error fetching bookings", error.message);
        }
      };
  
      fetchBookings();
    }, []);
  
    // Handle Confirm
    const handleConfirm = async (bookingId) => {
      try {
         await apiPatch(`/bookings/${bookingId}`, { status: "confirmed" });
        setBookings((prev) =>
          prev.map((b) =>
            b.id === bookingId ? { ...b, status: "confirmed" } : b
          )
        );
        alert("Your booking has been confirmed. Thank you!")
      } catch (error) {
        console.error("Error confirming booking", error);
        alert("Error confirming booking.");
      }
    };
    
    const handleCancel = async (bookingId) => {
      try {
         await apiPatch(`/bookings/${bookingId}`, { status: "cancelled" });
        setBookings((prev) =>
          prev.map((b) =>
            b.id === bookingId ? { ...b, status: "cancelled" } : b
          )
        );
        alert("Your booking has been cancelled.!")
      } catch (error) {
        console.error("Error cancelling booking", error);
        alert("Error cancelling booking.");
      }
    };
    

  return (
    <div className={styles.container}>
      <h2>Booking List</h2>
      {bookings.map((b) => (
        <div key={b.id} className={styles.bookingCard}>
          <p><strong>Event:</strong> {b.eventName}</p>
          <p><strong>Vendor:</strong> {b.vendorName}</p>
          <p><strong>Status:</strong> {b.status}</p>
          {b.status === "booked" && (
            <div className={styles.actions}>
              <button onClick={() => handleConfirm(b.id)}>Confirm</button>
              <button onClick={() => handleCancel(b.id)}>Cancel</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

  

export default BookingList;
