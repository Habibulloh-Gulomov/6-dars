import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [value, setvalue] = useState("");
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [save, setSave] = useState([]);

  // Inputga quloq solib turadi Inputni ichida Enter bosilsa shu funksiya ishlaydi
  function handleInputChange(evt) {
    if (evt.code === "Enter") {
      setvalue(evt.target.value);
      evt.target.value = "";
    }
  }

  useEffect(() => {
    // Hargal inputdagi value o'zgarganda fetch qiladi (agar inputda value mavjud bo'lsa)
    if (value) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=ff5bcda0d22bee80304f787a3b336e9d&units=metric`
      )
        .then((res) => res.json())
        .then((info) => setData([...data, info])); // har gal fetch qilganda oldingi shaharlani nomi ham o'chib ketmasligi kerak shuning uchun ...data qilib oldingi datani ham olib qo'yish kerak
    }
  }, [value]);
  
  
  useEffect(() => {
    // Hargal inputdagi value o'zgarganda fetch qiladi (agar inputda value mavjud bo'lsa)
    if (value) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=ff5bcda0d22bee80304f787a3b336e9d&units=metric`
      )
        .then((res) => res.json())
        .then((info) => setData2([ info])); // har gal fetch qilganda oldingi shaharlani nomi ham o'chib ketmasligi kerak shuning uchun ...data qilib oldingi datani ham olib qo'yish kerak
    }
  }, [value]);// har gal value o'zgarganda

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
            // agar datani uzunligi beshdan kichkina bo'lsa 0 dan beshgacha bo'lganini olib beradi agar beshdan katta bo'lsa oxirgi beshtasini olib beradi. Batafsil: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice ⬇️⬇️⬇️
            data
              ?.slice(data.length <= 5 ? 0 : Math.abs(data.length - 5))
              .map((e) => (
                <li className="item" key={e.name}>
                  <button
                  className="button"
                    name={e.name}
                    onClick={() => setSave([...save, e])} // button bosilganda oldingi saved arrayni ichida shaharlani ham olib keladi va hozir bosilgan shaharni ham saved ga qo'shib qo'yadi(setSave qiladi)
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