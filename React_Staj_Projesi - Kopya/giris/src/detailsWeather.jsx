import { useState, useEffect } from "react";
import axios from "axios";
import MAccountMenuenu from "./Menu";
import "./App.css";

const API_KEY = "d6a73c5e81c743018d4132342242403";

function DetailsWeather() {
  const [citiesWeather, setCitiesWeather] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomCitiesWeather = async () => {
      try {
        const cities = ["Istanbul", "Ankara", "İzmir", "Çanakkale", "Antalya"];
        const cityWeatherPromises = cities.map(async (city) => {
          const response = await axios.get(
            `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=no`
          );
          return {
            name: city,
            temperature: response.data.current.temp_c,
          };
        });
        const citiesWeatherData = await Promise.all(cityWeatherPromises);
        setCitiesWeather(citiesWeatherData);
        setLoading(false); // Yükleme tamamlandı
      } catch (error) {
        console.error("Hava durumu bilgileri alınamadı:", error);
        setLoading(false); // Hata durumunda da yükleme tamamlandı
      }
    };

    fetchRandomCitiesWeather();
  }, []);

  return (
    <div className="container">
      <MAccountMenuenu />

      <div>
        <h2 style={{ marginLeft: "100px" }}> Şehirlerin Hava Durumu</h2>
        {loading ? (
          <p>Hava durumu bilgileri yükleniyor...</p>
        ) : (
          <table className="weather-table">
            <thead>
              <tr>
                <th>Şehir</th>
                <th>Sıcaklık (°C)</th>
              </tr>
            </thead>
            <tbody>
              {citiesWeather.map((city, index) => (
                <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
                  <td>{city.name}</td>
                  <td>{city.temperature} °C</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default DetailsWeather;
