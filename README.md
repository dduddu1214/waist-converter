# FitFinder 👖👕

허리단면, 가슴둘레, 어깨너비(cm)만 입력하면 인치 변환과 바지/상의 사이즈를 알려주는 사이즈 계산기입니다.

**[https://waist-converter.vercel.app](https://waist-converter.vercel.app)**

## 주요 기능

- **하의 사이즈 변환** - 허리단면/총허리(cm) 입력 → 인치 변환 → 바지 사이즈(XS~XXL) 추천
- **상의 사이즈 변환** - 가슴둘레/어깨너비(cm) 입력 → 상의 사이즈 추천
- **역변환** - 인치 또는 사이즈(XS~XXL) → cm 변환
- **핏 게이지** - 타이트↔루즈 시각적 바에서 내 위치 확인
- **내 치수 저장** - localStorage에 저장하여 재방문 시 자동 로드
- **결과 공유** - Web Share API / 클립보드 복사
- **다크모드** 지원
- **PWA** - 오프라인 사용 및 홈 화면에 앱 추가 가능

## 기술 스택

- React 19
- React Router
- Vite
- vite-plugin-pwa

## 시작하기

```bash
npm install
npm run dev
```

## 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run lint` | ESLint 실행 |

## 프로젝트 구조

```
src/
├── App.jsx                  # 라우터 + 다크모드 레이아웃
├── App.css                  # 전체 스타일
├── components/
│   ├── Navigation.jsx       # 탭 네비게이션
│   ├── FitGauge.jsx         # 시각적 핏 바
│   ├── ShareButton.jsx      # 공유 버튼
│   ├── SizeChart.jsx        # 사이즈 참고표
│   └── PageMeta.jsx         # 페이지별 SEO 메타태그
└── pages/
    ├── PantsSize.jsx        # 하의 사이즈 변환
    ├── UpperSize.jsx        # 상의 사이즈 변환
    └── ReverseConvert.jsx   # 역변환
```

## 배포

Vercel에 자동 배포됩니다. `main` 브랜치에 push하면 배포가 트리거됩니다.
