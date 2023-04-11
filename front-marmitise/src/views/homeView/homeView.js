import React,{useEffect, useState} from 'react';

//import Card from '../../Components/card/card.js'
//import Title from '../../Components/title/title.js'

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

    return(
        <div className='homeView'>
            <h1>homeView</h1>
            {/* 
            <div className='titles'>
                <Title title="TABLEAU DE BORD" description="Bienvenue ! 👋"></Title>
            </div> 
            <div className="carteAdd">
                <Card name="Session" image={true}></Card>
                <Card name="Athlete" image={true}></Card>
                <Card name="Bilan" image={true}></Card>
            </div>
            <div className='carteInfo'>
                <Card name="Athletes" image={false} info={athlete}></Card>
                <Card name="Sessions" image={false} info={session}></Card>
                <Card name="Bilans" image={false} info={bilan}></Card>
                <Card name="Utilisateurs" image={false} info={1100}></Card>
            </div>
            */}
        </div>

    );
}
