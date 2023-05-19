import React,{useEffect, useState} from 'react';

import './cardSubmit.css';

export default function CardSubmit(props){

    const [alcohols, setAlcohols] = useState([]);
    const [softs, setSofts] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    useEffect(()=>{
        if (props.isLogged === true) {  
            const getAlcohols = async () => {
                try {
                    const response = await fetch('http://localhost:8000/api/alcool/', {});
                    const data = await response.json();
                    const alcoholsArray = data.map((alcohol) => ({
                        key: alcohol._id,
                        id: alcohol.id,
                        name: alcohol.nom,
                        degre: alcohol.degre,
                        date_fabrication: alcohol.date_fabrication,
                        precision: alcohol.precision,
                    }));
                    setAlcohols(alcoholsArray);
                    localStorage.setItem('alcoholsSubmit', JSON.stringify(alcoholsArray));
                } 
                catch (err) {
                    console.log(err);
                }
            }; 

            const getSofts = async () => {
                try {
                    const response = await fetch('http://localhost:8000/api/soft/', {});
                    const data = await response.json();
                    const softsArray = data.map((soft) => ({
                        key: soft._id,
                        id: soft.id,
                        name: soft.nomSoft
                    }));
                    setSofts(softsArray);
                    localStorage.setItem('softsSubmit', JSON.stringify(softsArray));
                }
                catch (err) {
                    console.log(err);
                };
            };

            const getIngredients = async () => {
                try {
                    const response = await fetch('http://localhost:8000/api/ingredient/', {});
                    const data = await response.json();
                    const ingredientsArray = data.map((ingredient) => ({
                        key: ingredient._id,
                        id: ingredient.id,
                        name: ingredient.nomIngredient
                    }));
                    setIngredients(ingredientsArray);
                    localStorage.setItem('ingredientsSubmit', JSON.stringify(ingredientsArray));
                }
                catch (err) {
                    console.log(err);
                };
            };
            
            const storedAlcoholsSubmitData = localStorage.getItem('alcoholsSubmit');
            const storedSoftsSubmitData = localStorage.getItem('softsSubmit');
            const storedIngredientsSubmitData = localStorage.getItem('ingredientsSubmit');
            if (!storedAlcoholsSubmitData && !storedSoftsSubmitData&& !storedIngredientsSubmitData) {
                getAlcohols();
                getSofts();
                getIngredients();
            }
            else {
                setAlcohols(JSON.parse(storedAlcoholsSubmitData));
                setSofts(JSON.parse(storedSoftsSubmitData));
                setIngredients(JSON.parse(storedIngredientsSubmitData));
            }
        }
    },[]);

    const cardSubmit_logout = (
        <>
        <div className='cardSubmit-logout'>
            <p className='text'>
                You have to login if you want create and submit your own cocktail !
            </p>
        </div>
        </>
    )

    const cardSubmit_login = (
        <>
        <div className='cardSubmit-login'>
            <h1 className='title'>Create your own cocktail !</h1>

            <p className='title_bis'>Alcohol(s)</p>
            <div className='alcohols_map'>
                {alcohols.map((alcool, index) => {
                    return (
                        <div className='alcoolInfo' key={alcool.key}>
                            <div className='in-boxlInfo'>
                                <p>{alcool.name} ({alcool.degre}%)</p>
                                {alcool.date_fabrication != null && (
                                    <p>Year: {alcool.date_fabrication}</p>
                                )}
                                {alcool.precision != null && (
                                    <p>About: {alcool.precision}</p>
                                )}
                            </div>  
                            {index !== alcohols.length /*-1*/&& <br />} 
                            {/* Ajoute un séparateur uniquement si ce n'est pas le dernier élément */}
                        </div>
                    );
                })}
            </div>

            <p className='title_bis'>Softs</p>
            <div className='softs_map'>
                {softs.map((soft, index) => {
                    return (
                        <div className='softInfo' key={soft.key}>
                            <div className='in-boxlInfo'>
                                <p>{soft.name}</p>
                            </div>
                            {index !== softs.length && <br />} 
                        </div>
                    );
                })}
            </div>

            <p className='title_bis'>Ingredients</p>
            <div className='ingredients_map'>
                {ingredients.map((ingredient, index) => {
                    return (
                        <div className='alcoolInfo' key={ingredient.key}>
                                <div className='in-boxlInfo'>
                                    <p>{ingredient.name}</p>
                                </div>                                
                                {index !== ingredients.length && <br />} 
                                {/* Ajoute un séparateur uniquement si ce n'est pas le dernier élément */}
                        </div>
                    );
                })}
            </div>
        </div>
        </>
    )

    if (props.isLogged === true) {
        return cardSubmit_login;
    }
    else {
        return cardSubmit_logout;
    }
    
}