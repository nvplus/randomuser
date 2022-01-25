import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../css/randomuser.css'

const API_URL = "https://randomuser.me/api/"

const formatDate = (date => {
    const months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    return `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`
});

const MainDisplay = (props) => {
    const {name} = props.userInfo;
    console.log(props.userInfo);

    return (
        <div className="main"> 
            Hi, I'm
           <h2>
               {`${name.first} ${name.last}`}
           </h2>
        </div>
    )
}


const Personal = (props) => {

    const {dob, email, phone} = props.userInfo;
    const birthdate = new Date(dob.date);

    return (
        <>
           <ul>
                <li><b>Age:</b> {dob.age}</li>
                <li><b>Birthdate:</b> {formatDate(birthdate)}</li>
                <li><b>Phone:</b> {phone}</li>
                <li><b>E-mail:</b> {email}</li>
           </ul>
        </>
    )
}


const Nav = (props) => {
    const { setCurrentView } = props;

    return (
        <ul className="nav">
            <li>
                <NavButton onClick={() => setCurrentView("main")}>Main</NavButton>
            </li>

            <li>
                <NavButton onClick={() => setCurrentView("personal")}>Personal Info</NavButton>
            </li>
        </ul>
    )
}

const NavButton = (props) => {
    return (
        <button onClick={props.onClick} className="nav-button">
            {props.children}
        </button>
    )
}
const RandomUser = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentView, setCurrentView] = useState("main")

    const fetchRandomUser = async () => {
        const randomUser = await axios.get(API_URL);
        console.log(randomUser.data.results[0]);
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
        <div className="randomuser">     
            {currentUser !== null && <>
                <img src={currentUser.picture.large} className="avatar" />
                <div className="content">{renderView(currentView)}</div>
            </>}
            <Nav setCurrentView={setCurrentView} />
            <br />
        </div>
    )
}  

export default RandomUser;