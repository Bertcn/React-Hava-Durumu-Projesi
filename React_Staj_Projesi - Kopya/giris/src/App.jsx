import "./App.css";
import Weather from "./weather";
import DetailsWeather from "./detailsWeather";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="img">
      <Routes>
        <Route path="/weather" element={<Weather />} />
        <Route path="/" element={<Weather />} />
        <Route path="/details" element={<DetailsWeather />} />
      </Routes>
    </div>
  );
}

export default App;
