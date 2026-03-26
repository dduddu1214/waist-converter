function SizeChart({ data }) {
  return (
    <div className="size-chart">
      {data.map((item) => (
        <div key={item.label} className="size-card">
          <h3>{item.label}</h3>
          {item.inch && <p>📏 {item.inch} inch</p>}
          {item.cm && <p>📐 {item.cm} cm</p>}
          {item.detail && <p>{item.detail}</p>}
        </div>
      ))}
    </div>
  );
}

export default SizeChart;
