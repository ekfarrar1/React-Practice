import logo from './logo.svg';
import './App.css';
import Inputbox from './input-box/input-box';


function App(){
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Progress bar<br></br>
          <Inputbox></Inputbox>
        </p>
      </header>
    </div>
  );
}

export default App;
