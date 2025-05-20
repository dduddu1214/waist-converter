// ✅ src/App.jsx
import { useState } from "react";
import "./App.css";

function getPantsSize(inch) {
  if (inch < 26) return "XS (24~25)";
  if (inch < 28) return "S (26~27)";
  if (inch < 30) return "M (28~29)";
  if (inch < 32) return "L (30~31)";
  if (inch < 34) return "XL (32~33)";
  return "XXL (34 이상)";
}

function getFitComment(sizeLabel) {
  switch (sizeLabel) {
    case "XS":
      return "조금 타이트한 핏이에요";
    case "S":
      return "슬림한 핏이에요";
    case "M":
      return "표준 핏이에요";
    case "L":
      return "여유 있는 핏이에요";
    case "XL":
      return "넉넉한 핏이에요";
    case "XXL":
      return "매우 넉넉한 핏이에요";
    default:
      return "";
  }
}

function getFitWarning(inch) {
  const numInch = parseFloat(inch);
  if (numInch % 2 === 1) {
    return "⚠️ 두 사이즈 중간에 해당돼요. 체형에 따라 선택이 달라질 수 있어요.";
  } else if (numInch < 25 || numInch > 34) {
    return "ℹ️ 체형에 따라 꽉 끼거나 헐렁할 수 있어요. 꼭 실측 비교를 추천드려요!";
  }
  return "";
}

function App() {
  const [halfCm, setHalfCm] = useState("");
  const [fullCmInput, setFullCmInput] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleHalfCmChange = (e) => {
    const value = e.target.value;
    setHalfCm(value);
    setFullCmInput((value * 2).toFixed(1));
  };

  const handleFullCmChange = (e) => {
    const value = e.target.value;
    setFullCmInput(value);
    setHalfCm((value / 2).toFixed(1));
  };

  const fullCm = halfCm ? (halfCm * 2).toFixed(1) : "";
  const inch = halfCm ? ((halfCm * 2) / 2.54).toFixed(1) : "";
  const size = inch ? getPantsSize(inch) : "";
  const sizeLabel = size ? size.split(" ")[0] : "";

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

        <h1>FitFinder 👖</h1>
        <p>허리단면(cm) 또는 총허리(cm)를 입력하면 사이즈를 알려드려요!</p>
        <div class="input_area">
          <input
            type="number"
            value={halfCm}
            onChange={handleHalfCmChange}
            placeholder="허리단면 (cm)"
            style={{ marginBottom: "1rem" }}
          />
          <br />

          <input
            type="number"
            value={fullCmInput}
            onChange={handleFullCmChange}
            placeholder="총허리 (cm)"
          />
        </div>
        {halfCm && (
          <div className="result">
            <p>
              📏 총허리: <strong>{fullCm} cm</strong>
            </p>
            <p>
              👉 인치: <strong>{inch} inch</strong>
            </p>

            {size && (
              <div style={{ marginTop: "1rem" }}>
                <p>
                  👖 추천 사이즈: <strong>{size}</strong>
                  <br />
                  <span className="fit-comment">
                    {getFitComment(sizeLabel)}
                  </span>
                </p>
                {getFitWarning(inch) && (
                  <p className="fit-warning">{getFitWarning(inch)}</p>
                )}
              </div>
            )}
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
