import './App.css';
import MapCanvas from './components/MapCanvas';
import DeleteButton from './components/DeleteButton';

function App() {
  return (
    <div className="App-wrapper">
      <MapCanvas/>
      <DeleteButton />
    </div>
  );
}

export default App;
