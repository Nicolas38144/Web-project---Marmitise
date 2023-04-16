import React,{useEffect, useState} from 'react';

import NavBar from '../../components/navBar/navBar.js'
import LoginBox from '../../components/loginBox/loginBox.js'

import './homeView.css';


/*Affiche la vue quand on clique sur Sports dans la section secondaire de la barre de navigation*/
export default function AccueilView(){
  /*
  const [athlete,setAthlete]=useState(0);
  const [session,setSession]=useState(0);
  const [bilan,setBilan]=useState(0);
  
  useEffect(() => {
    getAthletes()
    getBilans();
    getSessions();
  },[]);
  function getAthletes(){

    fetch('http://localhost:8080/api/athlete/',{
    })
    .then((response) => { 
      response.json().then((data) => {
          setAthlete(data.length);
          // console.log(nbAthlete);
      }).catch((err) => {
          console.log(err);
      })
    })
  }
  function getSessions(){
    fetch('http://localhost:8080/api/session/',{
    })
    .then((response) => { 
      response.json().then((data) => {
          setSession(data.length);
          // console.log(nbSessions);
      }).catch((err) => {
          console.log(err);
      })
    })
  }
  function getBilans(){
    fetch('http://localhost:8080/api/bilan/',{
    })
    .then((response) => {
      response.json().then((data) => {
          setBilan(data.length);
          // console.log(nbBilans);
      }).catch((err) => {
        console.log("err","error");
      })
    })
  }
  */

    const [btnLogin,setBtnLogin]=useState(false);
    const [isLogged, setIsLogged]=useState(false);
    const [user, setUser]=useState('');

    function changeStateBtnLogin(result) {
        setBtnLogin(result);
    }

    function changeTextLogin(result) {
        setIsLogged(result);
    }

    function setCurrentUser(elem) {
        setUser(elem);
    }

    useEffect(() => {
        console.log("btnLogin : " + btnLogin);
        console.log("isLogged : " + isLogged);
        console.log("user : " + user);
    });

    return(
        <div className='homeView'>
            <NavBar className="Router"
                btnLogin={btnLogin} 
                changeStateBtnLogin={changeStateBtnLogin} 
                isLogged={isLogged} 
                setCurrentUser={setCurrentUser} 
                changeTextLogin={changeTextLogin} 
            />
            <LoginBox className='loginBox'  
                btnLogin={btnLogin} 
                changeStateBtnLogin={changeStateBtnLogin} 
                setCurrentUser={setCurrentUser} 
                changeTextLogin={changeTextLogin} 
            />
        </div>

    );
}
