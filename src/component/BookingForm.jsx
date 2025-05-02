import { useState, useEffect } from "react";
import { apiPost, apiGet } from "../api/api.js";
import styles from "../styles/bookingForm.module.css";
import { useNavigate } from "react-router-dom";

const BookingForm = () => {
  const [events, setEvents] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [booking, setBooking] = useState({ eventId: "", vendorId: "" });
  const navigate = useNavigate()

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Booking Data: ", booking);
    console.log("Events: ", events);
    console.log("Vendors: ", vendors);
  
    // Make sure you're comparing against the correct field, likely "_id"
    const selectedEvent = events.find(event => event.id === booking.eventId);
    const selectedVendor = vendors.find(vendor => vendor.id === booking.vendorId);
  
    console.log("Selected Event: ", selectedEvent);
    console.log("Selected Vendor: ", selectedVendor);
  
    if (selectedEvent && selectedVendor) {
      const bookingData = {
        eventId: booking.eventId,
        eventName: selectedEvent.name,
        vendorId: booking.vendorId,
        vendorName: selectedVendor.name,
      };
  
      try {
        await apiPost("/bookings", bookingData);
        alert("Booking successful! Redirecting to Booking page...");
        setBooking({ eventId: "", vendorId: "" });
        navigate("/booking-list")
      } catch (error) {
        alert("Error confirming booking", error);
      }
    } else {
      alert("Invalid event or vendor selected.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventRes = await apiGet("/events/events");
        const vendorRes = await apiGet("/vendors/vendors");
        
        // Store the events and vendors with their ObjectIds
        setEvents(eventRes.events);
        setVendors(vendorRes.vendors);
      } catch (error) {
        alert("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.formContainer}>
      <h2>Book Event & Vendor</h2>
      <form onSubmit={handleSubmit}>
        <select name="eventId" value={booking.eventId} onChange={handleChange} required>
          <option value="">Select Event</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))}
        </select>

        <select name="vendorId" value={booking.vendorId} onChange={handleChange} required>
          <option value="">Select Vendor</option>
          {vendors.map((vendor) => (
            <option key={vendor.id} value={vendor.id}>
              {vendor.name} ({vendor.type})
            </option>
          ))}
        </select>

        <button type="submit">Book</button>
      </form>
    </div>
  );
};

export default BookingForm;
