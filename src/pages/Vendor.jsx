import { useState, useEffect } from "react";
import { apiGet } from "../api/api.js";
import styles from "../styles/vendor.module.css"; // Create this CSS module
import { useNavigate } from "react-router-dom";


const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [vendorType, setVendorType] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await apiGet("/vendors/vendors");
        setVendors(response.vendors || []);
        setFilteredVendors(response.vendors || []);
      } catch (error) {
        alert(`Error fetching vendors: ${error.message}`);
      }
    };
    fetchVendors();
  }, []);

  useEffect(() => {
    if (vendorType === "all") {
      setFilteredVendors(vendors);
    } else {
      setFilteredVendors(vendors.filter(v => v.type === vendorType));
    }
  }, [vendorType, vendors]);

  const handleFilterChange = (e) => {
    setVendorType(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h2>All Vendors</h2>

      <select className={styles.filterDropdown} value={vendorType} onChange={handleFilterChange}>
        <option value="all">All</option>
        <option value="catering">Catering</option>
        <option value="decoration">Decoration</option>
        <option value="photography">Photography</option>
        <option value="music">Music</option>
      </select>

      <ul className={styles.vendorList}>
        {filteredVendors.map((vendor) => (
          <div key={vendor.id} className={styles.vendorCard}>
            <h3>{vendor.name}</h3>
            <p>Type: {vendor.type}</p>
            <p>Contact: {vendor.contact}</p>
            <p>{vendor.details}</p>
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


export default VendorList;
