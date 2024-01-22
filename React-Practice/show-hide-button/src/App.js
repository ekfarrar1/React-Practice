import logo from './logo.svg';
import './App.css';
import { useState } from "react";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

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
