import { useState, useEffect } from "react"
import './App.css';
import getApiSuggestions from './components/GetApiSuggestions';
import SearchInput from './components/SearchInput';
import AutoCompletebar2 from  './components/AutoCompletebar2'
import ProgressBar from './components/ProgressBar'

function App() {

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [value, updateValue] = useState(0);
  const [show, setShow] = useState(true)
  let step = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      updateValue(oldValue => {
        if (show === false) {
          clearInterval(interval)
          return oldValue
        }
        if (show === true) {
          const newValue = oldValue + step;
          if (newValue >= 100 || newValue <= 0) {
            step = -step
          }
          return newValue
        }
      });
    }, 50)
  } ,[])

  const getSuggestions = async (word) => {
    if (word) {
      setLoading(true);
      let response = await getApiSuggestions(word);
      setUsers(response.results)
      let matches = []
      if (word.length > 0 && users !== null && users !== undefined) {
        matches = users.filter(user => {
        const regex = new RegExp(`${word}`, "gi");
        return user.name.match(regex)
        })
    }
      setOptions(matches);
      console.log('matches', matches)
      setLoading(false);
    } 
    else {
        setOptions([]);
    }
    };

  return (
    <div className="App">
      <ProgressBar value={value}/>
      <div className="resume" >
        <button className="progress-bar" onClick = {() => setShow(!show)}> {show ? 'Stop' : 'Start'} </button>
      </div>
      <h3>Type Ahead Search with API (e.g. Type "pik" for "pikachu")</h3>
        <SearchInput
          loading={loading}
          options={options}
          requests={getSuggestions}
          placeholder="Search"
        />
      <h3>Keyword Search with no API (e.g. Type "A" for "CA, AZ, WA")</h3>
        < AutoCompletebar2/>
    </div>
  );
}

export default App;
