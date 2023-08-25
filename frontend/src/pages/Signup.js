import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { Link } from "react-router-dom";
import "../css/Signup.css";

function Signup() {
  const [registerStatus, setRegisterStatus] = useState("");

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      contact: "",
    },

    validationSchema: Yup.object({
      firstname: Yup.string()
        .max(15, "Only 15 characters are needed")
        .required("Required First Name"),
      lastname: Yup.string()
        .max(15, "Only 15 characters are needed")
        .required("Required Last Name"),
      email: Yup.string().email("Wrong Email").required("Email Required"),
      password: Yup.string()
        .min(8, "Only 8 characters are needed")
        .required("Required Password"),
      contact: Yup.number()
        .max(11, "Maximum of 11 digits allowed.")
        .required("Required Password"),
    }),

    onSubmit: (values) => {
      console.log(values);
    },
  });

  const register = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/register", {
      firstname: formik.values.firstname,
      lastname: formik.values.lastname,
      contact: formik.values.contact,
      email: formik.values.email,
      password: formik.values.password,
    }).then((response) => {
      // setRegisterStatus(response);
      // console.log(response);
      if (response.data.message) {
        setRegisterStatus(response.data.message);
      } else {
        setRegisterStatus("ACCOUNT CREATED SUCCESSFULLY");
      }
    });
  };

  console.log(formik.touched);
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="box-signup">
        <h1> Register Form </h1>

        <div className="input-box-signup">
          <div className="box-names">
            <div className="input-firstname">
              <label htmlFor="firstname">First Name</label>
              <input
                className="firstname"
                name="firstname"
                type="text"
                placeholder="Input First Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstname}
                required
              />
              {formik.touched.firstname && formik.errors.firstname ? (
                <p className="error"> {formik.errors.firstname} </p>
              ) : (
                <p className="error">ㅤ</p>
              )}
            </div>

            <div className="input-lastname">
              <label htmlFor="lastname">Last Name</label>
              <input
                className="lastname"
                name="lastname"
                type="text"
                placeholder="Input Last Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastname}
                required
              />
              {formik.touched.lastname && formik.errors.lastname ? (
                <p className="error"> {formik.errors.lastname} </p>
              ) : (
                <p className="error">ㅤ</p>
              )}
            </div>
          </div>
          <div className="input-contact">
            <label htmlFor="contact">Contact Number</label>
            <input
              className="contact"
              name="contact"
              type="text"
              placeholder="Input Contact Number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contact}
              required
            />

            {formik.touched.contact && formik.errors.contact ? (
              <p className="error"> {formik.errors.contact} </p>
            ) : (
              <p className="error">ㅤ</p>
            )}
          </div>
          <div className="input-email">
            <label htmlFor="email">Email</label>
            <input
              className="email"
              name="email"
              type="email"
              placeholder="Input Email Address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              required
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="error"> {formik.errors.email} </p>
            ) : (
              <p className="error">ㅤ</p>
            )}
          </div>
          <div className="input-password">
            <label htmlFor="password">Password</label>
            <input
              className="password"
              name="password"
              type="password"
              placeholder="Input Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              required
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="error"> {formik.errors.password} </p>
            ) : (
              <p className="error">ㅤ</p>
            )}
          </div>
          <button className="signupbtn" type="submit" onClick={register}>
            Register
          </button>{" "}
          {registerStatus}
          <div className="goto-login">
            <p> Already have account! </p>{" "}
            <p>
              <Link to="/">LoginHere</Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Signup;
