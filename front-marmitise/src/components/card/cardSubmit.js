import React,{useEffect} from 'react';

import './cardSubmit.css';

export default function CardSubmit(props){

    useEffect(()=>{},[]);

    const cardSubmit_logout = (
        <>
        <div className='cardSubmit-logout'>
            <p className='text'>
                You have to login if you want create and submit your own cocktail !
            </p>
        </div>
        </>
    )

    const cardSubmit_login = (
        <>
        <div className='cardSubmit-login'>
            <p className='text'>
                You logged !
            </p>
        </div>
        </>
    )

    if (props.isLogged === true) {
        return cardSubmit_login;
    }
    else {
        return cardSubmit_logout;
    }
    
}