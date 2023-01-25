import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import { useEffect } from 'react';

export default function NewMission() {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [workerName, setWorkerName] = useState("")
    const [workersList, setWorkersList] = useState([])
    let checkName = (event) => { setName(event.target.value) }
    let checkDescription = (event) => { setDescription(event.target.value) }
    let checkWorkerName = (event) => { setWorkerName(event.target.value) }

    useEffect(() => {
        fetch('/api/getWorkersName', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then (response=>response.json()).then (res=> {
            console.log(res)

            setWorkersList(res.map(index=>{
                console.log(index.username)
            return index.username}))})
      }, [])
    


    let addMission = () => {
        fetch('/api/add-mission', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, description: description, workerName: workerName  , whoFinished: ""})
        })
            .then(response =>{return response.json()})
            .then(res => {
                console.log(res);
                  navigate('/homepage')
                }
              )
    }

return (
    <div>
        <h2>Add new missison!   <button onClick={() => { navigate("/homepage") }}>x</button></h2>
        <input type="text" name="missionName" id="missionName" placeholder='Mission name' onChange={checkName} />
        <input type="text" name="description" id="description" placeholder='description' onChange={checkDescription} /> 
        <label htmlFor="">worker name</label>
        <select id="workerName" name="workerName" onChange={checkWorkerName}>
            <option value={"all Workers"}>all Workers</option>
    {workersList.map(index=>{return <option value={index}>{index}</option> })}
  </select>
        <button onClick={() => { addMission() }}>send</button>


    </div>
)
}
