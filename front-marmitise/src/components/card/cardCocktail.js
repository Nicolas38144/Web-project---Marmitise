import React,{useEffect, useState} from 'react';

import './cardCocktail.css';

export default function CardCocktail(props){

    const [alcohol, setAlcohol] = useState([]);
    const [soft, setSoft] = useState([]);
    const [ingredient, setIngredient] = useState([]);

    useEffect(()=>{
        const getAlcohol = (id)=> {
            var alcool = {}
            fetch('http://localhost:8000/api/alcool/'+id,{})
            .then((response) => { 
                response.json().then((data) => {
                    alcool.key = data._id;
                    alcool.id = data.id;
                    alcool.name = data.nom;
                    alcool.degre = data.degre;
                    alcool.precision = data.precision;
                    alcool.date_fabrication = data.date_fabrication;
                    setAlcohol(alcool);
                })
                .catch((err) => {
                    console.log(err);
                })
            })
        }

        const getSoft = (id)=> {
            var soft0 = {}
            fetch('http://localhost:8000/api/soft/'+id,{})
            .then((response) => { 
                response.json().then((data) => {
                    soft0.key = data._id;
                    soft0.id = data.id;
                    soft0.name = data.nomSoft;
                    setSoft(soft0);
                })
                .catch((err) => {
                    console.log(err);
                })
            })
        }

        const getIngredient = (id)=> {
            var ingredient0 = {}
            fetch('http://localhost:8000/api/ingredient/'+id,{})
            .then((response) => { 
                response.json().then((data) => {
                    ingredient0.key = data._id;
                    ingredient0.id = data.id;
                    ingredient0.name = data.nomIngredient;
                    setIngredient(ingredient0);
                })
                .catch((err) => {
                    console.log(err);
                })
            })
        }


    },[]);

    return(
        <>
        <div className='cardCocktail'>
            <p className='name'>{props.name}</p>
            <p className='alcohols'>

            </p>
        </div>
        </>   
    );
}