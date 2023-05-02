import React,{useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import LoginBox from '../../components/loginBox/loginBox.js'

import './loginView.css';


/*Affiche la vue quand on clique sur Sports dans la section secondaire de la barre de navigation*/
export default function LoginView(props){
    
    const navigate = useNavigate();
    
    useEffect(() => {
        if (props.btnLogin === false) {
            setTimeout(navigate("/home"),500);
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