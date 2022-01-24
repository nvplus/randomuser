import React, {useEffect, useState} from 'react';
import axios from 'axios';

const API_URL = "https://randomuser.me/api/"

const MainDisplay = (props) => {
    const {picture, name} = props.userInfo;
    console.log(props.userInfo);

    return (
        <> 
           <img src={picture.medium} />
           <p>
               {`Hello, ${name.first} ${name.last}`}
           </p>
        </>
    )
}

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
            {currentUser !== null && <>
                <MainDisplay userInfo={currentUser} />
            </>}  
            <br />
            <button onClick={onClick}>Fetch random user</button>
        </>
    )
}  

export default RandomUser;