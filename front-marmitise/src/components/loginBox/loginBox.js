import React,{useEffect, useState} from 'react';
import {Helmet} from "react-helmet";

import './loginBox.css';


export default function LoginBox(props){

    useEffect(()=>{
        const wrapper = document.querySelector('.wrapper');
        const loginLink = document.querySelector('.login-link');
        const registerLink = document.querySelector('.register-link');
        const iconClose = document.querySelector('.icon-close');

        registerLink.addEventListener('click', ()=> {
            wrapper.classList.add('active');
        });

        loginLink.addEventListener('click', ()=> {
            wrapper.classList.remove('active');
        });

        // quand on appuie sur le btn Login
        if (props.btnLogin===true) {
            wrapper.classList.add('active-popup');
        }

        // quand on appuie sur la croix
        iconClose.addEventListener('click', ()=> {
            wrapper.classList.remove('active-popup');
            props.changeStateBtnLogin(false);
        });
    })

    return(
        <>
        <div className='loginBox'>
            <div className='wrapper'>
                <span className='icon-close'><ion-icon name="close-outline"></ion-icon></span>
                
                <div className='form-box-login'>
                    <h2>Login</h2>
                    <form action='#'>
                        <div className='input-box'>
                            <span className='icon'><ion-icon name="mail"></ion-icon></span>
                            <input type='email' required></input>
                            <label>Email</label>
                        </div>
                        <div className='input-box'>
                            <span className='icon'><ion-icon name="lock-closed"></ion-icon></span>
                            <input type='password' required></input>
                            <label>Password</label>
                        </div>
                        <button type='submit' className='btn'>Login</button>
                        <div className='login-register'>
                            <p>Don't have an account ? <a href='#' className='register-link'>Register</a></p>
                            
                        </div>
                    </form>
                </div>

                <div className='form-box-register'>
                    <h2>Registration</h2>
                    <form action='#'>
                        <div className='input-box'>
                            <span className='icon'><ion-icon name="mail"></ion-icon></span>
                            <input type='email' required></input>
                            <label>Email</label>
                        </div>
                        <div className='input-box'>
                            <span className='icon'><ion-icon name="lock-closed"></ion-icon></span>
                            <input type='password' required></input>
                            <label>Password</label>
                        </div>
                        <button type='submit' className='btn'>Register</button>
                        <div className='login-register'>
                            <p>Already have an account ? <a href='#' className='login-link'>Login</a></p>
                            
                        </div>
                    </form>
                </div>

            </div>
        </div>
        <Helmet>
            <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
            <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
        </Helmet>
        </>
        
    );
}