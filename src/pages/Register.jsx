import { useState } from "react"
import styles from "../styles/register.module.css"
import { Link, useNavigate } from "react-router-dom"
import {apiPost} from "../api/api"

const initialState = {
    username: "",
    email: "",
    password: "",
}

const Register = ()=> {
const[formData, setFormData] = useState(initialState)
const navigate = useNavigate()

const handleChange = (e)=> {
    setFormData({
        ...formData,
       [e.target.name]: e.target.value 
    })
}

const handleSubmit = async (e)=> {
    e.preventDefault()
    console.log(formData)
    try {
      const response = await apiPost("/auth/register", formData)
      alert(response.msg || "")
    } catch (error) {
      console.log("Registeration error", error)
      alert(e.message)
    }
    setFormData(initialState)
    navigate("/login")
}

    return(
        <div className={styles.registerContainer}>
        <h2 className={styles.registerTitle}>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              value={formData.username} 
              onChange={handleChange} 
              required 
            />
          </div>
  
  
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          {/* <label htmlFor="userType">User Type :</label>
              <select
                className={styles.select}
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
              >
                <option value="customer">Customer</option>
                <option value="admin">admin</option>
          </select> */}
  
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>
  
          <button type="submit" className={styles.submitBtn}>
                 Register
            </button>
        </form>
  
        <div className={styles.loginLink}>
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    )
}

export default Register