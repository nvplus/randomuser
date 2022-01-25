import React, {useEffect, useState} from 'react';
import axios from 'axios';

const API_URL = "https://randomuser.me/api/"

const MainDisplay = (props) => {
    const {name} = props.userInfo;

    return (
        <> 
           <p>
               {`Hello, ${name.first} ${name.last}`}
           </p>
        </>
    )
}


const Personal = (props) => {
    const months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const {dob, email, phone} = props.userInfo;
    const birthdate = new Date(dob.date);

    return (
        <>
           <ul>
                <li>Age: {dob.age}</li>
                <li>Born: {`${days[birthdate.getDay()]} ${months[birthdate.getMonth()]} ${birthdate.getDay()}, ${birthdate.getFullYear()}`}</li>
                <li>Phone number: {phone}</li>
                <li>Email address: {email}</li>
           </ul>
        </>
    )
}


const Nav = (props) => {
    const { setCurrentView } = props;

    return (
        <ul className="navbar">
            <li>
                <button onClick={() => setCurrentView("main")}>Main</button>
            </li>

            <li>
                <button onClick={() => setCurrentView("personal")}>Personal Info</button>
            </li>
        </ul>
    )
}

const RandomUser = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentView, setCurrentView] = useState("main")

    const fetchRandomUser = async () => {
        const randomUser = await axios.get(API_URL);
        return randomUser.data.results[0];
    }

    const onClick = async () => {
        setCurrentView("main");
        setCurrentUser(await fetchRandomUser());
    } 

    // On mount, set the current user.
    useEffect(async () => {
        onClick();
    }, []);

    const renderView = (view) => {
        switch(view){
            case 'personal':
                return <Personal userInfo={currentUser} />

            case 'main':
            default:
                return <MainDisplay userInfo={currentUser}/>
        }
    }
    return (
        <>     
            {currentUser !== null && <>
                <img src={currentUser.picture.medium} />
                {renderView(currentView)}
            </>}
            <Nav setCurrentView={setCurrentView} />
            <br />
            <button onClick={onClick}>Fetch random user</button>
        </>
    )
}  

export default RandomUser;