import { useState } from "react";

function ShareButton({ size, inch, fullCm }) {
  const [copied, setCopied] = useState(false);

  const text = `내 바지 사이즈: ${size} (${inch}인치 / 총허리 ${fullCm}cm) - FitFinder`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "FitFinder 결과", text });
      } catch {
        // 사용자가 공유 취소
      }
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button className="share-btn" onClick={handleShare}>
      {copied ? "✅ 복사됨!" : "📤 결과 공유하기"}
    </button>
  );
}

export default ShareButton;
