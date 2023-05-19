import React, {useState, useEffect} from 'react'; /*,{useEffect, useState}*/
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from './components/navBar/navBar.js';
import HomeView from './views/homeView/homeView.js'
import SubmitView from './views/submitView/submitView.js';
import ContactView from './views/contactView/contactView.js'
import LoginView from './views/loginView/loginView.js';
import CocktailsView from './views/cocktailsView/cocktailsView.js'

import ImageFond from './images/fond.jpg'


import './App.css';

function App() {
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            localStorage.clear();
        };
        /*window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };*/
    }, []);


    const [btnLogin,setBtnLogin]=useState(false);
    const [isLogged,setIsLogged]=useState(false);
    const [url,setUrl]=useState("");

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
    
    return (
        <div className="App">
            <Router>
                <img className="background" src={ImageFond} alt="Image de fond"></img>
                <NavBar className="navBar" 
                    btnLogin={btnLogin} 
                    changeStateBtnLogin={changeStateBtnLogin} 
                    isLogged={isLogged}
                    changeIsLogged={changeIsLogged}> 
                </NavBar>
                <Routes>
                    <Route path="*" element={<h1>404: page not found</h1>}/>
                    <Route path='/' exact element={<HomeView changeUrl={changeUrl}/>}/>
                    <Route path='/home' exact element={<HomeView changeUrl={changeUrl} />}/>
                    <Route path='/cocktails' exact element={<CocktailsView changeUrl={changeUrl} />}/>
                    <Route path='/bars' exact element={<HomeView changeUrl={changeUrl} />}/>
                    <Route path='/submit' exact element={<SubmitView changeUrl={changeUrl} isLogged={isLogged} />}/>
                    <Route path='/contact' exact element={<ContactView changeUrl={changeUrl} />}/>
                    <Route path='/login' exact element={<LoginView url={url} btnLogin={btnLogin} changeStateBtnLogin={changeStateBtnLogin} />}/>
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
