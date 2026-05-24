# XG 人格測驗 🎀

你最像哪位 XG 成員？7 個問題找出你的答案！

---

## 📁 檔案說明

```
xg-quiz/
├── index.html     ← 測驗主體（唯一需要的檔案）
├── og-cover.png   ← 分享到 LINE/FB 時顯示的預覽圖（自己準備，1200x630px）
└── README.md      ← 這份說明
```

---

## 🚀 GitHub Pages 部署步驟

### Step 1 — 建立 GitHub 帳號
前往 https://github.com 註冊（已有帳號跳過）

### Step 2 — 建立新的 Repository
1. 登入後點右上角 + → New repository
2. Repository name 填：xg-quiz
3. 選 Public（一定要 Public，Private 無法免費用 Pages）
4. 不要勾任何東西，直接按 Create repository

### Step 3 — 上傳檔案
點 uploading an existing file（或 Add file → Upload files）
把 index.html 和 og-cover.png 拖進去
下方填個說明（例如 first upload），按 Commit changes

### Step 4 — 開啟 GitHub Pages
1. 進你的 repo，點上方 Settings
2. 左側選單找 Pages
3. Source 選 Deploy from a branch
4. Branch 選 main，資料夾選 / (root)
5. 按 Save
等 1~2 分鐘，會出現：
Your site is live at https://你的帳號.github.io/xg-quiz/

### Step 5 — 更新 OG 圖片路徑
在 index.html 第 8 行，把網址改成你的：
<meta property="og:image" content="https://你的帳號.github.io/xg-quiz/og-cover.png" />

---

## 🖼️ OG 預覽圖怎麼做？
推薦用 Canva（免費）：
1. 新增設計 → 自訂尺寸 → 1200 x 630 px
2. 放上 XG 成員照片 + 測驗標題文字
3. 下載 PNG，命名為 og-cover.png，上傳到 GitHub repo

---

## 💡 想修改題目？
在 index.html 找 const QUESTIONS = [ 那段，
每個選項的 scores 決定哪位成員加分，改數字就好。
