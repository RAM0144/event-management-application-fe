import styles from "../styles/login.module.css"
import {  useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { apiPost } from "../api/api";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";

const Login = ()=> {

const[loginData, setLoginData] = useState({
    email: "",
    password: "",
});

const dispatch = useDispatch()
const navigate = useNavigate()

const handleChange = (e)=>{
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async(e)=> {
     e.preventDefault();
    //  console.log(loginData)
     try {
      const response = await apiPost("/auth/login", loginData)
      const { msg, userToken } = response
      localStorage.setItem("authToken", response.userToken)
       alert(msg)
       dispatch({
           type: "account_authenticated",
           userInfo: jwtDecode(userToken)
       })
       navigate("/")
     } catch (error) {
      console.log(error.message);
      alert("Invalid Details Please check")
     }
  }
    return(
        <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className={styles.submitBtn}>Login</button>
      </form>

      <div className={styles.registerLink}>
        Don't have an account? <Link to="/register">Register here</Link>
      </div>
    </div>
    )
}

export default Login