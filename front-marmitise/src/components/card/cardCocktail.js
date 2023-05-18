import React,{useEffect, useState} from 'react';

import './cardCocktail.css';

export default function CardCocktail(props){

    const [alcohols, setAlcohols] = useState([]);
    const [softs, setSofts] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    useEffect(()=>{
        const getAlcohols = (alcoolObjects) => {
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
                setAlcohols(alcoholsArray);
                localStorage.setItem('alcohols', JSON.stringify(alcoholsArray));
            });
        }

        const getSofts = (softObjects) => {
            const promises = softObjects.map((softObject) => {
                return fetch('http://localhost:8000/api/soft/' + softObject.id_soft, {})
                .then((response) => response.json())
                .then((data) => {
                    return {
                        key: data._id,
                        id: data.id,
                        name: data.nomSoft
                    };
                })
                .catch((err) => {
                    console.log(err);
                });
            });
            Promise.all(promises)
            .then((softArray) => {
                setSofts(softArray);
                localStorage.setItem('softs', JSON.stringify(softArray));
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
                setIngredients(ingredientArray);
                localStorage.setItem('ingredients', JSON.stringify(ingredientArray));
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
            <div className='alcohols'>
                {alcohols.map((alcool)=>
                    <div key={alcool.key}>
                        <div className='alcoolInfo'>
                            <p>{alcool.name} - {alcool.degre}%</p>
                            <p></p>
                            <p>Year : {alcool.date_fabrication}</p>
                            <p>About : {alcool.precision}</p>
                        </div>
                    </div>
                )}
            </div>
            {/*
            <div className='sofs'>
                {softs.map(soft=>
                    <div key={soft.key}>
                        <div className='softInfo'>
                            {console.log("soft",soft)}
                            <p>{soft.name}</p>
                        </div>
                    </div>
                )}
            </div>
            <div className='ingredients'>
            </div>*/}
        </div>
        </>   
    );
}