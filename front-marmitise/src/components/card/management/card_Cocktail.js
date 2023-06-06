import React, { useEffect, useState } from 'react';
import './card_Cocktail.css';

export default function Card_Cocktail() {
    const [cocktails, setCocktails] = useState([]);

    const getCocktails = async () => {
        try {
            const response = await fetch('https://api-marmitise.onrender.com/api/cocktail/', {
            //const response = await fetch('http://localhost:8000/api/cocktail/', {
                method: 'GET',
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            const data = await response.json();
            const cocktailsArray = data.map((cocktail) => ({
                key: cocktail._id,
                id: cocktail.id,
                nom: cocktail.nom,
            }));
            setCocktails(cocktailsArray);
        } 
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getCocktails();
    }, []);

    const handleDelete = async (cocktailId) => {
        try {
            //await fetch(`http://localhost:8000/api/cocktail/${cocktailId}`, {
            await fetch(`https://api-marmitise.onrender.com/api/cocktail/${cocktailId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            setCocktails((prevCocktails) => prevCocktails.filter((cocktail) => cocktail.key !== cocktailId));
        } 
        catch (err) {
            console.log(err);
        }
    };

   
    return (
        <div className='card_Cocktail'>
            {cocktails.map((cocktail) => (
                <div key={cocktail.key} className='cocktailItem'>
                    <span className='nomCocktail'>{cocktail.nom}</span>
                        <div className='div_btn'>
                            <button className="btn" onClick={() => handleDelete(cocktail.key)}>delete</button>
                        </div>
                </div>
            ))}
        </div>
    );
}
