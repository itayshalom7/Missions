import React from 'react'
import { useNavigate } from "react-router-dom";
export default function Navbar(props) {
    const navigate = useNavigate();
    return (
        <div id='navbar'>
            <button className='nav-Button' onClick={() => { props.setStatus(0) }}>all mission</button>
            <br />
            <button className='nav-Button' onClick={() => { props.setStatus(1) }}>My missions</button>
            <br />
            <button className='nav-Button' onClick={() => { props.setStatus(2) }}>History</button>
            <br />
            <button className='nav-Button' onClick={() => { navigate("/newMission") }}>new Mission</button>
            <br />
            <button className='nav-Button' onClick={() => { navigate("/") }}>Exit</button>
            <br />
        </div>
    )
}
