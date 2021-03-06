import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import * as AiIcon from "react-icons/ai";
import "./Login.css";
import axios from 'axios'
import * as AiIcons from 'react-icons/ai'

function Login(props) {
    //Set Modal Active
    const sendData = (modalState) => {
        props.ModalState(modalState);
    }
    //Login
    //Lấy Bearer Token
    const tokenBearer = localStorage.getItem("tokenBearer");
    const [selectedUsername, setUsername] = useState("")
    const [selectedPassword, setPassword] = useState("")
    const [checkError, setError] = useState("")
    const navigate = useNavigate();
    function Login(selectedUsername, selectedPassword) {
        axios({
            method: 'post',
            url: 'http://localhost:5000/auth/signin',
            data: {
                userName: selectedUsername,
                password: selectedPassword
            }
        }).then((response) => {
            navigate('/homepage')
            localStorage.setItem("tokenBearer", response.data.token);
            console.log(response.data)
            // localStorage.setItem("usernameId",response.data.)
        }).catch(function (error) {
            if (error.response) {
                setError("Error")
            }
        })
    }
    //Register
    const [selectedButt, setButt] = useState("")
    // const [selectedUsername, setUsername] = useState("")
    // const [selectedPassword, setPassword] = useState("")
    const [selectedEmail, setEmail] = useState("")
    const [selectedFirstName, setFirstName] = useState("")
    const [selectedLastName, setLastName] = useState("")
    const [selectedPhone, setPhone] = useState("")
    function addMember() {
        axios({
            method: 'post',
            url: `http://localhost:5000/api/users/`,
            data: {
                userName: selectedUsername,
                password: selectedPassword,
                role: "USER",
                email: selectedEmail,
                firstName: selectedFirstName,
                lastName: selectedLastName,
                phone: selectedPhone,
            },
            headers: {
                'Authorization': `bearer ${tokenBearer}`,
                'Content-Type': 'application/json'
            },
        }).then(() => {
            props.setRequestData(new Date());
        })
    }
    return (
        <>
            {/* <div className={values.redirectToReferrer ? "modal--unactive" : "modal"}> */}
            <div className="modal">
                <div className="modal__overlay"></div>
                <div className="modal__body">
                    {checkError === "Error" ?
                        <div class="auth-form auth-form--error">
                            <div className="error__content">
                                <h2 className="error__content--warn">
                                    WARNING
                                    <AiIcons.AiFillWarning className="deletemember__content deletemember__content-icon" />
                                </h2>
                                Username or Password is not matched!!
                            </div>
                            <div className="error__footer">
                                <button className="error__btn error__btn-cancel"
                                    onClick={() => setError("")}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                        :
                        <div class="auth-form">
                            <div class="auth-form__container">
                                <div class="auth-form__header">
                                    <button class="auth-form__switch-btn">
                                        <h3 class="auth-form__heading"
                                            onClick={() => {
                                                setButt("Login")
                                            }}
                                        >
                                            Login
                                        </h3>
                                    </button>
                                    {/* <button class={selectedButt === "Register" ? "auth-form__switch-register" : "auth-form__switch-btn"}
                                        onClick={() => {
                                            setButt("Register")
                                        }}
                                    >Đăng kí</button> */}
                                </div>
                                {selectedButt === "Register" ?
                                    <div class="auth-form__form">
                                        <div className="newcustomer__content-list">
                                            <div className="newcustomer__content-item">
                                                <div className="newcustomer__lable">
                                                    USERNAME:
                                                </div>
                                                <div className="newcustomer__input">
                                                    <input type="text" className="newcustomer__form" placeholder="Username" onChange={e => setUsername(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="newcustomer__content-item">
                                                <div className="newcustomer__lable">
                                                    PASSWORD:
                                                </div>
                                                <div className="newcustomer__input">
                                                    <input type="password" className="newcustomer__form" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="newcustomer_idtent-item">
                                                <div className="newcustomer__lable">
                                                    EMAIL:
                                                </div>
                                                <div className="newcustomer__input">
                                                    <input type="text" className="newcustomer__form" placeholder="User's email" onChange={e => setEmail(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="newcustomer__content-item">
                                                <div className="newcustomer__lable">
                                                    FIRST NAME:
                                                </div>
                                                <div className="newcustomer__input">
                                                    <input type="text" className="newcustomer__form" placeholder="User's first name" onChange={e => setFirstName(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="newcustomer__content-item">
                                                <div className="newcustomer__lable">
                                                    LAST NAME:
                                                </div>
                                                <div className="newcustomer__input">
                                                    <input type="text" className="newcustomer__form" placeholder="User's last name" onChange={e => setLastName(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="newcustomer_idtent-item">
                                                <div className="newcustomer__lable">
                                                    PHONE:
                                                </div>
                                                <div className="newcustomer__input">
                                                    <input type="text" className="newcustomer__form" placeholder="User's phone" onChange={e => setPhone(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div class="auth-form__form">
                                        <div class="auth-form__group">
                                            <input
                                                id="userName"
                                                type="string"
                                                class="auth-form__input"
                                                onChange={e => {
                                                    setUsername(e.target.value)
                                                }}
                                                placeholder="Your username"
                                            />
                                            <input
                                                id="password"
                                                type="password"
                                                onChange={e => {
                                                    setPassword(e.target.value)
                                                }}
                                                class="auth-form__input"
                                                placeholder="Your password"
                                            />
                                        </div>
                                    </div>
                                }
                                <div class="auth-form__controls">
                                    {/* <button class="btn btn--normal auth-form__controls-back">TRỞ LẠI</button> */}
                                    {selectedButt === "Register" ?
                                        <button
                                            class="auth-form__btn auth-form__btn--register"
                                            onClick={() => {
                                                Login(selectedUsername, selectedPassword)
                                            }}
                                        >
                                            Register
                                        </button>
                                        :
                                        <button
                                            class="auth-form__btn auth-form__btn--login"
                                            onClick={() => {
                                                Login(selectedUsername, selectedPassword)
                                            }}
                                        >
                                            Login
                                        </button>
                                    }
                                    {/* </Link> */}
                                </div>
                            </div>
                            <br />
                            {/* <div class="auth-form__social">
                            <a
                                href=""
                                class="auth-form__social--facbebook btn btn--size-s btn--with-icon"
                            >
                                <AiIcon.AiFillFacebook class="auth-form__social-icon fab fa-facebook-square" />
                                <span class="auth-form__socials-title">
                                    Login with Facebook
                                </span>
                            </a>
                            <a
                                href=""
                                class="auth-form__social--google btn btn--size-s btn--with-icon"
                            >
                                <AiIcon.AiFillGoogleCircle class="auth-form__social-icon fab fa-google" />
                                <span class="auth-form__socials-title">Login with Google</span>
                            </a>
                        </div> */}
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default Login;
