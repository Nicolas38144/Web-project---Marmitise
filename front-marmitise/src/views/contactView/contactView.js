import React,{useEffect} from 'react';

import Card_Home_Contact from '../../components/card/card_Home_Contact';
import './contactView.css';


/*Affiche la vue quand on clique sur Sports dans la section secondaire de la barre de navigation*/
export default function ContactView(props){
    useEffect(() => {
        props.changeUrl(window.location.href);
    },[]);

    return(
        <div className='contactView'>
            <Card_Home_Contact 
                className="boxContact"
                title="Contact us"
                text="If you want to delete your account, send an email with the email you used when you registered to :"
                text2="ni3co8.germani@gmail.com"
            />
        </div>
    );
}
