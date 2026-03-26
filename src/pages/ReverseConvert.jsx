import { useState } from "react";
import PageMeta from "../components/PageMeta";

const SIZE_DATA = [
  { label: "XS", inchMin: 24, inchMax: 25, cmMin: 61, cmMax: 63.5 },
  { label: "S", inchMin: 26, inchMax: 27, cmMin: 66, cmMax: 68.5 },
  { label: "M", inchMin: 28, inchMax: 29, cmMin: 71, cmMax: 73.5 },
  { label: "L", inchMin: 30, inchMax: 31, cmMin: 76, cmMax: 78.5 },
  { label: "XL", inchMin: 32, inchMax: 33, cmMin: 81, cmMax: 83.5 },
  { label: "XXL", inchMin: 34, inchMax: 35, cmMin: 86, cmMax: 89 },
];

function ReverseConvert() {
  const [mode, setMode] = useState("inch"); // "inch" | "size"
  const [inchInput, setInchInput] = useState("");
  const [sizeInput, setSizeInput] = useState("");

  const inchNum = inchInput ? parseFloat(inchInput) : null;
  const fullCmFromInch = inchNum ? (inchNum * 2.54).toFixed(1) : "";
  const halfCmFromInch = inchNum ? ((inchNum * 2.54) / 2).toFixed(1) : "";

  const sizeMatch = SIZE_DATA.find((s) => s.label === sizeInput);

  return (
    <>
      <PageMeta
        title="FitFinder - 역변환 | 인치·사이즈 → cm 변환"
        description="인치 또는 사이즈(XS~XXL)를 입력하면 총허리, 허리단면 cm로 변환해주는 계산기."
      />
      <h1>FitFinder 🔄</h1>
      <p>인치 또는 사이즈를 입력하면 cm로 변환해드려요!</p>

      <div className="mode-toggle">
        <button
          className={mode === "inch" ? "mode-btn active" : "mode-btn"}
          onClick={() => setMode("inch")}
        >
          인치 → cm
        </button>
        <button
          className={mode === "size" ? "mode-btn active" : "mode-btn"}
          onClick={() => setMode("size")}
        >
          사이즈 → cm
        </button>
      </div>

      {mode === "inch" ? (
        <div className="input_area">
          <input
            type="number"
            value={inchInput}
            onChange={(e) => setInchInput(e.target.value)}
            placeholder="인치 입력 (예: 30)"
          />
        </div>
      ) : (
        <div className="input_area">
          <div className="size-select-grid">
            {SIZE_DATA.map((s) => (
              <button
                key={s.label}
                className={sizeInput === s.label ? "size-select-btn active" : "size-select-btn"}
                onClick={() => setSizeInput(s.label)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {mode === "inch" && inchNum && (
        <div className="result">
          <p>📏 총허리: <strong>{fullCmFromInch} cm</strong></p>
          <p>📐 허리단면: <strong>{halfCmFromInch} cm</strong></p>
        </div>
      )}

      {mode === "size" && sizeMatch && (
        <div className="result">
          <p>📏 인치 범위: <strong>{sizeMatch.inchMin}~{sizeMatch.inchMax} inch</strong></p>
          <p>📐 총허리 범위: <strong>{sizeMatch.cmMin}~{sizeMatch.cmMax} cm</strong></p>
          <p>✂️ 허리단면 범위: <strong>{(sizeMatch.cmMin / 2).toFixed(1)}~{(sizeMatch.cmMax / 2).toFixed(1)} cm</strong></p>
        </div>
      )}
    </>
  );
}

export default ReverseConvert;
