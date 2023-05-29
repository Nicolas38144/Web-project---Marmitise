import React, {useState, useEffect} from 'react'; /*,{useEffect, useState}*/
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from './components/navBar/navBar.js';
import HomeView from './views/homeView/homeView.js'
import SubmitView from './views/submitView/submitView.js';
import ContactView from './views/contactView/contactView.js'
import LoginView from './views/loginView/loginView.js';
import CocktailsView from './views/cocktailsView/cocktailsView.js'
import BarsView from './views/barsView/barsView.js';
import AdminView from './views/adminView/adminView.js';

import ImageFond from './images/fond.jpg'


import './App.css';

function App() {

    const [btnLogin,setBtnLogin]=useState(false);
    const [isLogged,setIsLogged]=useState(false);
    const [url,setUrl]=useState("");
    const [isAdmin, setIsAdmin]=useState(false);

    useEffect(() => {
        if (localStorage.getItem("isAdmin") == "true") {
            setIsAdmin(true);
        }

        const handleBeforeUnload = (event) => {
            event.preventDefault();
            localStorage.setItem('alcohols', '');
            localStorage.setItem('cocktails', '');
            localStorage.setItem('ingredients', '');
            localStorage.setItem('softs', '');
            localStorage.setItem('bars', '');
            localStorage.setItem('cocktailsBar', '');
            //localStorage.clear();
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);


    function changeStateBtnLogin(result) {
        setBtnLogin(result);
    }

    function changeIsLogged() {
        if (localStorage.getItem('token') === '' || localStorage.getItem('token') === null) {
            setIsLogged(false);
        }
        else {
            setIsLogged(true);
        }
    }

    function changeUrl(full_url) {
        const parts = full_url.split('/');
        const lastPart = parts[parts.length - 1];
        setUrl('/'+lastPart);
    }

    function changeIsAdmin(result) {
        setIsAdmin(result);
        localStorage.setItem('isAdmin', result);
        console.log("localStorage : ",localStorage.getItem('isAdmin'));
    }
    
    return (
        <div className="App">
            <Router>
                <img className="background" src={ImageFond} alt="Fond"></img>
                <NavBar className="navBar" 
                    btnLogin={btnLogin} 
                    changeStateBtnLogin={changeStateBtnLogin} 
                    isLogged={isLogged}
                    changeIsLogged={changeIsLogged}
                    changeIsAdmin={changeIsAdmin}> 
                </NavBar>
                <Routes>
                    <Route path="*" element={<h1>404: page not found</h1>}/>
                    <Route path='/' exact element={isAdmin ? <AdminView changeUrl={changeUrl} /> : <HomeView changeUrl={changeUrl} />} />
                    <Route path='/home' exact element={isAdmin ? <AdminView changeUrl={changeUrl} /> : <HomeView changeUrl={changeUrl} />} />
                    <Route path='/cocktails' exact element={<CocktailsView changeUrl={changeUrl} />}/>
                    <Route path='/bars' exact element={<BarsView changeUrl={changeUrl} />}/>
                    <Route path='/submit' exact element={<SubmitView changeUrl={changeUrl} isLogged={isLogged} />}/>
                    <Route path='/contact' exact element={<ContactView changeUrl={changeUrl} />}/>
                    <Route path='/login' exact element={
                        <LoginView 
                            url={url} 
                            btnLogin={btnLogin} 
                            changeStateBtnLogin={changeStateBtnLogin}
                            changeIsAdmin={changeIsAdmin}
                        />
                    }/>
                    {/*
                    <Route path={"/Sessions/:id"} exact element={<InfoViewSession />} />
                    <Route path={'/Sessions'} exact element={<SessionView />} />
                    <Route path={"/Athletes/:id"} exact element={<InfoViewAthlete />} />
                    <Route path={"/Athletes/:id"} exact element={<InfoTab />} />
                    <Route path={"/Bilans/:id"} exact element={<InfoTab />} />
                    <Route path='/Sessions/Create' exact element={<SessionForm type="create"/>} />
                    <Route path='/Sessions/Update' exact element={<SessionForm />} />
                    <Route path='/Athletes' exact element={<AthleteView />} />
                    <Route path='/Athletes/Create' exact element={<FormAthlete type="create" />} />
                    <Route path='/Athletes/Update' exact element={<FormAthlete />} />>
                    */}
                </Routes>
            </Router> 
        </div>
    );
}

export default App;
