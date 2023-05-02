import React,{useEffect} from 'react';

import './cardContact.css';

export default function CardContact(){

    useEffect(()=>{});

    return(
        <>
        <div className='cardContact'>
            <p className='title'>Contact us</p>
            <p className='text'>If you want to delete your account, 
                send an email with the email you used when you registered to :  
            </p>
            <p className='text' id='mail'>
                ni3co8.germani@gmail.com 
            </p>
        </div>
        </>   
    );
}