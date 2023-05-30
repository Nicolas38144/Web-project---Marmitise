import React,{useEffect, useState} from 'react';
import './cocktailsView.css';

import CardCocktail from '../../components/card/cardCocktail'


export default function CocktailsView(props){    

    const [cocktails,setCocktails]=useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {

        props.changeUrl(window.location.href);

        /*permet de récuperer toutes les information de tous les cocktails et de les mettre dans un tableau*/
        const getCocktails= ()=> {
            var cocktailsArray = [];
            var cocktail = {}
            //fetch('http://localhost:8000/api/cocktail/',{})
            fetch('https://api-marmitise.onrender.com/api/cocktail/',{})
            .then((response) => { 
                response.json().then((data) => {
                    for (let i = 0; i < data.length; i++) {
                        cocktail.key = data[i]._id;
                        cocktail.id=data[i].id;
                        cocktail.name = data[i].nom;
                        cocktail.alcools = data[i].alcools;
                        cocktail.softs = data[i].softs;
                        cocktail.ingredients = data[i].ingredients;
                        cocktailsArray.push({...cocktail});
                    }
                    setCocktails(cocktailsArray);
                    //localStorage.setItem('cocktails', JSON.stringify(cocktailsArray));
                })
                .catch((err) => {
                    console.log(err);
                })
            })
        }

        /*const storedCocktailsData = localStorage.getItem('cocktails');
        if (!storedCocktailsData) {*/
            getCocktails();
        /*}
        else {
            setCocktails(JSON.parse(storedCocktailsData));
        }*/
    },[]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCocktails = cocktails.filter((cocktail) =>
        cocktail.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='cocktailsView'>
            <div className='searchBar'>
                <input
                    type='text'
                    placeholder='Search a cocktail'
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <div className='cards'>
                {filteredCocktails.map((cocktail) => (
                    <CardCocktail
                    className='card'
                    key={cocktail.key}
                    id={cocktail.id}
                    name={cocktail.name}
                    alcools={cocktail.alcools}
                    softs={cocktail.softs}
                    ingredients={cocktail.ingredients}
                    />
                ))}
            </div>
        </div>
      );
      /*
    return(
        <div className='cocktailsView'>
            {cocktails.map((cocktail) => (
                <CardCocktail className='card'
                    key={cocktail.key} 
                    id={cocktail.id}
                    name={cocktail.name} 
                    alcools={cocktail.alcools}
                    softs={cocktail.softs}
                    ingredients={cocktail.ingredients}
                />
            ))}
        </div>
    );*/
}
