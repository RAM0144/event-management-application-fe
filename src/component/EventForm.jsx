import { useState } from "react"
import styles from "../styles/eventForm.module.css"
import { apiPost } from "../api/api.js"

const initialState = {
  name: "",
  date: "",
  type: ""
}

const EventForm = ()=>{

    const[eventData, setEventData] = useState(initialState)

    const handleChange = (e)=> {
        setEventData({
            ...eventData,
           [e.target.name]: e.target.value 
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // const token = localStorage.getItem("userToken")
      try {
        const response = await apiPost("/events", eventData)
        alert(response.msg|| "Event Created Successfully");
      } catch (error) {
        alert(error.message || "Error creating event");
      }
      setEventData(initialState)
    }

    return(
        <div className={styles.formContainer}>
        <h2>Create Event</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={eventData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="date">Event Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="type">Event Type</label>
            <select
               id ="type"
              name="type"
              value={eventData.type}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="ceremony">Ceremony</option>
              <option value="reception">Reception</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <button type="submit" className={styles.submitBtn}>
            Create Event
          </button>
        </form>
      </div>
    )
}

export default EventForm