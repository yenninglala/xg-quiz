
```
xg-quiz/
├── index.html          ← 只有 HTML 結構，零行 CSS/JS
│
├── css/
│   ├── base.css        ← CSS 變數、reset、body、cursor 樣式
│   ├── layout.css      ← 頁面結構、header、進度條、成員點點
│   ├── components.css  ← 題目卡片、選項按鈕、分享按鈕、toast
│   ├── animations.css  ← 所有 @keyframes 集中在這
│   └── result.css      ← 結果卡片、六角形 avatar、trait 標籤
│
└── js/
    ├── data.js         ← 純資料：成員 + 題目（無任何 DOM）
    ├── starfield.js    ← 星空動畫 canvas
    ├── cursor.js       ← 自訂游標 + 拖尾環
    ├── canvas-card.js  ← 生成 1080×1080 分享圖卡
    ├── quiz.js         ← 測驗邏輯：狀態機、渲染、confetti
    ├── share.js        ← LINE / 複製 / 下載
    └── main.js         ← 入口點，把所有按鈕事件綁在一起
```

---

https://yenninglala.github.io/xg-quiz/
