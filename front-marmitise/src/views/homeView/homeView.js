import React,{useEffect} from 'react';
import './homeView.css';


export default function HomeView(props){

    /*function getCookie(name) {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    }
    const token = getCookie('token');*/

    

    useEffect(() => {
        props.changeUrl(window.location.href);
        /*
        console.log("btnLogin : " + props.btnLogin);
        console.log("user : " + localStorage.getItem('user'));
        */
    },[]);

    return(
        <div className='homeView'>
        </div>

    );
}
