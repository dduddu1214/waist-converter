import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import PantsSize from "./pages/PantsSize";
import UpperSize from "./pages/UpperSize";
import ReverseConvert from "./pages/ReverseConvert";
import "./App.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <BrowserRouter>
      <div className={`wrapper ${isDarkMode ? "dark" : "light"}`}>
        <div className="container">
          <div className="header">
            <button
              onClick={() => setIsDarkMode((prev) => !prev)}
              className="theme-toggle"
            >
              {isDarkMode ? "☀️ 라이트모드" : "🌙 다크모드"}
            </button>
          </div>

          <Navigation />

          <Routes>
            <Route path="/" element={<PantsSize />} />
            <Route path="/upper" element={<UpperSize />} />
            <Route path="/reverse" element={<ReverseConvert />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
