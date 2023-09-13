import React, { useState } from 'react';
import '../css/LoginForm.css';
import Axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../component/AuthContext';

function LoginForm() {
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState('');
    const { isLoggedIn, setIsLoggedIn } = useAuth();
  
    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: Yup.object({
        email: Yup.string().email('Wrong Email').required('Email Required'),
        password: Yup.string().min(8, 'Only 8 characters are needed').required('Required Password'),
      }),
      onSubmit: (values) => {
        Axios.post('http://localhost:3001/login', {
          email: values.email,
          password: values.password,
        }).then((response) => {
          if (response.data.message) {
            setLoginStatus(response.data.message);
          } else {
            setIsLoggedIn(true);
            navigate('/Home');
          }
        });
      },
    });
  
    return (
      <form onSubmit={formik.handleSubmit}>
        <div className="login-container">
          <div className="login-box">
            <div className="header">
              <h3>LOGIN</h3>
            </div>
            <div className="content">
              <div className="input-box">
                <input
                  type="email"
                  placeholder=" "
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                <span className={formik.values.email ? 'active' : ''}>email</span>
                <span></span>
              </div>
              {formik.touched.email && formik.errors.email ? (
                <p className="error">{formik.errors.email}</p>
              ) : null}
              <div className="input-box">
                <input
                  type="password"
                  placeholder=" "
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                
                  onBlur={formik.handleBlur}
                  required
                />
                <span className={formik.values.password ? 'active' : ''}>password</span>
                <span></span>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <p className="error">{formik.errors.password}</p>
              ) : null}
              <div className="input-box">
                <button className="loginbtn" type="submit">
                  Login
                </button>{" "}
                {loginStatus}
                <div className="goto-register">
                  <p>
                    No Account Yet! <Link to="/Signup">Register Here</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
  
  export default LoginForm;