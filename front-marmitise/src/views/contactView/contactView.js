import React,{useEffect} from 'react';

import CardContact from '../../components/card/cardContact';
import './contactView.css';


/*Affiche la vue quand on clique sur Sports dans la section secondaire de la barre de navigation*/
export default function ContactView(props){
    useEffect(() => {
        console.log("contactView");
        props.changeUrl(window.location.href);
    },[]);

    return(
        <div className='contactView'>
            <CardContact className="box"/>
        </div>
    );
}
