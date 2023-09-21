import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../component/AuthContext";
import * as LoginStyles from "../css/Login.styles";

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
        .max(20, "Maximum 20 characters allowed")
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

  console.log(formik.touched);
  return (
    <>
      <LoginStyles.LoginBody>
        <LoginStyles.LoginContainer>
          <LoginStyles.LoginForm onSubmit={formik.handleSubmit}>
            <LoginStyles.LoginData>
              <h1>Sign IN</h1>
            </LoginStyles.LoginData>
            <LoginStyles.LoginData>
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
              <LoginStyles.error>
                {formik.touched.email && formik.errors.email ? (
                  <p className="error"> {formik.errors.email} </p>
                ) : (
                  <p className="error">ㅤ</p>
                )}
              </LoginStyles.error>
            </LoginStyles.LoginData>

            <LoginStyles.LoginData>
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
              <LoginStyles.error>
                {formik.touched.password && formik.errors.password ? (
                  <p className="error"> {formik.errors.password} </p>
                ) : (
                  <p className="error">ㅤ</p>
                )}
              </LoginStyles.error>
            </LoginStyles.LoginData>

            <LoginStyles.LoginData>
              <button className="loginbtn" type="submit">
                Login
              </button>

              <LoginStyles.error>{loginStatus}</LoginStyles.error>
              <p>
                {" "}
                No Account Yet! <Link to="/Signup">Register Here</Link>
              </p>
            </LoginStyles.LoginData>
          </LoginStyles.LoginForm>
        </LoginStyles.LoginContainer>
      </LoginStyles.LoginBody>
    </>
  );
}

export default Login;
