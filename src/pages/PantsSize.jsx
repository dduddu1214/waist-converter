import { useState, useEffect } from "react";
import FitGauge from "../components/FitGauge";
import ShareButton from "../components/ShareButton";
import SizeChart from "../components/SizeChart";
import PageMeta from "../components/PageMeta";

const PANTS_CHART = [
  { label: "XS", inch: "24~25", cm: "61~63.5" },
  { label: "S", inch: "26~27", cm: "66~68.5" },
  { label: "M", inch: "28~29", cm: "71~73.5" },
  { label: "L", inch: "30~31", cm: "76~78.5" },
  { label: "XL", inch: "32~33", cm: "81~83.5" },
  { label: "XXL", inch: "34~35+", cm: "86~89+" },
];

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
    case "XS": return "조금 타이트한 핏이에요";
    case "S": return "슬림한 핏이에요";
    case "M": return "표준 핏이에요";
    case "L": return "여유 있는 핏이에요";
    case "XL": return "넉넉한 핏이에요";
    case "XXL": return "매우 넉넉한 핏이에요";
    default: return "";
  }
}

function getFitWarning(roundedInch) {
  if (roundedInch % 2 === 1) {
    return "⚠️ 두 사이즈 중간에 해당돼요. 체형에 따라 선택이 달라질 수 있어요.";
  } else if (roundedInch < 25 || roundedInch > 34) {
    return "ℹ️ 체형에 따라 꽉 끼거나 헐렁할 수 있어요. 꼭 실측 비교를 추천드려요!";
  }
  return "";
}

function PantsSize() {
  const [halfCm, setHalfCm] = useState("");
  const [fullCmInput, setFullCmInput] = useState("");
  const [saved, setSaved] = useState(false);

  // 저장된 치수 불러오기
  useEffect(() => {
    const savedHalf = localStorage.getItem("ff_halfCm");
    if (savedHalf) {
      setHalfCm(savedHalf);
      setFullCmInput((savedHalf * 2).toFixed(1));
    }
  }, []);

  const handleHalfCmChange = (e) => {
    const value = e.target.value;
    setHalfCm(value);
    setFullCmInput(value ? (value * 2).toFixed(1) : "");
    setSaved(false);
  };

  const handleFullCmChange = (e) => {
    const value = e.target.value;
    setFullCmInput(value);
    setHalfCm(value ? (value / 2).toFixed(1) : "");
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem("ff_halfCm", halfCm);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClear = () => {
    localStorage.removeItem("ff_halfCm");
    setHalfCm("");
    setFullCmInput("");
    setSaved(false);
  };

  const fullCm = halfCm ? (halfCm * 2).toFixed(1) : "";
  const inch = halfCm ? ((halfCm * 2) / 2.54).toFixed(1) : "";
  const roundedInch = inch ? Math.round(parseFloat(inch)) : null;
  const size = roundedInch ? getPantsSize(roundedInch) : "";
  const sizeLabel = size ? size.split(" ")[0] : "";

  return (
    <>
      <PageMeta
        title="FitFinder - 바지 사이즈 변환기 | 허리단면 인치 변환"
        description="허리단면(cm)만 입력하면 총허리, 인치, 바지 사이즈를 알려주는 계산기. 내 치수 저장과 결과 공유도 가능!"
      />
      <h1>FitFinder 👖</h1>
      <p>허리단면(cm) 또는 총허리(cm)를 입력하면 사이즈를 알려드려요!</p>

      <div className="input_area">
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
        <>
          <div className="favorites-bar">
            <button className="save-btn" onClick={handleSave}>
              {saved ? "✅ 저장됨!" : "💾 내 치수 저장"}
            </button>
            {localStorage.getItem("ff_halfCm") && (
              <button className="clear-btn" onClick={handleClear}>
                🗑️ 삭제
              </button>
            )}
          </div>

          <div className="result">
            <p>📏 총허리: <strong>{fullCm} cm</strong></p>
            <p>👉 인치: <strong>{inch} inch</strong></p>

            {size && (
              <div style={{ marginTop: "1rem" }}>
                <p>
                  👖 추천 사이즈: <strong>{size}</strong>
                  <br />
                  <span className="fit-comment">{getFitComment(sizeLabel)}</span>
                </p>
                {getFitWarning(roundedInch) && (
                  <p className="fit-warning">{getFitWarning(roundedInch)}</p>
                )}

                <FitGauge inch={inch} />
                <ShareButton size={size} inch={inch} fullCm={fullCm} />
              </div>
            )}
          </div>
        </>
      )}

      <hr />
      <h2>📘 바지 사이즈 참고표</h2>
      <SizeChart data={PANTS_CHART} />
    </>
  );
}

export default PantsSize;
