import { useState } from "react";
import styles from "../styles/vendorForm.module.css"; 
import { apiPost } from "../api/api.js"; 

const initialState = {
    name: "",
    type: "",
    contact: "",
    details: "",
}

const VendorForm = () => {
    const [vendorData, setVendorData] = useState(initialState);

    const handleChange = (e) => {
        setVendorData({
            ...vendorData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiPost("/vendors", vendorData);
            alert(response.msg || "Vendor created successfully");
        } catch (error) {
            alert(error.message || "Error creating vendor");
        }
        setVendorData(initialState)
    };

    return (
        <div className={styles.formContainer}>
            <h2>Create Vendor</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Vendor Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={vendorData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="type">Vendor Type</label>
                    <select
                        id="type"
                        name="type"
                        value={vendorData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="catering">Catering</option>
                        <option value="decoration">Decoration</option>
                        <option value="photography">Photography</option>
                        <option value="music">Music</option>
                        <option value="transport">Transport</option>
                        
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="contact">Contact Info</label>
                    <input
                        type="text"
                        id="contact"
                        name="contact"
                        value={vendorData.contact}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="details">Additional Details</label>
                    <textarea
                        id="details"
                        name="details"
                        value={vendorData.details}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className={styles.submitBtn}>
                    Create Vendor
                </button>
            </form>
        </div>
    );
};

export default VendorForm;
