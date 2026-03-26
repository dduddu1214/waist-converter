import { useState } from "react";
import SizeChart from "../components/SizeChart";
import PageMeta from "../components/PageMeta";

const CHEST_CHART = [
  { label: "XS", cm: "80~84", detail: "가슴둘레 기준" },
  { label: "S", cm: "85~89", detail: "가슴둘레 기준" },
  { label: "M", cm: "90~94", detail: "가슴둘레 기준" },
  { label: "L", cm: "95~99", detail: "가슴둘레 기준" },
  { label: "XL", cm: "100~104", detail: "가슴둘레 기준" },
  { label: "XXL", cm: "105~109+", detail: "가슴둘레 기준" },
];

const SHOULDER_CHART = [
  { label: "XS", cm: "39~41", detail: "어깨너비 기준" },
  { label: "S", cm: "42~43", detail: "어깨너비 기준" },
  { label: "M", cm: "44~45", detail: "어깨너비 기준" },
  { label: "L", cm: "46~47", detail: "어깨너비 기준" },
  { label: "XL", cm: "48~49", detail: "어깨너비 기준" },
  { label: "XXL", cm: "50~52+", detail: "어깨너비 기준" },
];

function getChestSize(cm) {
  if (cm < 85) return "XS (80~84)";
  if (cm < 90) return "S (85~89)";
  if (cm < 95) return "M (90~94)";
  if (cm < 100) return "L (95~99)";
  if (cm < 105) return "XL (100~104)";
  return "XXL (105 이상)";
}

function getShoulderSize(cm) {
  if (cm < 42) return "XS (39~41)";
  if (cm < 44) return "S (42~43)";
  if (cm < 46) return "M (44~45)";
  if (cm < 48) return "L (46~47)";
  if (cm < 50) return "XL (48~49)";
  return "XXL (50 이상)";
}

function UpperSize() {
  const [chest, setChest] = useState("");
  const [shoulder, setShoulder] = useState("");

  const chestNum = chest ? parseFloat(chest) : null;
  const shoulderNum = shoulder ? parseFloat(shoulder) : null;

  const chestSize = chestNum ? getChestSize(chestNum) : "";
  const shoulderSize = shoulderNum ? getShoulderSize(shoulderNum) : "";

  return (
    <>
      <PageMeta
        title="FitFinder - 상의 사이즈 변환기 | 가슴둘레, 어깨너비"
        description="가슴둘레, 어깨너비(cm)만 입력하면 상의 사이즈를 알려주는 계산기. 가슴/어깨 사이즈 불일치도 안내!"
      />
      <h1>FitFinder 👕</h1>
      <p>가슴둘레 또는 어깨너비(cm)를 입력하면 상의 사이즈를 알려드려요!</p>

      <div className="input_area">
        <input
          type="number"
          value={chest}
          onChange={(e) => setChest(e.target.value)}
          placeholder="가슴둘레 (cm)"
          style={{ marginBottom: "1rem" }}
        />
        <br />
        <input
          type="number"
          value={shoulder}
          onChange={(e) => setShoulder(e.target.value)}
          placeholder="어깨너비 (cm)"
        />
      </div>

      {(chestSize || shoulderSize) && (
        <div className="result">
          {chestSize && (
            <p>👕 가슴둘레 기준: <strong>{chestSize}</strong></p>
          )}
          {shoulderSize && (
            <p>📐 어깨너비 기준: <strong>{shoulderSize}</strong></p>
          )}
          {chestSize && shoulderSize && chestSize.split(" ")[0] !== shoulderSize.split(" ")[0] && (
            <p className="fit-warning">
              ⚠️ 가슴/어깨 사이즈가 달라요. 큰 쪽에 맞추면 편해요!
            </p>
          )}
        </div>
      )}

      <hr />
      <h2>📘 가슴둘레 사이즈표</h2>
      <SizeChart data={CHEST_CHART} />

      <h2>📘 어깨너비 사이즈표</h2>
      <SizeChart data={SHOULDER_CHART} />
    </>
  );
}

export default UpperSize;
