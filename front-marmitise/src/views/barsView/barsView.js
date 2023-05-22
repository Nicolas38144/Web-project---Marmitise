import React, {useEffect, useState} from 'react';

import CardBar from '../../components/card/cardBar';

import './barsView.css';

export default function BarsView(props){
    const [bars,setBars]=useState([]);

    useEffect(() => {

        props.changeUrl(window.location.href);

        /*permet de récuperer toutes les information de tous les bars et de les mettre dans un tableau*/
        const getBars= ()=> {
            var barsArray = [];
            var bar = {}
            fetch('https://api-marmitise.onrender.com/api/bar/',{})
            .then((response) => { 
                response.json().then((data) => {
                    for (let i = 0; i < data.length; i++) {
                        bar.key = data[i]._id;
                        bar.id=data[i].id;
                        bar.name = data[i].nom;
                        bar.localisation = data[i].localisation;
                        bar.cocktails = data[i].cocktails;
                        barsArray.push({...bar});
                    }
                    setBars(barsArray);
                    localStorage.setItem('bars', JSON.stringify(barsArray));
                })
                .catch((err) => {
                    console.log(err);
                })
            })
        }

        const storedBarsData = localStorage.getItem('bars');
        if (!storedBarsData) {
            getBars();
        }
        else {
            setBars(JSON.parse(storedBarsData));
        }
    },[]);


    return(
        <div className='barsView'>
            {bars.map((bar) => (
                <CardBar className='card'
                    key={bar.key} 
                    id={bar.id}
                    name={bar.name} 
                    localisation={bar.localisation}
                    cocktails={bar.cocktails}
                />
            ))}
        </div>
    );
}
