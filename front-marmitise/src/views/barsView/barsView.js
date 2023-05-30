import React, {useEffect, useState} from 'react';

import CardBar from '../../components/card/cardBar';

import './barsView.css';

export default function BarsView(props){
    const [bars,setBars]=useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {

        props.changeUrl(window.location.href);

        /*permet de récuperer toutes les information de tous les bars et de les mettre dans un tableau*/
        const getBars= ()=> {
            var barsArray = [];
            var bar = {}
            fetch('https://api-marmitise.onrender.com/api/bar/',{})
            //fetch('http://localhost:8000/api/bar/',{})
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
                    //localStorage.setItem('bars', JSON.stringify(barsArray));
                })
                .catch((err) => {
                    console.log(err);
                })
            })
        }

        /*const storedBarsData = localStorage.getItem('bars');
        if (!storedBarsData) {
            getBars();
        }
        else {
            setBars(JSON.parse(storedBarsData));
        }*/
        getBars();
    },[]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredBars = bars.filter((bar) =>
        bar.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return(
        <div className='barsView'>
            <div className='searchBar'>
                <input
                    type='text'
                    placeholder='Search a bar'
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <div className='cards'>
                {filteredBars.map((bar) => (
                    <CardBar className='card'
                        key={bar.key} 
                        id={bar.id}
                        name={bar.name} 
                        localisation={bar.localisation}
                        cocktails={bar.cocktails}
                    />
                ))}
            </div>
        </div>
    );
}
