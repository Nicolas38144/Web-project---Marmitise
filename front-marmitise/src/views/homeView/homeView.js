import React,{useEffect} from 'react';

import Card_Home_Contact from '../../components/card/card_Home_Contact';
import CardManagement from '../../components/card/cardManagement';

import './homeView.css';

export default function HomeView(props){
    useEffect(() => {
        props.changeUrl(window.location.href);
    },[]);

    if (!props.isAdmin) {
        return(
            <div className='homeView'>
                <Card_Home_Contact 
                    className="boxHome"
                    title="Welcome to Marmitise"
                    text="On this site, you can find many cocktail recipes. Moreover, you can even create your own cocktails in the 'Submit your recipes' tab. To do so, log in."
                    text2="Have a nice visit on our site !"
                />
            </div>
        );
    }
    else {
        return (
            <div className='homeView'>
                <CardManagement/>
            </div>
        )
    }
}
