import React,{useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import LoginBox from '../../components/loginBox/loginBox.js'

import './loginView.css';


export default function LoginView(props){
    
    const navigate = useNavigate();
    
    useEffect(() => {
        if (props.btnLogin === false) {
            navigate(props.url);
        }
    });

    return(
        <div className='loginView'>     
            <LoginBox className='loginBox'  
                changeStateBtnLogin={props.changeStateBtnLogin}
                btnLogin={props.btnLogin}
                changeIsAdmin={props.changeIsAdmin} 
            />
        </div>
    );
}