import React, { useEffect, useState } from 'react';
import './card_User.css';

export default function Card_User() {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            //const response = await fetch('http://localhost:8000/api/user/', {
            const response = await fetch('https://api-marmitise.onrender.com/api/user/', {
                method: 'GET',
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            const data = await response.json();
            const filteredUsers = data.filter((user) => !user.admin); /* Pour ne pas prendre l'admin */
            const usersArray = filteredUsers.map((user) => ({
                key: user._id,
                id: user.id,
                email: user.email,
            }));
            setUsers(usersArray);
        } 
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    
    const handleDelete = async (userId) => {
        try {
            //await fetch(`http://localhost:8000/api/user/${userId}`, {
            await fetch(`https://api-marmitise.onrender.com/api/user/${userId}`, {
                method: 'DELETE',
                'Authorization': localStorage.getItem('token')
            });
            setUsers((prevUsers) => prevUsers.filter((user) => user.key !== userId));
        } 
        catch (err) {
            console.log(err);
        }
    };

    
    return (
        <div className='card_User'>
            <div className='card_User_bis'>
                {users.map((user) => (
                    <div key={user.key} className='userItem'>
                        <span className='input'>{user.email}</span>
                            <div className='div_btn'>
                                <button className="btn" onClick={() => handleDelete(user.key)}>delete</button>
                            </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
