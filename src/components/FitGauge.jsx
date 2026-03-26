const SIZE_RANGES = [
  { label: "XS", min: 24, max: 25 },
  { label: "S", min: 26, max: 27 },
  { label: "M", min: 28, max: 29 },
  { label: "L", min: 30, max: 31 },
  { label: "XL", min: 32, max: 33 },
  { label: "XXL", min: 34, max: 36 },
];

function FitGauge({ inch }) {
  const numInch = parseFloat(inch);
  if (!numInch || numInch < 24 || numInch > 36) return null;

  // 24~36 범위를 0~100%로 매핑
  const percent = ((numInch - 24) / (36 - 24)) * 100;

  return (
    <div className="fit-gauge">
      <div className="gauge-labels">
        <span>타이트</span>
        <span>표준</span>
        <span>루즈</span>
      </div>
      <div className="gauge-track">
        {SIZE_RANGES.map((range) => (
          <div key={range.label} className="gauge-segment">
            <span className="gauge-segment-label">{range.label}</span>
          </div>
        ))}
        <div className="gauge-marker" style={{ left: `${percent}%` }}>
          <div className="gauge-marker-dot" />
          <span className="gauge-marker-label">{inch}"</span>
        </div>
      </div>
    </div>
  );
}

export default FitGauge;
