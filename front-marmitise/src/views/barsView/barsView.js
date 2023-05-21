import React,{useEffect} from 'react';

import './barsView.css';

export default function BarsView(props){
    useEffect(() => {
        props.changeUrl(window.location.href);
    },[]);

    return(
        <div className='barsView'>
            
        </div>
    );
}
