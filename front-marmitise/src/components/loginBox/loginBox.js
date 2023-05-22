import React,{useEffect, useState, useRef} from 'react';
import {Helmet} from "react-helmet";

import './loginBox.css';

export default function LoginBox(props){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayError, setDisplayError]=useState('')
    const emailLoginInputRef = useRef(null);
    const passwordLoginInputRef = useRef(null);
    const emailRegisterInputRef = useRef(null);
    const passwordRegisterInputRef = useRef(null);

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
            //pour automatiquement revenir sur login si on quitte sur register
            wrapper.classList.remove('active');
            emptyInputs();
        });
    })

    function closeLoginBox() {
        const wrapper = document.querySelector('.wrapper');
        wrapper.classList.remove('active-popup');
        props.changeStateBtnLogin(false);
        emptyInputs();
    }
    
    function passRegisterToLogin(){
        const wrapper = document.querySelector('.wrapper');
        wrapper.classList.remove('active');
    }

    function treatmentData(data, dataUser) {
        if (data.message === 'Login successful !') {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', dataUser.email);
            if (data.admin === true) {
                props.changeIsAdmin(true);
            }
            else {
                props.changeIsAdmin(false);
            }
            closeLoginBox();
        }
        else {
            setDisplayError(data.message);
        }
    }

    function emptyInputs() {
        emailLoginInputRef.current.value = '';
        passwordLoginInputRef.current.value = '';
        emailRegisterInputRef.current.value = '';
        passwordRegisterInputRef.current.value = '';
        setEmail('');
        setPassword('');
        setDisplayError('');
    }

    
    const handleSubmitRegister = (e) => {
        e.preventDefault();
        const data = {email, password};

        fetch('https://api-marmitise.onrender.com/api/register', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .then(passRegisterToLogin())
        .catch(error => console.error(error));
    }

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        const dataUser = {email, password};

        fetch('https://api-marmitise.onrender.com/api/login', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(dataUser)
        })
        .then(response => response.json())
        .then(data => treatmentData(data, dataUser))
        .catch(error => console.error(error));
    }

    return(
        <>
        <div className='loginBox'>
            <div className='wrapper'>
                <span className='icon-close'><ion-icon name="close-outline"></ion-icon></span>
                
                <div className='form-box-login'>
                    <h2>Login</h2>
                    <form action='javascrit:' onSubmit={handleSubmitLogin}>
                        <div className='input-box'>
                            <span className='icon'><ion-icon name="mail"></ion-icon></span>
                            <input ref={emailLoginInputRef} type='email' required onChange={(e) => setEmail(e.target.value)}></input>
                            <label>Email</label>
                        </div>
                        <div className='input-box'>
                            <span className='icon'><ion-icon name="lock-closed"></ion-icon></span>
                            <input ref={passwordLoginInputRef} type='password' required onChange={(e) => setPassword(e.target.value)}></input>
                            <label>Password</label>
                        </div>
                        <button type='submit' className='btn'>Login</button>
                        <div className='login-register'>
                            <p>Don't have an account ? <span className='register-link'>Register</span></p>
                            <p className='login-erreur'>{displayError}</p>
                        </div>
                    </form>
                </div>

                <div className='form-box-register'>
                    <h2>Registration</h2>
                    <form action='javascrit:' onSubmit={handleSubmitRegister}>
                        <div className='input-box'>
                            <span className='icon'><ion-icon name="mail"></ion-icon></span>
                            <input ref={emailRegisterInputRef} type='email' required onChange={(e) => setEmail(e.target.value)}></input>
                            <label>Email</label>
                        </div>
                        <div className='input-box'>
                            <span className='icon'><ion-icon name="lock-closed"></ion-icon></span>
                            <input ref={passwordRegisterInputRef} type='password' required onChange={(e) => setPassword(e.target.value)}></input>
                            <label>Password</label>
                        </div>
                        <button type='submit' className='btn'>Register</button>
                        <div className='login-register'>
                            <p>Already have an account ? <span className='login-link'>Login</span></p>
                            
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