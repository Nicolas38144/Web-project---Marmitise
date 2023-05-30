import React, { useEffect, useState } from 'react';
import './card_Alcool.css';

export default function Card_Alcool() {
    const [alcools, setAlcools] = useState([]);
    
    const [isAddingAlcool, setIsAddingAlcool] = useState(false);
    const [isEditingAlcool, setIsEditingAlcool] = useState(false);

    const [newAlcoolName, setNewAlcoolName] = useState('');
    const [newAlcoolDegre, setNewAlcoolDegre] = useState('');
    const [newAlcoolDate, setNewAlcoolDate] = useState('');
    const [newAlcoolPrecision, setNewAlcoolPrecision] = useState('');

    const [editAlcoolId, setEditAlcoolId] = useState('');
    const [editAlcoolName, setEditAlcoolName] = useState('');
    const [editAlcoolDegre, setEditAlcoolDegre] = useState('');
    const [editAlcoolDate, setEditAlcoolDate] = useState('');
    const [editAlcoolPrecision, setEditAlcoolPrecision] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const getAlcools = async () => {
        try {
            const response = await fetch('https://api-marmitise.onrender.com/api/alcool/', {});
            const data = await response.json();
            const alcoolsArray = data.map((alcool) => ({
                key: alcool._id,
                id: alcool.id,
                nom: alcool.nom,
                degre: alcool.degre,
                date_fabrication: alcool.date_fabrication,
                precision: alcool.precision
            }));
            setAlcools(alcoolsArray);
        } 
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAlcools();
    }, []);

    const handleDelete = async (alcoolId) => {
        try {
            await fetch(`https://api-marmitise.onrender.com/api/alcool/${alcoolId}`, {
                method: 'DELETE',
            });
            setAlcools((prevAlcools) => prevAlcools.filter((alcool) => alcool.key !== alcoolId));
        } 
        catch (err) {
            console.log(err);
        }
    };

    const handleUpdate = async (alcoolId) => {
        try {
            const existingAlcool = alcools.find((alcool) => alcool.nom.toLowerCase() === editAlcoolName.toLowerCase() && alcool.key !== alcoolId);
            if (existingAlcool) {
                setErrorMessage("Alcohol name already exists");
            } 
            else {
                const response = await fetch(`https://api-marmitise.onrender.com/api/alcool/${alcoolId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        nom: editAlcoolName,
                        degre: editAlcoolDegre,
                        date_fabrication: editAlcoolDate,
                        precision: editAlcoolPrecision
                    }),
                });
                const updatedAlcool = await response.json();
                setAlcools((prevAlcools) => prevAlcools.map((alcool) => (alcool.key === alcoolId ? {...alcool, nom: updatedAlcool.nomAlcool, degre: updatedAlcool.degre, date_fabrication: updatedAlcool.date_fabrication, precision: updatedAlcool.precision} : alcool)));
                getAlcools();
                setIsEditingAlcool(false);
                setEditAlcoolId('');
                setEditAlcoolName('');
                setEditAlcoolDegre('');
                setEditAlcoolDate('');
                setEditAlcoolPrecision('');
                setErrorMessage('');
            }
        } 
        catch (err) {
            console.log(err);
        }
    };

    const handleAddAlcool = async () => {
        try {
            const existingAlcool = alcools.find((alcool) => alcool.nom.toLowerCase() === newAlcoolName.toLowerCase());
            if (existingAlcool) {
                setErrorMessage('Ce nom de alcool existe déjà');
            }
            else {
                const response = await fetch('https://api-marmitise.onrender.com/api/alcool/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        nom: newAlcoolName,
                        degre: newAlcoolDegre,
                        date_fabrication: newAlcoolDate,
                        precision: newAlcoolPrecision 
                    }),
                });
                const newAlcool = await response.json();
                setAlcools((prevAlcools) => [...prevAlcools, { key: newAlcool._id, id: newAlcool.id, nom: newAlcool.nom, degre: newAlcool.degre, date_fabrication: newAlcool.date_fabrication, precision: newAlcool.precision }]);
                getAlcools();
                setNewAlcoolName('');
                setNewAlcoolDegre('');
                setNewAlcoolDate('');
                setNewAlcoolPrecision('');
                setIsAddingAlcool(false);
                setErrorMessage('');
            }
        } 
        catch (err) {
            console.log(err);
        }
    };

    const handleEdit = (alcoolId, alcoolName, alcoolDegre, alcoolDate, alcoolPrecision) => {
        setIsEditingAlcool(true);
        setEditAlcoolId(alcoolId);
        setEditAlcoolName(alcoolName);
        setEditAlcoolDegre(alcoolDegre);
        setEditAlcoolDate(alcoolDate);
        setEditAlcoolPrecision(alcoolPrecision);
        setErrorMessage('');
    };

    const handleCancelEdit = () => {
        setIsEditingAlcool(false);
        setEditAlcoolId('');
        setEditAlcoolName('');
        setEditAlcoolDegre('');
        setEditAlcoolDate('');
        setEditAlcoolPrecision('');
        setErrorMessage('');
    };

    const handleCancelAddAlcool = () => {
        setIsAddingAlcool(false);
        setNewAlcoolName('');
        setNewAlcoolDegre('');
        setNewAlcoolDate('');
        setNewAlcoolPrecision('');
        setErrorMessage('');
    };

    return (
        <div className='card_Alcool'>
            <div className='card_Alcool_0'>
                {alcools.map((alcool) => (
                    <div key={alcool.key} className='alcoolItem'>
                        {isEditingAlcool && editAlcoolId === alcool.key ? 
                        (
                        <>
                            <div className='div_input'>
                                <input className='input'
                                    type='text'
                                    value={editAlcoolName}
                                    onChange={(e) => setEditAlcoolName(e.target.value)}
                                    placeholder='Alcohol name'
                                />
                                <input className='input'
                                    type='number'
                                    min={0}
                                    max={100}
                                    value={editAlcoolDegre}
                                    onChange={(e) => setEditAlcoolDegre(e.target.value)}
                                    placeholder='Alcohol degre'
                                />
                                <input className='input'
                                    type='number'
                                    min={1890}
                                    value={editAlcoolDate}
                                    onChange={(e) => setEditAlcoolDate(e.target.value)}
                                    placeholder='Date of manufacture'
                                />
                                <input className='input'
                                    type='text'
                                    value={editAlcoolPrecision}
                                    onChange={(e) => setEditAlcoolPrecision(e.target.value)}
                                    placeholder='About'
                                />
                            </div>
                            <div className='div_btn'>
                                <button className="btn" onClick={() => handleUpdate(alcool.key)}>Validate</button>
                                <button className="btn" onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        </>
                        ) 
                        : 
                        (
                        <>
                            <div className='div_info'>
                                <span className='input'>{alcool.nom}</span>
                                <span className='input info_mineure'>({alcool.degre}%)</span>
                                {alcool.date_fabrication && (
                                    <span className='input info_mineure'>Year: {alcool.date_fabrication}</span>
                                )}
                                {alcool.precision && (
                                    <span className='input info_mineure'>About: {alcool.precision}</span>
                                )}
                            </div>
                            <div className='div_btn'>
                                <button className="btn" onClick={() => handleEdit(alcool.key, alcool.nom, alcool.degre, alcool.date_fabrication, alcool.precision)}>Modify</button>
                                <button className="btn" onClick={() => handleDelete(alcool.key)}>delete</button>
                            </div>
                        </>
                        )}
                    </div>
                ))}
            </div>

            {isAddingAlcool ? 
            (
                <div className='card_Alcool_1'>
                    <div className='alcoolItem'>
                        <div className='input_for_new'>
                            <input className='input'
                                type='text'
                                value={newAlcoolName}
                                onChange={(e) => setNewAlcoolName(e.target.value)}
                                placeholder='Name of the new alcohol'
                            />
                            <input className='input'
                                type='number'
                                min={0}
                                max={100}
                                value={newAlcoolDegre}
                                onChange={(e) => setNewAlcoolDegre(e.target.value)}
                                placeholder='Alcohol degree'
                            />
                            <input className='input'
                                type='number'
                                min={1890}
                                value={newAlcoolDate}
                                onChange={(e) => setNewAlcoolDate(e.target.value)}
                                placeholder='Date of manufacture'
                            />
                            <input className='input'
                                type='text'
                                value={newAlcoolPrecision}
                                onChange={(e) => setNewAlcoolPrecision(e.target.value)}
                                placeholder='About'
                            />
                        </div>
                        <div  className='div_btn'>
                            <button className="btn" onClick={handleCancelAddAlcool}>Cancel</button>
                            <button className="btn" onClick={handleAddAlcool}>Add</button>
                        </div>
                    </div>
                </div>
            ) 
            : 
            (
                <button className="btn btn_last" onClick={() => setIsAddingAlcool(true)}>New</button>
            )}
            {errorMessage && <p className='msg_error'>{errorMessage}</p>}
        </div>
    );
}
