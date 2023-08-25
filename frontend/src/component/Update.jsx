import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Update = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    contact: null,
    email: "",
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/users/${id}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [id]);

  const navigate = useNavigate();
  const location = useLocation();

  const userID = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:3001/users/" + userID, user);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(user);
  return (
    <div>
      <h1>Update User Information</h1>
      <div className="form">
        <div className="user">
          <input
            type="text"
            value={user.firstname}
            onChange={handleChange}
            name="firstname"
          />
          <input
            type="text"
            value={user.lastname}
            onChange={handleChange}
            name="lastname"
          />
          <input
            type="number"
            value={user.contact}
            onChange={handleChange}
            name="contact"
          />
          <input
            type="text"
            value={user.email}
            onChange={handleChange}
            name="email"
          />
        </div>
      </div>

      <button className="formButton" onClick={handleClick}>
        Update
      </button>
    </div>
  );
};

export default Update;