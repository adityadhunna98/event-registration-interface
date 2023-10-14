import { React, useState } from "react";
import "./Userlist.css";
import "./Modal.css";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
  },
};

export default function RegisteredUsersList({ data }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="registered-users-list">
        <h2>Registered Users for the Event</h2>
        <ul>
          {data.length > 0
            ? data.map((user, index) => (
                <li key={index}>
                  <span>{user.fullName}</span>
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setUserData(data[index]);
                    }}
                  >
                    View Details
                  </button>
                </li>
              ))
            : ""}
        </ul>
        <p style={{ textAlign: "right", margin: "10px" }}>{data.length}</p>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <span className="close-button" onClick={closeModal}>
          &times;
        </span>
        <h2>User Details</h2>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            disabled
            value={userData !== "" ? userData.fullName : ""}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            disabled
            value={userData.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            disabled
            value={userData.phoneNumber}
          />
        </div>

        <div className="form-group">
          <label htmlFor="bio">Short Bio:</label>
          <textarea
            id="bio"
            name="bio"
            required
            disabled
            value={userData.bio}
          />
        </div>
      </Modal>
    </>
  );
}
