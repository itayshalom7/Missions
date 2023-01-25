import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Mission from './Mission'

export default function MissionList(props) {
    const [list, setList] = useState([])
    useEffect(() => {
        fetch('/api/menu-missions', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(response => response.json()).then(res => {
            setList((res).map(index => {
                return index
            }))
        })

    }, [])
    let showMissison = () => {
        console.log(list)
        if (list != []) {
            return (list.map(index => {
                if (props.status === 0) {
                    if (index.whoFinished === ""){
                        console.log("hey")
                        return <Mission workername={props.workername} details={index} setList={setList} />
                }}
                else if (props.status === 1) {
                    if (index.workerName === props.workername){
                        return <Mission workername={props.workername} details={index} />
                }}
                else if (props.status === 2) {
                    if (index.whoFinished !== "") {
                        return <Mission workername={props.workername} details={index} />
                    }
                }
                else 
                return 
            }))
        }
    }

    return (
        <div id='missionList'>
            {showMissison()}
        </div>
    )
}
