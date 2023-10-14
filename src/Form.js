import React, { useState } from "react";
import "./Form.css";
import UserList from "./UserList";
function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    bio: "",
  });

  const [phoneErrors, setphoneErrors] = useState({
    phoneNumber: "",
  });
  const [data, setData] = useState(
    localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : []
  );
  //console.log("data from form", data);
  const validateNumber = () => {
    const { phoneNumber } = formData;
    const errors = {};

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneNumber || !phoneNumber.match(phoneRegex)) {
      errors.phoneNumber = "Please enter a valid 10-digit phone number";
    }

    setphoneErrors(errors);
    //console.log(errors, phoneErrors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateNumber()) {
      //console.log("Form submitted:");
      let data = localStorage.getItem("data")
        ? JSON.parse(localStorage.getItem("data"))
        : [];
      data.push(formData);
      const arrayString = JSON.stringify(data);
      localStorage.setItem("data", arrayString);
      setData(data);
      let obj={
        fullName: "",
        email: "",
        phoneNumber: "",
        bio: "",
      }
      setFormData(obj)
      window.alert("Submitted")
    } else {
      console.log("Form has validation errors");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="registration-form">
        <h2>Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              required
              onChange={handleChange}
            />
            {phoneErrors.phoneNumber && (
              <span className="error-text">{phoneErrors.phoneNumber}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="bio">Short Bio:</label>
            <textarea
              id="bio"
              name="bio"
              required
              value={formData.bio}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <UserList data={data} />
    </>
  );
}

export default RegistrationForm;
