import React,{useEffect} from 'react';

import CardManagement from '../../components/card/management/card_Soft_Ingredient';

import './adminView.css';

export default function AdminView(props){
    useEffect(() => {
        props.changeUrl(window.location.href);
    },[]);

    return (
        <div className='adminView'>
            <p className='title_p'>Management</p>
            <CardManagement/>
        </div>
    )
}
