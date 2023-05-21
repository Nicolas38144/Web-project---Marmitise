import React,{useEffect} from 'react';

import './card_Home_Contact.css';

export default function Card_Home_Contact(props){

    useEffect(()=>{},[]);

    return(
        <>
        <div className='card_Home_Contact'>
            <p className='title'>{props.title}</p>
            <p className='text'>{props.text}</p>
            <p className='text2'>{props.text2}</p>
        </div>
        </>   
    );
}