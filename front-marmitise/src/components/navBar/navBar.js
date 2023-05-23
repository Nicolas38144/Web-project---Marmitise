import React,{useEffect} from 'react';
import { NavLink, useNavigate } from "react-router-dom";

import logo from '../../images/logo.png';
import './navBar.css';

export default function NavBar(props){

    var isNavOpen = false;
    const navigate = useNavigate();

    useEffect(() => {
        props.changeIsLogged();
    })

    function logOut() {
        localStorage.setItem('user', '');
        localStorage.setItem('token', '');
        props.changeStateBtnLogin(false);
        props.changeIsAdmin(false);

        const url = window.location.href;
        const parts = url.split('/');
        const lastPart = parts[parts.length - 1];
        navigate('/'+lastPart);
    }

    function logIn() {
        props.changeStateBtnLogin(true)
        navigate('/login');
    }

    function toggleNav() {
        isNavOpen = !isNavOpen;
        var elem1 = document.getElementsByClassName("navCenter2");
        var elem2 = document.getElementsByClassName("navCenter");
        if (isNavOpen) {
            elem1[0].classList.replace("navCenter2", "navCenter");
        }
        else {
            elem2[0].classList.replace("navCenter", "navCenter2");
        }
    }

    
    const navBar = (
        <>
        <div className='navBar'>
            <img className='logo' src={logo} alt="Logo" width="90" height="90"/>
            <nav className='navigation'>
                <button className="btnToggleNav" onClick={() => toggleNav()}>Menu</button>
                <NavLink className="current" to="/home"> Home </NavLink>
                <NavLink className="current" to="/cocktails"> Cocktails </NavLink>
                <NavLink className="current" to="/bars"> Bars </NavLink>
                <NavLink className="current" to="/submit"> Submit your recipes </NavLink>
                <NavLink className="current" to="/contact"> Contact </NavLink>
                {props.isLogged === false ? 
                (
                    <button className="btnLogin-popup" onClick={() => logIn()}>Login</button>
                ) : (
                    <button className="btnLogin-popup" onClick={() => logOut()}>Log out</button>
                )}
            </nav>
            <nav className='navCenter2'>
                <NavLink className="current" to="/home" onClick={() => toggleNav()}> Home </NavLink>
                <NavLink className="current" to="/cocktails" onClick={() => toggleNav()}> Cocktails </NavLink>
                <NavLink className="current" to="/bars" onClick={() => toggleNav()}> Bars </NavLink>
                <NavLink className="current" to="/submit" onClick={() => toggleNav()}> Submit your recipes </NavLink>
                <NavLink className="current" to="/contact" onClick={() => toggleNav()}> Contact </NavLink>
            </nav>
        </div>
        </>
    );

    return navBar;
}