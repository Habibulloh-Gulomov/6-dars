import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [value,setvalue] = useState('')
  const [data, setData] = useState([])
  const [save, setSave] = useState([])
  // console.log(data);
  // console.log(value);

  useEffect(()=>{
   save.push(value)
  },[value])

  useEffect(()=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=6241352dd86a4183c3f7840c04e41c00&units=metric`)
    .then((res) =>res.json())
    .then((data) => setData(data))
  },[value])

//  console.log(data);
  // let newsave = save.splice(save.length -5,1);
  return (

    <div className="App">
    
      <input onKeyUp={((e) => e.key == 'Enter' ? setvalue(e.target.value) : 'error' )} type="text" />
    <div>
    {
    data.length && data.map((e)=>{
      
     return(
      
      <div>
        <p>{e.name}</p>
      </div>
     )
    })
    }
    </div>
    <ul>
      {
       save.lenth && save.splice(save.length -5 ,5).map((e)=>(
          <li>
            <button>❤</button>
            <button>{e}</button>
          </li>
        ))
      }
    </ul>
    </div>
  );
}

export default App;
