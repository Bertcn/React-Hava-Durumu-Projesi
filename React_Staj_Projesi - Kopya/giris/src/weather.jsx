import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import MAccountMenuenu from "./Menu";
const API_KEY = "d6a73c5e81c743018d4132342242403";
import { IoPartlySunny } from "react-icons/io5";

function Weather() {
  const [sehir, setSehir] = useState("");
  const [havaDurumu, setHavaDurumu] = useState(null);
  const [hata, setHata] = useState(null);
  const [enSicakSehir, setEnSicakSehir] = useState(null);
  const [enSogukSehir, setEnSogukSehir] = useState(null);
  const [dortgun, setdortgun] = useState(null);

  const dortgunluk = () => {
    if (havaDurumu !== null) {
      setdortgun(<p>{sehir} 3 günlük hava durumu </p>);
    }
  };

  const getWeatherData = async (city) => {
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=4&aqi=yes`
      );
      setHavaDurumu(response.data);
      setHata(null);

      if (
        response.data &&
        response.data.forecast &&
        response.data.forecast.forecastday
      ) {
        const forecastDays = response.data.forecast.forecastday;
        const temperatures = forecastDays.map((day) => day.day.avgtemp_c);
        const maxTemperature = Math.max(...temperatures);
        const minTemperature = Math.min(...temperatures);

        const hottestCity = forecastDays.find(
          (day) => day.day.avgtemp_c === maxTemperature
        );
        const coldestCity = forecastDays.find(
          (day) => day.day.avgtemp_c === minTemperature
        );

        setEnSicakSehir(hottestCity);
        setEnSogukSehir(coldestCity);
      }
    } catch (error) {
      setHavaDurumu(null);
      setEnSicakSehir(null);
      setEnSogukSehir(null);
      setHata(".");
      console.error("Hava durumu bilgileri alınamadı:", error);
    }
  };

  useEffect(() => {
    getWeatherData("Istanbul");
  }, []);

  const handleInputChange = (event) => {
    setSehir(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setEnSicakSehir(null);
    setEnSogukSehir(null);
    getWeatherData(sehir);
  };

  return (
    <div className="container">
      <MAccountMenuenu></MAccountMenuenu>
      <div className="anadiv">
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={sehir}
            onChange={handleInputChange}
            placeholder="Şehir adı girin"
            style={{ width: "250px", height: "35px" }}
          />
          {hata && (
            <span style={{ color: "red", marginTop: "5px" }}>
              Şehir bulunamadı
            </span>
          )}{" "}
          {/* Şehir bulunamadığında mesaj */}
          <button
            type="submit"
            onClick={dortgunluk}
            style={{ marginTop: "15px", width: "250px" }}
          >
            Hava Durumunu Öğren
          </button>
          {dortgun}
        </form>
      </div>
      <div className="altBolum">
        {hata && (
          <div style={{ marginLeft: "964px", marginBottom: "199px" }}>
            {hata}
          </div>
        )}

        {havaDurumu &&
          havaDurumu.forecast.forecastday.map((day, index) => (
            <div key={index} className="gunlukBilgi">
              <IoPartlySunny />
              <h3>{day.date}</h3>
              <p>Sıcaklık: {day.day.avgtemp_c}°C</p>
              <p>Rüzgar Hızı: {day.day.maxwind_kph} km/s</p>
              <p>Nem Oranı: {day.day.avghumidity}%</p>
            </div>
          ))}
      </div>
      <div>
        {enSicakSehir && (
          <div className="sicakSehir">
            <h3>En Yüksek Sıcaklık: {enSicakSehir.name}</h3>
            <p>Sıcaklık: {enSicakSehir.day.avgtemp_c}°C</p>
          </div>
        )}
        {enSogukSehir && (
          <div className="sogukSehir">
            <h3>En Düşük Sıcaklık: {enSogukSehir.name}</h3>
            <p>Sıcaklık: {enSogukSehir.day.avgtemp_c}°C</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
