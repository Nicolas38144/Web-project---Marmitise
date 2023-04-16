import React,{useEffect} from 'react';
import { NavLink } from "react-router-dom";

import logo from '../../images/logo.png';

import './navBar.css';

export default function NavBar(props){
    useEffect(() => {
        /*const btnLogin = document.querySelector('.btnLogin-popup');
        btnLogin.addEventListener('click', ()=> {
            props.changeStateBtnLogin(true);
        });*/
    })

    function logOut() {
        props.changeTextLogin(false);
        props.setCurrentUser('');
    }
    
    const navBarLogIn = (
        <>
        <div className='navBar'>
            <img className='logo' src={logo} alt="Logo" width="90" height="90"/>
            <nav className='navigation'>
                <NavLink className="current" to="/"> Home </NavLink>
                <NavLink className="current" to="/"> About </NavLink>
                <NavLink className="current" to="/"> Services </NavLink>
                <NavLink className="current" to="/"> Homes </NavLink>
                <NavLink className="current" to="/"> Contact </NavLink>
                <button className='btnLogin-popup' onClick={() => props.changeStateBtnLogin(true)}>Login</button>
            </nav>
        </div>
        </>
    );

    const navBarLogOut = (
        <>
        <div className='navBar'>
            <img className='logo' src={logo} alt="Logo" width="90" height="90"/>
            <nav className='navigation'>
                <NavLink className="current" to="/"> Home </NavLink>
                <NavLink className="current" to="/"> About </NavLink>
                <NavLink className="current" to="/"> Services </NavLink>
                <NavLink className="current" to="/"> Homes </NavLink>
                <NavLink className="current" to="/"> Contact </NavLink>
                <button className='btnLogin-popup' onClick={() => logOut()}>Log out</button>
            </nav>
        </div>
        </>
    );

    if (props.isLogged === false) {
        return navBarLogIn; 
    }
    else {
        return navBarLogOut;
    }
    
}