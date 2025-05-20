import { useState, useEffect } from "react";
import "./App.css";

function getPantsSize(inch) {
  if (inch < 26) return "XS (24~25)";
  if (inch < 28) return "S (26~27)";
  if (inch < 30) return "M (28~29)";
  if (inch < 32) return "L (30~31)";
  if (inch < 34) return "XL (32~33)";
  return "XXL (34 이상)";
}

function App() {
  const [halfCm, setHalfCm] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fullCm = halfCm ? (halfCm * 2).toFixed(1) : "";
  const inch = halfCm ? ((halfCm * 2) / 2.54).toFixed(1) : "";
  const size = inch ? getPantsSize(inch) : "";

  return (
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

        <h1>허리단면 변환기 👖</h1>
        <p>허리단면(cm)을 입력하면 총허리, 인치, 바지 사이즈를 알려드려요!</p>

        <input
          type="number"
          value={halfCm}
          onChange={(e) => setHalfCm(e.target.value)}
          placeholder="허리단면 (cm)"
        />

        {halfCm && (
          <div className="result">
            <p>
              📏 총허리: <strong>{fullCm} cm</strong>
            </p>
            <p>
              👉 인치: <strong>{inch} inch</strong>
            </p>
            <p>
              👖 추천 사이즈: <strong>{size}</strong>
            </p>
          </div>
        )}

        <hr />

        <h2>📘 바지 사이즈 참고표</h2>
        <SizeChart />
      </div>
    </div>
  );
}

function SizeChart() {
  const chartData = [
    { label: "XS", inch: "24~25", cm: "61~63.5" },
    { label: "S", inch: "26~27", cm: "66~68.5" },
    { label: "M", inch: "28~29", cm: "71~73.5" },
    { label: "L", inch: "30~31", cm: "76~78.5" },
    { label: "XL", inch: "32~33", cm: "81~83.5" },
    { label: "XXL", inch: "34~35+", cm: "86~89+" },
  ];

  return (
    <div className="size-chart">
      {chartData.map((item) => (
        <div key={item.label} className="size-card">
          <h3>{item.label}</h3>
          <p>📏 {item.inch} inch</p>
          <p>📐 {item.cm} cm</p>
        </div>
      ))}
    </div>
  );
}

export default App;
