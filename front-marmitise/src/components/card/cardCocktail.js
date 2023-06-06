import React,{useEffect, useState} from 'react';

import './cardCocktail.css';

export default function CardCocktail(props){

    const [alcohols, setAlcohols] = useState([]);
    const [softs, setSofts] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    useEffect(()=>{
        const getAlcohols = (alcoolObjects) => {
            const promises = alcoolObjects.map((alcoolObject) => {
                return fetch('https://api-marmitise.onrender.com/api/alcool/' + alcoolObject.id_alcool, {
                //return fetch('http://localhost:8000/api/alcool/' + alcoolObject.id_alcool, {
                    method: 'GET',
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    return {
                        key: data._id,
                        id: data.id,
                        name: data.nom,
                        degre: data.degre,
                        precision: data.precision,
                        date_fabrication: data.date_fabrication,
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
            const promises = softObjects.map((softObject) => {
                return fetch('https://api-marmitise.onrender.com/api/soft/' + softObject.id_soft, {
                //return fetch('http://localhost:8000/api/soft/' + softObject.id_soft, {
                    method: 'GET',
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                })
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
                return fetch('https://api-marmitise.onrender.com/api/ingredient/' + ingredientObject.id_ingredient, {
                //return fetch('http://localhost:8000/api/ingredient/' + ingredientObject.id_ingredient, {
                    method: 'GET',
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                })
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
    
    const filteredAlcohols = alcohols.filter((alcool) =>
        props.alcools.some((alcoolObject) => alcoolObject.id_alcool === alcool.id)
    );
    const filteredSofts = softs.filter((soft) => 
        props.softs.some((softObject) => softObject.id_soft === soft.id)
    );
    const filteredIngredients = ingredients.filter((ingredient) =>
        props.ingredients.some((ingredientObject) => ingredientObject.id_ingredient === ingredient.id)
    );
    return(
        <> 
        <div className='cardCocktail'>
            <p className='name'>{props.name}</p>
            
            <div className='alcohols'>                
                {filteredAlcohols.length > 0 && (
                    <p className='type'>ALCOHOL(S)</p>
                )}
                {filteredAlcohols.map((alcool, index) => {
                    const matchingAlcool = props.alcools.find((alcoolObject) => alcoolObject.id_alcool === alcool.id);
                    const quantity = matchingAlcool ? matchingAlcool.qt_alc : "";
                    return (
                        <div key={alcool.key}>
                            <div className='alcoolInfo'>
                                <div className='in-boxlInfo'>
                                    <p>{alcool.name}</p>
                                    <hr/>
                                    <p>{quantity}cl</p>
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
                            {index !== filteredAlcohols.length && <br />} 
                        </div>
                    );
                })}
            </div>
            
            <div className='softs'>
                {filteredSofts.length > 0 && (
                    <p className='type'>SOFT(S)</p>
                )}
                {filteredSofts.map((soft, index) => {
                    const matchingSoft = props.softs.find((softObject) => softObject.id_soft === soft.id);
                    const quantity = matchingSoft ? matchingSoft.qt_soft : "";
                    return (
                        <div key={soft.key}>
                            <div className='softInfo'>
                                <div className='in-boxlInfo'>
                                    <p>{soft.name}</p>
                                    <hr/>
                                    <p>{quantity}cl</p>
                                </div>
                            </div>
                            {index !== filteredSofts.length && <br />}
                        </div>
                    );
                })}
            </div>
            
            <div className='ingredients'>
                {filteredIngredients.length > 0 && (
                    <p className='type'>INGREDIENT(S)</p>
                )}
                {filteredIngredients.map((ingredient, index) => {
                    const lineIngredient = `${ingredient.name} ${" ".repeat(40 - ingredient.name.length)}`;
                    return (
                        <div key={ingredient.key}>
                            <div className='ingredientInfo'>
                                <p style={{ whiteSpace: 'pre-wrap' }}>{lineIngredient}</p>
                            </div>
                            {index !== filteredIngredients.length && <br />}
                        </div>
                    );
                })}
            </div>
        </div>
        </>   
    );
}