import React,{useEffect, useState, useRef} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import './cardSubmit.css';

export default function CardSubmit(props){

    const [alcohols, setAlcohols] = useState([]);
    const [softs, setSofts] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    /***************************************** Début pour les fetch ******************************************/
    useEffect(()=>{
        if (props.isLogged === true) {  
            const getAlcohols = async () => {
                try {
                    const response = await fetch('https://api-marmitise.onrender.com/api/alcool/', {
                    //const response = await fetch('http://localhost:8000/api/alcool/', {
                        method: 'GET',
                        headers: {
                            'Authorization': localStorage.getItem('token')
                        }
                    });
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
                } 
                catch (err) {
                    console.log(err);
                }
            }; 

            const getSofts = async () => {
                try {
                    const response = await fetch('https://api-marmitise.onrender.com/api/soft/', {
                    //const response = await fetch('http://localhost:8000/api/soft/', {
                        method: 'GET',
                        headers: {
                            'Authorization': localStorage.getItem('token')
                        }
                    });
                    const data = await response.json();
                    const softsArray = data.map((soft) => ({
                        key: soft._id,
                        id: soft.id,
                        name: soft.nomSoft
                    }));
                    setSofts(softsArray);
                }
                catch (err) {
                    console.log(err);
                };
            };

            const getIngredients = async () => {
                try {
                    const response = await fetch('https://api-marmitise.onrender.com/api/ingredient/', {
                    //const response = await fetch('http://localhost:8000/api/ingredient/', {
                        method: 'GET',
                        headers: {
                            'Authorization': localStorage.getItem('token')
                        }
                    });
                    const data = await response.json();
                    const ingredientsArray = data.map((ingredient) => ({
                        key: ingredient._id,
                        id: ingredient.id,
                        name: ingredient.nomIngredient
                    }));
                    setIngredients(ingredientsArray);
                }
                catch (err) {
                    console.log(err);
                };
            };
            
            /*const storedAlcoholsSubmitData = localStorage.getItem('alcoholsSubmit');
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
            }*/
            getAlcohols();
            getSofts();
            getIngredients();
        }
    },[]);
    /***************************************** Fin pour les fetch ******************************************/




/***************************************** Début pour le formulaire ******************************************/
    const [cocktailName, setCocktailName] = useState("");
    const cocktailNameRef = useRef(null);

    const [selectedAlcohols, setSelectedAlcohols] = useState({});
    const [selectedSofts, setSelectedSofts] = useState({});
    const [selectedIngredients, setSelectedIngredients] = useState({});

    const [selectedAlcoholCount, setSelectedAlcoholCount] = useState(0);
    const [selectedSoftCount, setSelectedSoftCount] = useState(0);

    const handleAlcoholChange = (alcoholId, quantity) => {
        if (quantity === '' || (parseInt(quantity) >= 0 && parseInt(quantity) <= 100)) {
            setSelectedAlcohols((prevSelections) => {
                const updatedSelections = { ...prevSelections };
                if (quantity === '0') {
                    delete updatedSelections[alcoholId];
                } 
                else {
                    updatedSelections[alcoholId] = quantity === '' ? '' : parseInt(quantity);
                }
                setSelectedAlcoholCount(Object.keys(updatedSelections).length);
                return updatedSelections;
            });
        }
    };
    
      const handleSoftChange = (softId, quantity) => {
        if (quantity === '' || (parseInt(quantity) >= 0 && parseInt(quantity) <= 100)) {
            setSelectedSofts((prevSelections) => {
                const updatedSelections = { ...prevSelections };
                if (quantity === '0') {
                    delete updatedSelections[softId];
                } 
                else {
                    updatedSelections[softId] = quantity === '' ? '' : parseInt(quantity);
                }
                setSelectedSoftCount(Object.keys(updatedSelections).length);
                return updatedSelections;
            });
        }
    };

    const handleIngredientChange = (ingredientId) => {
        setSelectedIngredients((prevSelections) => ({
            ...prevSelections,
            [ingredientId]: !prevSelections[ingredientId],
        }));
    };

    const handleSubmit = () => {
        setTimeout(() => {
            // Process the selected data on form submission
            const isAlcoholValid = selectedAlcoholCount >= 2;
            const isSoftValid = selectedSoftCount >= 2;
            const isFormValid = isAlcoholValid || isSoftValid || (selectedAlcoholCount === 1 && selectedSoftCount === 1);

            if (cocktailName) {
                if (isFormValid) {

                    const cocktailData = {
                        nom: cocktailName,
                        alcools: Object.entries(selectedAlcohols).map(([id_alcool, qt_alc]) => ({
                            id_alcool,
                            qt_alc,
                        })),
                        softs: Object.entries(selectedSofts).map(([id_soft, qt_soft]) => ({
                            id_soft,
                            qt_soft,
                        })),
                        ingredients: Object.keys(selectedIngredients).map((id_ingredient) => ({
                            id_ingredient,
                        })),
                    };

                    fetch('https://api-marmitise.onrender.com/api/cocktail', {
                    //fetch('http://localhost:8000/api/cocktail', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('token')
                        },
                        body: JSON.stringify(cocktailData),
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        // Traitements après la réponse du serveur
                        console.log(data);

                        // Réinitialiser la valeur de l'input et les sélections
                        if (cocktailNameRef.current) {
                            cocktailNameRef.current.value = '';
                        }
                        setCocktailName('');
                        setSelectedAlcohols({});
                        setSelectedSofts({});
                        setSelectedIngredients({});
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                }
                else {
                    alert("You must select at least 2 alcohols or 2 soft drinks or 1 of each");
                }
            }
            else {
                alert("Cocktail name can't be empty");
            }
        }, 400);
        
    };
/***************************************** Fin pour le formulaire ******************************************/



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
            <input 
                className='inputNameCocktail'
                type='text'
                maxLength="15"
                placeholder='Name of your cocktail'
                onChange={(e) => setCocktailName(e.target.value)} 
                ref={cocktailNameRef}
            />
            
            <Tabs className='custom-tabs'>
                <TabList className='custom-tab-list'>
                    <Tab className='custom-tab'>Alcohol(s)</Tab>
                    <Tab className='custom-tab'>Soft(s)</Tab>
                    <Tab className='custom-tab'>Ingredient(s)</Tab>
                </TabList>

                <TabPanel>
                <div className='alcohols_map'>
                    {console.log(alcohols)}
                    {alcohols.map((alcool, index) => {
                        return (
                            <div className='alcoolInfo' key={alcool.key}>
                                <div className='in-boxlInfo'>
                                    <div>
                                        <p>{alcool.name}</p>
                                        <hr/>
                                        <input
                                            type='number'
                                            min='0'
                                            max='100'
                                            value={selectedAlcohols[alcool.id] || ''}
                                            onChange={(e) => handleAlcoholChange(alcool.id, e.target.value)}
                                        />
                                    </div>
                                    <p className='other_p'>({alcool.degre}%)</p>
                                    {alcool.date_fabrication != null && (
                                        <p className='other_p'>Year : {alcool.date_fabrication}</p>
                                    )}
                                    {alcool.precision != null && (
                                        <p className='other_p'>About : {alcool.precision}</p>
                                    )}
                                    
                                    
                                </div>  
                                {index !== alcohols.length /*-1*/&& <br />} 
                                {/* Ajoute un séparateur uniquement si ce n'est pas le dernier élément */}
                            </div>
                        );
                    })}
                </div>
                </TabPanel>

                <TabPanel>
                <div className='softs_map'>
                    {softs.map((soft, index) => {
                        return (
                            <div className='softInfo' key={soft.key}>
                                <div className='in-boxlInfo'>
                                    <p>{soft.name}</p>
                                    <hr/>
                                    <input
                                        type='number'
                                        min='0'
                                        max='100'
                                        value={selectedSofts[soft.id] || ''}
                                        onChange={(e) => handleSoftChange(soft.id, e.target.value)}
                                    />
                                </div>
                                {index !== softs.length && <br />} 
                            </div>
                        );
                    })}
                </div>
                </TabPanel>

                <TabPanel>
                <div className='ingredients_map'>
                    {ingredients.map((ingredient, index) => {
                        return (
                            <div className='ingredientInfo' key={ingredient.key}>
                                    <div className='in-boxlInfo'>
                                        <p>{ingredient.name}</p>
                                        <hr/>
                                        <input
                                            className='checkbox'
                                            type='checkbox'
                                            checked={selectedIngredients[ingredient.id] || false}
                                            onChange={(e) => handleIngredientChange(ingredient.id)}
                                        />
                                    </div>                                
                                    {index !== ingredients.length && <br />} 
                                    {/* Ajoute un séparateur uniquement si ce n'est pas le dernier élément */}
                            </div>
                        );
                    })}
                </div>
                </TabPanel>
            </Tabs>
            <button className='btn_submit' onClick={handleSubmit}>Submit your cocktail</button>
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