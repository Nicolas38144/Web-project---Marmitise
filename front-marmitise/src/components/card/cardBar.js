import React,{useEffect, useState} from 'react';

import './cardBar.css';

export default function CardBar(props){

    const [cocktails, setCocktails] = useState([]);

    useEffect(()=>{
        const getCocktail = (cocktailObjects) => {
            const promises = cocktailObjects.map((cocktail_id) => {
                return fetch('https://api-marmitise.onrender.com/api/cocktail/' + cocktail_id, {})
                //return fetch('http://localhost:8000/api/cocktail/' + cocktail_id, {})
                .then((response) => response.json())
                .then((data) => {
                    return {
                        key: data._id,
                        id: data.id,
                        name: data.nom,
                        alcools: data.alcools,
                        softs: data.softs,
                        ingredients: data.ingredients,
                    };
                })
                .catch((err) => {
                    console.log(err);
                });
            });
            Promise.all(promises)
            .then((cocktailsArray) => {
                const existingCocktailsData = localStorage.getItem('cocktailsBar');
                let existingCocktails = [];
                if (existingCocktailsData) {
                    existingCocktails = JSON.parse(existingCocktailsData);
                }
                // Filtrer les nouveaux alcools qui n'existent pas déjà
                const newCocktails = cocktailsArray.filter((cocktail) => {
                    return !existingCocktails.some((existingCocktail) => existingCocktail.key === cocktail.key);
                });
                // Fusionner les nouveaux alcools avec les alcools existants
                const combinedCocktails = [...existingCocktails, ...newCocktails];
                setCocktails(combinedCocktails);
                //localStorage.setItem('cocktailsBar', JSON.stringify(combinedCocktails));
            });
        }

        /*const storedCocktailsData = localStorage.getItem('cocktailsBar');
        if (!storedCocktailsData) {
            getCocktail(props.cocktails);
        }
        else {
            setCocktails(JSON.parse(storedCocktailsData));
        }*/
        getCocktail(props.cocktails);
    },[]);

    const filteredCocktails = cocktails.filter((cocktail) =>
        props.cocktails.some((cocktail_id) => cocktail_id === cocktail.id)
    );

    return(
        <div className='cardBar'>
            {filteredCocktails.length > 0 && (
                <>
                <p className='name'>{props.name}</p>
                <p className='localisation'>{props.localisation}</p>
                <hr/>
                <div className='cocktails'>
                    <p>COCKTAIL(S)</p>
                    <div className='boxInfo'>
                        {filteredCocktails.map((cocktail, index) => {
                            return (
                                <div key={cocktail.key}>
                                    <div className='in-boxInfo'>
                                        <p>{cocktail.name}</p>
                                        {/*index !== filteredCocktails.length - 1 && <p> | </p>*/} 
                                    </div>
                                </div>
                            );
                        })}
                    </div> 
                </div>
                </>
            )}
        </div>
    );
}