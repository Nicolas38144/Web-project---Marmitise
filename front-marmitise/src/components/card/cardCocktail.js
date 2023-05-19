import React,{useEffect, useState} from 'react';

import './cardCocktail.css';

export default function CardCocktail(props){

    const [alcohols, setAlcohols] = useState([]);
    const [softs, setSofts] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    useEffect(()=>{
        const getAlcohols = (alcoolObjects) => {
            console.log(alcoolObjects);
            const promises = alcoolObjects.map((alcoolObject) => {
                return fetch('http://localhost:8000/api/alcool/' + alcoolObject.id_alcool, {})
                .then((response) => response.json())
                .then((data) => {
                    return {
                        key: data._id,
                        id: data.id,
                        name: data.nom,
                        degre: data.degre,
                        precision: data.precision,
                        date_fabrication: data.date_fabrication,
                        qt_alc: alcoolObject.qt_alc
                    };
                })
                .catch((err) => {
                    console.log(err);
                });
            });
            Promise.all(promises)
            .then((alcoholsArray) => {
                const existingAlcoholsData = localStorage.getItem('alcohols');
                let existingAlcohols = [];
                if (existingAlcoholsData) {
                    existingAlcohols = JSON.parse(existingAlcoholsData);
                }
                // Filtrer les nouveaux alcools qui n'existent pas déjà
                const newAlcohols = alcoholsArray.filter((alcohol) => {
                    return !existingAlcohols.some((existingAlcohol) => existingAlcohol.key === alcohol.key);
                });
                // Fusionner les nouveaux alcools avec les alcools existants
                const combinedAlcohols = [...existingAlcohols, ...newAlcohols];
                setAlcohols(combinedAlcohols);
                localStorage.setItem('alcohols', JSON.stringify(combinedAlcohols));
            });
        }

        const getSofts = (softObjects) => {
            console.log("hello");
            const promises = softObjects.map((softObject) => {
                return fetch('http://localhost:8000/api/soft/' + softObject.id_soft, {})
                .then((response) => response.json())
                .then((data) => {
                    return {
                        key: data._id,
                        id: data.id,
                        name: data.nomSoft,
                        qt_soft: softObject.qt_soft
                    };
                })
                .catch((err) => {
                    console.log(err);
                });
            });
            Promise.all(promises)
            .then((softArray) => {
                const existingSoftsData = localStorage.getItem('softs');
                let existingSofts = [];
                if (existingSoftsData) {
                    existingSofts = JSON.parse(existingSoftsData);
                }
                const newSofts = softArray.filter((soft) => {
                    return !existingSofts.some((existingSoft) => existingSoft.key === soft.key);
                });
                const combinedSofts = [...existingSofts, ...newSofts];
                setSofts(combinedSofts);
                localStorage.setItem('softs', JSON.stringify(combinedSofts));
            });
        }

        const getIngredients = (ingredientObjects) => {
            const promises = ingredientObjects.map((ingredientObject) => {
                return fetch('http://localhost:8000/api/ingredient/' + ingredientObject.id_ingredient, {})
                .then((response) => response.json())
                .then((data) => {
                    return {
                        key: data._id,
                        id: data.id,
                        name: data.nomIngredient
                    };
                })
                .catch((err) => {
                    console.log(err);
                });
            });
            Promise.all(promises)
            .then((ingredientArray) => {
                /*permet d'ajouter tous les ingredients que l'on rencontre dans le localStorage*/
                const existingIngredientsData = localStorage.getItem('ingredients');
                let existingIngredients = [];
                if (existingIngredientsData) {
                    existingIngredients = JSON.parse(existingIngredientsData);
                }
                const newIngredients = ingredientArray.filter((ingredient) => {
                    return !existingIngredients.some((existingIngredient) => existingIngredient.key === ingredient.key);
                });
                const combinedIngredients = [...existingIngredients, ...newIngredients];
                setIngredients(combinedIngredients);
                localStorage.setItem('ingredients', JSON.stringify(combinedIngredients));
            });
        }

        const storedAlcoholsData = localStorage.getItem('alcohols');
        const storedSoftsData = localStorage.getItem('softs');
        const storedIngredientsData = localStorage.getItem('ingredients');
        if (!storedAlcoholsData && !storedSoftsData&& !storedIngredientsData) {
            getAlcohols(props.alcools);
            getSofts(props.softs);
            getIngredients(props.ingredients);
        }
        else {
            setAlcohols(JSON.parse(storedAlcoholsData));
            setSofts(JSON.parse(storedSoftsData));
            setIngredients(JSON.parse(storedIngredientsData));
        }
    },[]);
    

    return(
        <> 
        <div className='cardCocktail'>
            <p className='name'>{props.name}</p>
            <p className='type'>ALCOHOL(S)</p>
            <div className='alcohols'>
                {alcohols.map((alcool, index) => {
                    return (
                        <div key={alcool.key}>
                            <div className='alcoolInfo'>
                                <div className='in-boxlInfo'>
                                    <p>{alcool.name}</p>
                                    <hr/>
                                    <p>{alcool.qt_alc}cl</p>
                                </div>
                                <p>
                                    <span>{alcool.degre}%</span>
                                    {alcool.date_fabrication != null && (
                                        <span> - Year: {alcool.date_fabrication}</span>
                                    )}
                                </p>
                                {alcool.precision != null && (
                                    <p>About: {alcool.precision}</p>
                                )}
                            </div>
                            {index !== alcohols.length && <br />} 
                            {/* Ajoute un séparateur uniquement si ce n'est pas le dernier élément */}
                        </div>
                    );
                })}
            </div>
            <p className='type'>SOFT(S)</p>
            <div className='softs'>
                {softs.map((soft, index) => {
                    return (
                        <div key={soft.key}>
                            <div className='softInfo'>
                                <div className='in-boxlInfo'>
                                    <p>{soft.name}</p>
                                    <hr/>
                                    <p>{soft.qt_soft}cl</p>
                                </div>
                            </div>
                            {index !== softs.length && <br />}
                        </div>
                    );
                })}
            </div>
            <p className='type'>INGREDIENT(S)</p>
            <div className='ingredients'>
                {ingredients.map((ingredient, index) => {
                    const lineIngredient = `${ingredient.name} ${" ".repeat(40 - ingredient.name.length)}`;
                    return (
                        <div key={ingredient.key}>
                            <div className='ingredientInfo'>
                                <p style={{ whiteSpace: 'pre-wrap' }}>{lineIngredient}</p>
                            </div>
                            {index !== ingredients.length && <br />}
                        </div>
                    );
                })}
            </div>
        </div>
        </>   
    );
}