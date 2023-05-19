import React,{useEffect} from 'react'

import CardSubmit from '../../components/card/cardSubmit';

import './submitView.css'


/*Affiche la vue quand on clique sur Sports dans la section secondaire de la barre de navigation*/
export default function SubmitView(props){
    useEffect(() => {
        props.changeUrl(window.location.href);
    },[]);

    return(
        <div className='submitView'>
            <CardSubmit className='cardSubmit' isLogged={props.isLogged}/>
        </div>
    );
}