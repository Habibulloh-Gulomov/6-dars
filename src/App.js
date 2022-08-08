import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [value, setvalue] = useState("");
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [save, setSave] = useState([]);

  function handleInputChange(evt) {
    if (evt.code === "Enter") {
      setvalue(evt.target.value);
      evt.target.value = "";
    }
  }

  useEffect(() => {
    if (value) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=ff5bcda0d22bee80304f787a3b336e9d&units=metric`
      )
        .then((res) => res.json())
        .then((info) => setData([...data, info])); 
    }
  }, [value]);
  
  
  useEffect(() => {
    if (value) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=ff5bcda0d22bee80304f787a3b336e9d&units=metric`
      )
        .then((res) => res.json())
        .then((info) => setData2([ info]));
    }
  }, [value]);

  return (
    <div className="App">
      <input onKeyUp={handleInputChange} placeholder='Search...' type="text" />

      <div className="wrapper">
        <div className="saved">
          <h2>Saved</h2>
          {save?.map((element) => (
            <div className="item">
              <span>🧡</span>
            <button className="button" onClick={(()=> setvalue(element.name))} key={element.name}>{element.name}</button>
            </div>
          ))}
        </div>
        <div className="info">
          {
            data2?.map((e)=>{
              return(
                <div>
                  <h2><span>Weather of </span>{e.name}</h2>
                  
                  <p className="text" ><img className="img" src={`http://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`} alt="img" />{e.main.temp} <span>°C</span>
                  </p>
                  <p><span>Wind speed: </span>{e.wind.speed}</p>
                  <p>{e.weather[0].description}</p>
                </div>
              )
            })
          }
        </div>

        <ul className="cities">
          <li>
          <h2>Last searched.</h2>
          </li>
          {
            data
              ?.slice(data.length <= 5 ? 0 : Math.abs(data.length - 5))
              .map((e) => (
                <li className="item" key={e.name}>
                  <button
                  className="button"
                    name={e.name}
                    onClick={() => setSave([...save, e])} 
                  >
                    🤍
                  </button>
                  <button className="button" onClick={(()=> setvalue(e.name))}>{e.name}</button>
                </li>
              ))
          }
        </ul>
      </div>
    </div>
  );
};

export default App;