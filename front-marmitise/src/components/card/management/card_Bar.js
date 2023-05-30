import React, { useEffect, useState } from 'react';
import './card_Bar.css';

export default function Card_Bar() {
    const [bars, setBars] = useState([]);
    const [cocktails, setCocktails] = useState([]);

    const [isAddingBar, setIsAddingBar] = useState(false);
    const [isEditingBar, setIsEditingBar] = useState(false);

    const [newBarName, setNewBarName] = useState('');
    const [newBarLocalisation, setNewBarLocalisation] = useState('');
    const [newBarCocktails, setNewBarCocktails] = useState([]);

    const [editBarId, setEditBarId] = useState('');
    const [editBarName, setEditBarName] = useState('');
    const [editBarLocalisation, setEditBarLocalisation] = useState('');
    const [editBarCocktails, setEditBarCocktails] = useState([]);

    const [errorMessage, setErrorMessage] = useState('');

    const getBars = async () => {
        try {
            const response = await fetch('https://api-marmitise.onrender.com/api/bar/', {});
            const data = await response.json();
            const barsArray = data.map((bar) => ({
                key: bar._id,
                id: bar.id,
                nom: bar.nom,
                localisation: bar.localisation,
                cocktails: bar.cocktails
            }));
            setBars(barsArray);
        } 
        catch (err) {
            console.log(err);
        }
    };

    const getCocktails = async () => {
        try {
            const response = await fetch('https://api-marmitise.onrender.com/api/cocktail/', {});
            const data = await response.json();
            const cocktailsArray = data.map((cocktail) => ({
                key: cocktail._id,
                id: cocktail.id,
                nom: cocktail.nom
            }));
            setCocktails(cocktailsArray);
        } 
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getBars();
        getCocktails();
    }, []);

    const handleDelete = async (barId) => {
        try {
            await fetch(`https://api-marmitise.onrender.com/api/bar/${barId}`, {
                method: 'DELETE',
            });
            setBars((prevBars) => prevBars.filter((bar) => bar.key !== barId));
        } 
        catch (err) {
            console.log(err);
        }
    };

    const handleUpdate = async (barId) => {
        try {
            const existingBar = bars.find((bar) => bar.nom.toLowerCase() === editBarName.toLowerCase() && bar.localisation.toLowerCase() === editBarLocalisation.toLowerCase() &&bar.key !== barId);
            if (existingBar) {
                setErrorMessage('Ce nom de bar existe déjà dans cette ville');
            } 
            else {
                console.log(editBarCocktails);
                const response = await fetch(`https://api-marmitise.onrender.com/api/bar/${barId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        nom: editBarName,
                        localisation: editBarLocalisation,
                        cocktails: editBarCocktails
                    }),
                });
                const updatedBar = await response.json();
                setBars((prevBars) => prevBars.map((bar) => (bar.key === barId ? { ...bar, nom: updatedBar.nom, localisation: updatedBar.localisation, cocktails: updatedBar.cocktails } : bar)));
                getBars();
                setIsEditingBar(false);
                setEditBarId('');
                setEditBarName('');
                setEditBarLocalisation('');
                setEditBarCocktails([]);
                setErrorMessage('');
            }
        } 
        catch (err) {
            console.log(err);
        }
    };

    const handleAddBar = async () => {
        try {
            const existingBar = bars.find((bar) => bar.nom.toLowerCase() === newBarName.toLowerCase() && bar.localisation.toLowerCase() === newBarLocalisation.toLowerCase());
            if (existingBar) {
                setErrorMessage('Ce nom de bar existe déjà dans cette ville');
            } 
            else {
                const response = await fetch('https://api-marmitise.onrender.com/api/bar/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        nom: newBarName,
                        localisation: newBarLocalisation,
                        cocktails: newBarCocktails
                    }),
                });
                const newBar = await response.json();
                setBars((prevBars) => [...prevBars, { key: newBar._id, id: newBar.id, nom: newBar.nom, localisation: newBar.localisation, cocktails: newBar.cocktails}]);
                getBars();
                setNewBarName('');
                setNewBarLocalisation('');
                setNewBarCocktails([]);
                setIsAddingBar(false);
                setErrorMessage('');
            }
        } catch (err) {
        console.log(err);
        }
    };

    const handleEdit = (barId, nom, localisation, barCocktails) => {
        setIsEditingBar(true);
        setEditBarId(barId);
        setEditBarName(nom);
        setEditBarLocalisation(localisation);
        setEditBarCocktails(barCocktails);
        setErrorMessage('');
    };

    const handleCancelEdit = () => {
        setIsEditingBar(false);
        setEditBarId('');
        setEditBarName('');
        setEditBarLocalisation('');
        setEditBarCocktails([]);
        setErrorMessage('');
    };

    const handleCancelAddBar = () => {
        setIsAddingBar(false);
        setNewBarName('');
        setNewBarLocalisation('');
        setNewBarCocktails([]);
        setErrorMessage('');
    };

    const handleCocktailCheckboxChange = (cocktailKey) => {
        const isChecked = editBarCocktails.includes(cocktailKey);
        let updatedCocktails = [];
      
        if (isChecked) {
          // Si le cocktail est déjà coché, on le retire de la liste
          updatedCocktails = editBarCocktails.filter((key) => key !== cocktailKey);
        } else {
          // Si le cocktail n'est pas coché, on l'ajoute à la liste
          updatedCocktails = [...editBarCocktails, cocktailKey];
        }
      
        setEditBarCocktails(updatedCocktails);
      };

    return (
        <div className='card_Bar'>
            <div className='barList'>
                <h3>Liste des bars :</h3>
                {bars.map((bar) => (
                    <div key={bar.key} className='barItem'>
                        <div className='barInfo'>
                            {isEditingBar && editBarId === bar.key ? (
                                <>
                                    <input
                                        className='input'
                                        type='text'
                                        value={editBarName}
                                        onChange={(e) => setEditBarName(e.target.value)}
                                        placeholder='Nom du bar'
                                    />
                                    <input
                                        className='input'
                                        type='text'
                                        value={editBarLocalisation}
                                        onChange={(e) => setEditBarLocalisation(e.target.value)}
                                        placeholder='Localisation du bar'
                                    />
                                </>
                            ) : (
                                <>
                                    <span>{bar.nom} - {bar.localisation}</span>
                                </>
                            )}
                        </div>
                        {isEditingBar && editBarId === bar.key && (
                            <div className='cocktailsList'>
                                <h4>Cocktails du bar :</h4>
                                {cocktails.map((cocktail) => (
                                    <div key={cocktail.key} className='cocktailItem'>
                                        <input
                                            type='checkbox'
                                            checked={editBarCocktails.includes(cocktail.key)}
                                            onChange={() => handleCocktailCheckboxChange(cocktail.key)}
                                        />
                                        {cocktail.nom}
                                    </div>
                                ))}
                            </div>
                        )}
                        {isEditingBar && editBarId === bar.key ? (
                            <div className='buttonContainer'>
                                <button className="btn" onClick={() => handleUpdate(bar.key)}>Valider</button>
                                <button className="btn" onClick={handleCancelEdit}>Annuler</button>
                            </div>
                        ) : (
                            <div className='buttonContainer'>
                                <button className="btn" onClick={() => handleEdit(bar.key, bar.nom, bar.localisation, bar.cocktails)}>Modifier</button>
                                <button className="btn" onClick={() => handleDelete(bar.key)}>Supprimer</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {!isEditingBar && (
                <div className='buttonContainerNew'>
                    <button className="btn" onClick={() => setIsAddingBar(true)}>New</button>
                </div>
            )}
            {isAddingBar && (
                <div className='addBarForm'>
                    <h3>Ajouter un nouveau bar :</h3>
                    <input
                        className='input'
                        type='text'
                        value={newBarName}
                        onChange={(e) => setNewBarName(e.target.value)}
                        placeholder='Nom du bar'
                    />
                    <input
                        className='input'
                        type='text'
                        value={newBarLocalisation}
                        onChange={(e) => setNewBarLocalisation(e.target.value)}
                        placeholder='Localisation du bar'
                    />
                    <h4>Cocktails :</h4>
                    {cocktails.map((cocktail) => (
                        <div key={cocktail.key} className='cocktailItem'>
                            <input
                                type='checkbox'
                                checked={newBarCocktails.includes(cocktail.key)}
                                onChange={() => {
                                    if (newBarCocktails.includes(cocktail.key)) {
                                        setNewBarCocktails((prevCocktails) => prevCocktails.filter((key) => key !== cocktail.key));
                                    } else {
                                        setNewBarCocktails((prevCocktails) => [...prevCocktails, cocktail.key]);
                                    }
                                }}
                            />
                            {cocktail.nom}
                        </div>
                    ))}
                    <div className='buttonContainer'>
                        <button className="btn" onClick={handleAddBar}>Valider</button>
                        <button className="btn" onClick={handleCancelAddBar}>Annuler</button>
                    </div>
                </div>
            )}
            {errorMessage && <p className='error'>{errorMessage}</p>}
        </div>
    );
}