import logo from './logo.svg';
import './App.css';
import { useState } from "react";

function App() {
  const [showing, setShow] = useState(1);

  function handleClick() {
    setShow((showing) => !showing);
  }

  return (
    <div className="App">
      <BeepboopButton showing={showing} onClick={handleClick} />
      {showing ? <h1>it truly does not get more simple than this</h1> : null}
    </div>
  );
}

function BeepboopButton({ showing, onClick }) {
  return <button onClick={onClick}>bibbity boppity give me the zoppity</button>;
}

export default App;
