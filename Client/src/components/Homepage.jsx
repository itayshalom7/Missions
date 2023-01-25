import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import MissionList from './MissionList'
import Navbar from './Navbar'


export default function Homepage(props) {
  const [status, setStatus] = useState(0)

  let showMissison = () => {
    return <MissionList workername={props.username} status={status} />
  }
  return (

    <div>
      <h3>welcome {props.username}</h3>
      <div id='homePage'>

        <Navbar username={props.username} setStatus={setStatus} />
        <div>
          {showMissison()}
        </div>

      </div>
    </div>
  )
}
