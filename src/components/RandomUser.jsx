import React, {useEffect, useState} from 'react';
import axios from 'axios';

const API_URL = "https://randomuser.me/api/"
const RandomUser = () => {
    const [currentUser, setCurrentUser] = useState(null);

    const fetchRandomUser = async () => {
        const randomUser = await axios.get(API_URL);
        return randomUser.data.results[0];
    }

    const onClick = async () => {
        setCurrentUser(await fetchRandomUser());
    } 
    
    // On mount, set the current user.
    useEffect(async () => {
        onClick();
    }, []);



    return (
        <>
            <button onClick={onClick}>Fetch random user</button>
            <p>
                {currentUser && JSON.stringify(currentUser)}
            </p>
        </>
    )
}  

export default RandomUser;