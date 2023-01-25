import React from 'react'
import { useState } from 'react'

export default function Mission(props) {
  const [statuss, setStatus] = useState(false)


  let showMissison = () => {
    if (!statuss)
      return <div onClick={() => setStatus(true)}>
        <h5>mission name {props.details.name}    mission of {props.details.workerName}</h5>
      </div>
    else {
      if (props.details.whoFinished === "")
        return <div>
          <h4>{props.details.name}  <button onClick={() => setStatus(false)}>X</button></h4>
          <br />
          <h5>{props.details.description}</h5>
          <h5>mission of {props.details.workerName}</h5>
          <button onClick={() => { finishTask() }}>end task</button>
        </div>

      else
        return <div>
          <h4>{props.details.name}  <button onClick={() => setStatus(false)}>X</button></h4>
          <h5>{props.details.description}</h5>
          <h5>mission of {props.details.workerName}</h5>
          <h5>finished the mission {props.details.whoFinished}</h5>

        </div>

    }
  }

  let finishTask = () => {
    fetch('/api/finish-task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: props.details.name, description: props.details.description, workerName: props.details.workerName, whoFinished: props.workername })
    })
      .then(response => { return response.json() })
      .then(res => {
        console.log(res);
        props.setList(res);

      }
      )
    setStatus(false)
  }
  return (
    <div class='mission'>
      {showMissison()}
    </div>
  )
}
