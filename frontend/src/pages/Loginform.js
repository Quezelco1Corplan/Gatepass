import { useState, useEffect } from 'react';
import {  useNavigate, useHistory  } from 'react-router-dom';
import { useAuth } from '../component/AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import '../css/LoginForm.css';
// import { } from 'react-router-dom';

function LoginForm() {
    const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
//   const [login, setLogin] = useState({ susername: '', password: '' });
  const [loginStatus, setLoginStatus] = useState('');
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [registerStatus, setRegisterStatus] = useState('');
//   const [login, setLogin] = useState({ username: '', password: '' });



const register = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/register", {
      firstname: formik.values.firstname,
      lastname: formik.values.lastname,
      contact: formik.values.contact,
      email: formik.values.email,
      password: formik.values.password,
    }).then((response) => {
      if (response.data.message) {
        setRegisterStatus(response.data.message);
      } else {
        setRegisterStatus("ACCOUNT CREATED SUCCESSFULLY");
        history.push("/"); // Update this line to use history.push instead of window.location.href
      }
    });
  };

    const formik = useFormik (
        {
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
    
        onSubmit: (values, { setSubmitting }) => {
            Axios.post("http://localhost:3001/login", {
              email: values.email,
              password: values.password,
            }).then((response) => {
              if (response.data.message) {
                setLoginStatus(response.data.message);
              } else {
                setIsLoggedIn(true);
                history.push("/Home"); // Update this line to use history.push instead of navigate
              }
              setSubmitting(false);
            });
          },
    });

    const login = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/login", {
          email: formik.values.email,
          password: formik.values.password,
        }).then((response) => {
          if (response.data.message) {
            setLoginStatus(response.data.message);
          } else {
            setIsLoggedIn(true);
            navigate("/Home");
          }
        });
      };

    

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/Home");
    }
  }, [navigate, isLoggedIn]);

    const handleBoxClick = () => {
        setIsOpen(true);
    }

    const handleCloseClick = (e) => {
        e.stopPropagation();
        setIsOpen(false);
    }

    // const handleInputChange = (e, setState, field) => {
    //     setState(prevState => ({ ...prevState, [field]: e.target.value }));
    // }

    return (
        
        <div className="login-container">
            <form onSubmit={formik.handleSubmit}>
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
                        <span className={login.username ? 'active' : ''}>Email</span>
                        <span></span>
                        {formik.touched.email && formik.errors.email ? (
                <p className="error">{formik.errors.email}</p>
              ) : null}
                    </div>
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
                        <span className={login.password ? 'active' : ''}>password</span>
                        <span></span>
                        {formik.touched.password && formik.errors.password ? (
                <p className="error">{formik.errors.password}</p>
              ) : null}
                    </div>
                    <div className="input-box">
                        <button className="loginbtn" type="submit" >SIGN IN</button>
                        {" "}
                {loginStatus}
                        <div>
                            <p href="#">Forgot your password?</p>
                        </div>
                    </div>
                </div>
            </div>
            </form>
            <div className={`login-box register-box ${isOpen ? 'open' : ''}`} onClick={handleBoxClick}>
                <span className="close" onClick={handleCloseClick}>+</span>
                <div className="header">
                    <h3>REGISTER</h3>
                </div>
                <div className="content">
                    <div className='name-space'>
                        <div className="input-box">
                            <input 
                                type="text" 
                                name="firstname"
                                placeholder="Input First Name"
                                value={formik.values.firstname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} 
                                required/>
                            <span className={register.username ? 'active' : ''}>First Name</span>
                            <span></span>
                            {formik.touched.firstname && formik.errors.firstname ? (
                <p className="error"> {formik.errors.firstname} </p>
              ) : (
                <p className="error">ㅤ</p>
              )}
                        </div>
                        <div className="input-box">
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
                            <span className={register.lastName ? 'active' : ''}>Last name</span>
                            <span></span>
                            {formik.touched.lastname && formik.errors.lastname ? (
                <p className="error"> {formik.errors.lastname} </p>
              ) : (
                <p className="error">ㅤ</p>
              )}
                        </div>
                    </div>
                    <div className="input-box">
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
                        <span className={register.contact ? 'active' : ''}>contact</span>
                        <span></span>
                        {formik.touched.contact && formik.errors.contact ? (
              <p className="error"> {formik.errors.contact} </p>
            ) : (
              <p className="error">ㅤ</p>
            )}
                    </div>
                    
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
                        <span className={register.email ? 'active' : ''}>email</span>
                        <span></span>
                        {formik.touched.email && formik.errors.email ? (
              <p className="error"> {formik.errors.email} </p>
            ) : (
              <p className="error">ㅤ</p>
            )}
                    </div>
                    <div className="input-box">
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
                        <span className={register.password ? 'active' : ''}>password</span>
                        <span></span>
                        {formik.touched.password && formik.errors.password ? (
              <p className="error"> {formik.errors.password} </p>
            ) : (
              <p className="error">ㅤ</p>
            )}
                    </div>
                
                    <div className="input-box" >
                        <button className="signupbtn" type="submit" onClick={register}>
                            SING UP
                            </button>{" "}
          {registerStatus}      
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;