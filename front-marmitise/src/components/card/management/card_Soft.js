import React, { useEffect, useState } from 'react';
import './card_Soft_Ingredient.css';

export default function Card_Soft() {
    const [softs, setSofts] = useState([]);
    const [newSoftName, setNewSoftName] = useState('');
    const [isAddingSoft, setIsAddingSoft] = useState(false);
    const [isEditingSoft, setIsEditingSoft] = useState(false);
    const [editSoftId, setEditSoftId] = useState('');
    const [editSoftName, setEditSoftName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const getSofts = async () => {
        try {
            //const response = await fetch('http://localhost:8000/api/soft/', {
            const response = await fetch('https://api-marmitise.onrender.com/api/soft/', {
                method: 'GET',
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            const data = await response.json();
            const softsArray = data.map((soft) => ({
                key: soft._id,
                id: soft.id,
                name: soft.nomSoft,
            }));
            setSofts(softsArray);
        } 
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getSofts();
    }, []);

    const handleDelete = async (softId) => {
        try {
            //await fetch(`http://localhost:8000/api/soft/${softId}`, {
            await fetch(`https://api-marmitise.onrender.com/api/soft/${softId}`, {
                method: 'DELETE',
                'Authorization': localStorage.getItem('token')
            });
            setSofts((prevSofts) => prevSofts.filter((soft) => soft.key !== softId));
        } 
        catch (err) {
            console.log(err);
        }
    };

    const handleUpdate = async (softId) => {
        try {
            const existingSoft = softs.find((soft) => soft.name.toLowerCase() === editSoftName.toLowerCase() && soft.key !== softId);
            if (existingSoft) {
                setErrorMessage('Ce nom de soft existe déjà');
            } 
            else {
                //const response = await fetch(`http://localhost:8000/api/soft/${softId}`, {
                const response = await fetch(`https://api-marmitise.onrender.com/api/soft/${softId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token')
                    },
                    body: JSON.stringify({ nomSoft: editSoftName }),
                });
                const updatedSoft = await response.json();
                setSofts((prevSofts) => prevSofts.map((soft) => (soft.key === softId ? { ...soft, name: updatedSoft.nomSoft } : soft)));
                setIsEditingSoft(false);
                setEditSoftId('');
                setEditSoftName('');
                setErrorMessage('');
            }
        } 
        catch (err) {
            console.log(err);
        }
    };

    const handleAddSoft = async () => {
        try {
            const existingSoft = softs.find((soft) => soft.name.toLowerCase() === newSoftName.toLowerCase());
            if (existingSoft) {
                setErrorMessage('Ce nom de soft existe déjà');
            }
            else {
                //const response = await fetch('http://localhost:8000/api/soft/', {
                const response = await fetch('https://api-marmitise.onrender.com/api/soft/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token')
                    },
                    body: JSON.stringify({ nomSoft: newSoftName }),
                });
                const newSoft = await response.json();
                setSofts((prevSofts) => [...prevSofts, { key: newSoft._id, id: newSoft.id, name: newSoft.nomSoft }]);
                getSofts();
                setNewSoftName('');
                setIsAddingSoft(false);
                setErrorMessage('');
            }
        } 
        catch (err) {
            console.log(err);
        }
    };

    const handleEdit = (softId, softName) => {
        setIsEditingSoft(true);
        setEditSoftId(softId);
        setEditSoftName(softName);
        setErrorMessage('');
    };

    const handleCancelEdit = () => {
        setIsEditingSoft(false);
        setEditSoftId('');
        setEditSoftName('');
        setErrorMessage('');
    };

    const handleCancelAddSoft = () => {
        setIsAddingSoft(false);
        setNewSoftName('');
        setErrorMessage('');
    };

    return (
        <div className='card_Original'>
            <div className='card_Soft_Ingredient'>
                {softs.map((soft) => (
                    <div key={soft.key} className='softItem'>
                        {isEditingSoft && editSoftId === soft.key ? 
                        (
                        <>
                            <input className='input'
                                type='text'
                                value={editSoftName}
                                onChange={(e) => setEditSoftName(e.target.value)}
                                placeholder='Nom du soft'
                            />
                            <div className='div_btn'>
                                <button className="btn" onClick={() => handleUpdate(soft.key)}>Validate</button>
                                <button className="btn" onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        </>
                        ) 
                        : 
                        (
                        <>
                            <span className='input'>{soft.name}</span>
                            <div className='div_btn'>
                                <button className="btn" onClick={() => handleEdit(soft.key, soft.name)}>Modify</button>
                                <button className="btn" onClick={() => handleDelete(soft.key)}>delete</button>
                            </div>
                        </>
                        )}
                    </div>
                ))}
            </div>

            {isAddingSoft ? 
            (
                <div className='card_Soft_Ingredient_bis'>
                    <div className='softItem'>
                    <input className='input'
                        type='text'
                        value={newSoftName}
                        onChange={(e) => setNewSoftName(e.target.value)}
                        placeholder='Nom du nouveau soft'
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
                <button className="btn btn_last" onClick={() => setIsAddingSoft(true)}>New</button>
            )}
            {errorMessage && <p className='msg_error'>{errorMessage}</p>}
        </div>
    );
}
