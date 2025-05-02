
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Layout from './component/Layout'
import Home from './component/Home'
import { useSelector, Provider } from 'react-redux'
import PropTypes from "prop-types";
import store from './store/store.js'
import EventForm from './component/EventForm.jsx'
import EventList from './pages/Events.jsx'
import VendorList from './pages/Vendor.jsx'
import VendorForm from './component/VendorForm.jsx'
import BookingSuccess from './pages/BookingSuccess.jsx'
import BookingForm from './component/BookingForm.jsx'
import BookingList from './pages/BookingList.jsx'


const ProtectedRoute = ({ routeElement }) => {
  const { authenticated } = useSelector((state) => state.account)
  if(authenticated){
    return routeElement
  }
  else{
    return <Navigate to="/login" />
  }
}
ProtectedRoute.propTypes = {
  routeElement: PropTypes.node.isRequired,
}

function App() {

  return (

    <Provider store={store}>
      <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<ProtectedRoute routeElement={<Home/>} />}/>
          <Route path='/events' element={<ProtectedRoute routeElement={<EventForm/>} />} />
          <Route path='/vendors' element={<ProtectedRoute routeElement={<VendorForm/>} />} />
          <Route path='/event-list' element={<ProtectedRoute routeElement={<EventList/>} />} />
          <Route path='/vendor-list' element={<ProtectedRoute routeElement={<VendorList/>} />} />
          <Route path='/booking-list' element={<ProtectedRoute routeElement={<BookingList/>} />} />
          <Route path="/bookingForm" element={<ProtectedRoute routeElement={<BookingForm/>} />} />
          <Route path="/booking-success" element={<ProtectedRoute routeElement={<BookingSuccess />} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Layout>
    </Router>
    </Provider>

  )
}

export default App
