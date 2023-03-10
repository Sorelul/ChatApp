import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/signup.jpg';

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL:'',
}

const cookies = new Cookies;

const Auth = () => {

    const [isSignUp, setIsSignUp] = useState(true);
    const [form,setForm] = useState(initialState);


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }


    const switchMode = () => {
        setIsSignUp((prevIsSignUp)=> !prevIsSignUp);
    }


    const handleSubmit = async(e) => {
        e.preventDefault();
        const {fullName,username,password,phoneNumber,avatarURL}= form;
        const URL = 'http://localhost:5000/auth';

        const {data : {token,userId,hashedPassword}} = await axios.post(`${URL}/${isSignUp ? 'signup' : 'signin'}`,{
            username,password,fullName,phoneNumber,avatarURL,
        });

        cookies.set('token',token);
        cookies.set('username',username);
        cookies.set('fullName',fullName);
        cookies.set('userId',userId);

        if(isSignUp){
            cookies.set('phoneNumber',phoneNumber);
            cookies.set('avatarURL',avatarURL);
            cookies.set('hashedPassword',hashedPassword);
        }

        window.location.reload();

    }


    return (
        <div className='auth__form-container'>
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignUp ? 'Sign up' : 'Sign in'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignUp && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='fullName'>
                                    Full Name
                                </label>
                                <input
                                    name="fullName"
                                    type='text'
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required
                                >

                                </input>
                            </div>
                        )}

                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='username'>
                                Username
                            </label>
                            <input
                                name="username"
                                type='text'
                                placeholder="Username"
                                onChange={handleChange}
                                required
                            >

                            </input>
                        </div>

                        {isSignUp && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='phoneNumber'>
                                    Phone Number
                                </label>
                                <input
                                    name="phoneNumber"
                                    type='text'
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    required
                                >

                                </input>
                            </div>
                        )}
                        {isSignUp && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='avatarURL'>
                                    Avatar URL
                                </label>
                                <input
                                    name="avatarURL"
                                    type='text'
                                    placeholder="Avatar URL"
                                    onChange={handleChange}
                                    required
                                >

                                </input>
                            </div>
                        )}

                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='password'>
                                Password
                            </label>
                            <input
                                name="password"
                                type='password'
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            >
                            </input>
                        </div>

                        {isSignUp && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='confirmPassword'>
                                    Confirm Password
                                </label>
                                <input
                                    name="confirmPassword"
                                    type='password'
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                >
                                </input>
                            </div>
                        )}

                     <div className='auth__form-container_fields-content_button'>
                            <button>
                                {isSignUp ? "Sign Up" : "Sign in"}
                            </button>
                    </div>   
                    </form>

                    <div className='auth__form-container_fields-account'>
                        <p>
                            {isSignUp ? 'Already have an account ?' : "Don't have an account ?"}
                            <span onClick={switchMode}>
                            {isSignUp ? "Sign In" : "Sign Up"}
                            </span>
                        </p>
                    </div>


                </div>
            </div>

            <div className='auth__form-container_image'>
                <img src={signinImage} alt="Sign In"/>
            </div>

        </div>
    )
}

export default Auth