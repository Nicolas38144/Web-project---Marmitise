import React, { useEffect, useState } from 'react';
import './card_Soft_Ingredient.css';

export default function Card_Ingredient() {
    const [ingredients, setIngredients] = useState([]);
    const [newIngredientName, setNewIngredientName] = useState('');
    const [isAddingIngredient, setIsAddingIngredient] = useState(false);
    const [isEditingIngredient, setIsEditingIngredient] = useState(false);
    const [editIngredientId, setEditIngredientId] = useState('');
    const [editIngredientName, setEditIngredientName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const getIngredients = async () => {
        try {
            const response = await fetch('https://api-marmitise.onrender.com/api/ingredient/', {});
            const data = await response.json();
            const ingredientsArray = data.map((ingredient) => ({
                key: ingredient._id,
                id: ingredient.id,
                name: ingredient.nomIngredient,
            }));
            setIngredients(ingredientsArray);
        } 
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getIngredients();
    }, []);

    const handleDelete = async (ingredientId) => {
        try {
            await fetch(`https://api-marmitise.onrender.com/api/ingredient/${ingredientId}`, {
                method: 'DELETE',
            });
            setIngredients((prevIngredients) => prevIngredients.filter((ingredient) => ingredient.key !== ingredientId));
        } 
        catch (err) {
            console.log(err);
        }
    };

    const handleUpdate = async (ingredientId) => {
        try {
            const existingSoft = ingredients.find((ingredient) => ingredient.name.toLowerCase() === editIngredientName.toLowerCase() && ingredient.key !== ingredientId);
            if (existingSoft) {
                setErrorMessage('Ce nom de ingredient existe déjà');
            } 
            else {
                const response = await fetch(`https://api-marmitise.onrender.com/api/ingredient/${ingredientId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nomIngredient: editIngredientName }),
                });
                const updatedSoft = await response.json();
                setIngredients((prevIngredients) =>
                prevIngredients.map((ingredient) => (ingredient.key === ingredientId ? { ...ingredient, name: updatedSoft.nomIngredient } : ingredient)));
                setIsEditingIngredient(false);
                setEditIngredientId('');
                setEditIngredientName('');
                setErrorMessage('');
            }
        } 
        catch (err) {
            console.log(err);
        }
    };

    const handleAddSoft = async () => {
        try {
            const existingSoft = ingredients.find((ingredient) => ingredient.name.toLowerCase() === newIngredientName.toLowerCase());
            if (existingSoft) {
                setErrorMessage('Ce nom de ingredient existe déjà');
        } 
        else {
            const response = await fetch('https://api-marmitise.onrender.com/api/ingredient/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nomIngredient: newIngredientName }),
            });
            const newSoft = await response.json();
            setIngredients((prevIngredients) => [...prevIngredients, { key: newSoft._id, id: newSoft.id, name: newSoft.nomIngredient }]);
            getIngredients();
            setNewIngredientName('');
            setIsAddingIngredient(false);
            setErrorMessage('');
        }
        } 
        catch (err) {
            console.log(err);
        }
    };

    const handleEdit = (ingredientId, softName) => {
        setIsEditingIngredient(true);
        setEditIngredientId(ingredientId);
        setEditIngredientName(softName);
        setErrorMessage('');
    };

    const handleCancelEdit = () => {
        setIsEditingIngredient(false);
        setEditIngredientId('');
        setEditIngredientName('');
        setErrorMessage('');
    };

    const handleCancelAddSoft = () => {
        setIsAddingIngredient(false);
        setNewIngredientName('');
        setErrorMessage('');
    };

    return (
        <div className='card_Original'>
            <div className='card_Soft_Ingredient'>
                {ingredients.map((ingredient) => (
                    <div key={ingredient.key} className='softItem'>
                        {isEditingIngredient && editIngredientId === ingredient.key ? 
                        (
                        <>
                            <input className='input'
                                type='text'
                                value={editIngredientName}
                                onChange={(e) => setEditIngredientName(e.target.value)}
                                placeholder="Nom de l'ingredient"
                            />
                            <div className='div_btn'>
                                <button className="btn" onClick={() => handleUpdate(ingredient.key)}>Validate</button>
                                <button className="btn" onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        </>
                        ) 
                        : 
                        (
                        <>
                            <span className='input'>{ingredient.name}</span>
                            <div className='div_btn'>
                                <button className="btn" onClick={() => handleEdit(ingredient.key, ingredient.name)}>Modify</button>
                                <button className="btn" onClick={() => handleDelete(ingredient.key)}>delete</button>
                            </div>
                        </>
                        )}
                    </div>
                ))}
            </div>

            {isAddingIngredient ? 
            (
                <div className='card_Soft_Ingredient_bis'>
                    <div className='softItem'>
                    <input className='input'
                        type='text'
                        value={newIngredientName}
                        onChange={(e) => setNewIngredientName(e.target.value)}
                        placeholder='Nom du nouveau ingredient'
                    />
                    <div  className='div_btn'>
                        <button className="btn" onClick={handleCancelAddSoft}>Cancel</button>
                        <button className="btn" onClick={handleAddSoft}>Add</button>
                    </div>
                    </div>
                </div>
            ) 
            : 
            (
                <button className="btn btn_last" onClick={() => setIsAddingIngredient(true)}>New</button>
            )}
            {errorMessage && <p className='msg_error'>{errorMessage}</p>}
        </div>
    );
}
