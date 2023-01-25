import React, { useState } from 'react';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import Login from './components/Login';
import NewMission from './components/NewMission';

function App() {
  const [username, setUsername] = useState("")

  return (
    <div id='main' className="App">

      <Router>
        <Routes>
          <Route path='/' element={<Login setUsername={setUsername} />} />
          <Route path='/homepage' element={<Homepage username={username}/>} />
          <Route path='/newmission' element={<NewMission/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
