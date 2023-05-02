import React,{useEffect} from 'react';
import './homeView.css';


/*Affiche la vue quand on clique sur Sports dans la section secondaire de la barre de navigation*/
export default function HomeView(props){
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

    /*function getCookie(name) {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    }
    const token = getCookie('token');*/

    

    useEffect(() => {
        /*
        console.log("btnLogin : " + props.btnLogin);
        console.log("user : " + localStorage.getItem('user'));
        */
    });

    return(
        <div className='homeView'>
        </div>

    );
}
