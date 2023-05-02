import React,{useEffect} from 'react';
import { NavLink, useNavigate } from "react-router-dom";

import logo from '../../images/logo.png';
import './navBar.css';

export default function NavBar(props){

    useEffect(() => {
        props.changeIsLogged();
        console.log(props.isLogged);
    })
    const navigate = useNavigate();

    function logOut() {
        localStorage.setItem('user', '');
        localStorage.setItem('token', '');
        props.changeStateBtnLogin(false);
        navigate('/home');
    }

    function logIn() {
        props.changeStateBtnLogin(true)
        navigate('/login');
    }
    

    const navBarLogIn = (
        <>
        <div className='navBar'>
            <img className='logo' src={logo} alt="Logo" width="90" height="90"/>
            <nav className='navigation'>
                <NavLink className="current" to="/home"> Home </NavLink>
                <NavLink className="current" to="/cocktails"> Cocktails </NavLink>
                <NavLink className="current" to="/bars"> Bars </NavLink>
                <NavLink className="current" to="/submit"> Submit your recipes </NavLink>
                <NavLink className="current" to="/contact"> Contact </NavLink>
                <button className='btnLogin-popup' onClick={() => logIn()}>Login</button>
            </nav>
        </div>
        </>
    );

    const navBarLogOut = (
        <>
        <div className='navBar'>
            <img className='logo' src={logo} alt="Logo" width="90" height="90"/>
            <nav className='navigation'>
            <NavLink className="current" to="/home"> Home </NavLink>
                <NavLink className="current" to="/cocktails"> Cocktails </NavLink>
                <NavLink className="current" to="/bars"> Bars </NavLink>
                <NavLink className="current" to="/submit"> Submit your recipes </NavLink>
                <NavLink className="current" to="/contact"> Contact </NavLink>
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
