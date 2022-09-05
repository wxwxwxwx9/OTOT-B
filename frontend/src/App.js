import logo from './logo.svg';
import './App.css';
import 'bulma/css/bulma.min.css'
import AddContact from './components/AddContact';
import ContactBook from './components/ContactBook';

function App() {
  return (
    <div className="App">
      <AddContact/>
      <ContactBook/>
    </div>
  );
}

export default App;
