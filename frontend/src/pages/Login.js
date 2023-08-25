import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../component/AuthContext";
import '../css/Login.css'

function Login() {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Wrong Email").required("Email Required"),
      password: Yup.string()
        .min(8, "Only 8 characters are needed")
        .required("Required Password"),
    }),

    onSubmit: (values) => {
      Axios.post("http://localhost:3001/login", {
        email: values.email,
        password: values.password,
      }).then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);
        } else {
          setIsLoggedIn(true);
          navigate("/Home");
        }
      });
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/Home");
    }
  }, [navigate, isLoggedIn]);

  // const login = (e) => {
  //   e.preventDefault();
  //   Axios.post("http://localhost:3001/login", {
  //     email: formik.values.email,
  //     password: formik.values.password,
  //   }).then((response) => {
  //     if (response.data.message) {
  //       setLoginStatus(response.data.message);
  //     } else {
  //       setIsLoggedIn(true);
  //       navigate("/Dashboard");
  //     }
  //   });
  // };

  console.log(formik.touched);
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="box-login">
        <h1> Login Form </h1>

        <div className="input-box-login">
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
          <button className="loginbtn" type="submit">
            Login
          </button>{" "}
          {loginStatus}
          <div className="goto-register">
            <p>
              {" "}
              No Account Yet! <Link to="/Signup">Register Here</Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
