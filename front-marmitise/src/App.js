import React, {useState} from 'react'; /*,{useEffect, useState}*/
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from './components/navBar/navBar.js';
import HomeView from './views/homeView/homeView.js'
import ContactView from './views/contactView/contactView.js'
import LoginView from './views/loginView/loginView.js';


import './App.css';

function App() {

    const [btnLogin,setBtnLogin]=useState(false);
    const [isLogged,setIsLogged]=useState(false);

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
    
    return (
        <div className="App">
            <Router>
                <NavBar className="navBar" 
                    btnLogin={btnLogin} 
                    changeStateBtnLogin={changeStateBtnLogin} 
                    isLogged={isLogged}
                    changeIsLogged={changeIsLogged}> 
                </NavBar>
                <Routes>
                    <Route path="*" element={<h1>404: page not found</h1>}/>
                    <Route path='/' exact element={<HomeView />}/>
                    <Route path='/home' exact element={<HomeView />}/>
                    <Route path='/cocktails' exact element={<HomeView />}/>
                    <Route path='/bars' exact element={<HomeView />}/>
                    <Route path='/submit' exact element={<HomeView />}/>
                    <Route path='/contact' exact element={<ContactView />}/>
                    <Route path='/login' exact element={<LoginView btnLogin={btnLogin} changeStateBtnLogin={changeStateBtnLogin}/>}/>
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
