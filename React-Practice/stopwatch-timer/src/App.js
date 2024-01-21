import logo from './logo.svg';
import './App.css';
import Stopwatch from './stopwatch/stopwatch.jsx'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <Stopwatch />
        </p>
      </header>
    </div>
  );
}

export default App;
