import React,{useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import LoginBox from '../../components/loginBox/loginBox.js'

import './loginView.css';


export default function LoginView(props){
    
    const navigate = useNavigate();
    
    useEffect(() => {
        if (props.btnLogin === false) {
            setTimeout(navigate(props.url),500);
        }
    });

    return(
        <div className='loginView'>     
            <LoginBox className='loginBox'  
                changeStateBtnLogin={props.changeStateBtnLogin}
                btnLogin={props.btnLogin} 
            />
        </div>

    );
}