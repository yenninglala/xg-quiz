/* ─────────────────────────────────────
   data.js — member profiles & questions
   (no DOM, no side-effects)
───────────────────────────────────── */

const MEMBERS = {
  JURIN:  {
    color: '#e0e0e0', emoji: '🤍',
    desc: '天生的領袖，充滿自信與魅力，帶給身邊的人滿滿能量！做事果斷，從不懷疑自己的選擇。',
    traits: ['自信', '領袖氣質', '直接'],
  },
  CHISA:  {
    color: '#FFE566', emoji: '💛',
    desc: '完美主義者，對自己要求極高，擁有讓人一眼難忘的強烈氣場和無懈可擊的專注力。',
    traits: ['完美主義', '強烈', '記憶點'],
  },
  HINATA: {
    color: '#5BE0FF', emoji: '🩵',
    desc: '你是團體裡的陽光，總是帶來歡笑和溫暖，朋友有困難第一個想到你。',
    traits: ['正能量', '溫暖', '親切'],
  },
  HARVEY: {
    color: '#CF9FFF', emoji: '💜',
    desc: '充滿鬥志，做事拼到底，天生就是要站在舞台正中央的人，爆發力驚人。',
    traits: ['熱情', '拼勁', '爆發力'],
  },
  JURIA:  {
    color: '#FF9A3C', emoji: '🧡',
    desc: '活力四射又溫柔，你有種讓人一靠近就放鬆的魔力，笑起來會讓整個房間亮起來。',
    traits: ['活力', '溫柔', '感染力'],
  },
  MAYA:   {
    color: '#FF5C5C', emoji: '❤️',
    desc: '有點神秘感，但一旦熟了會發現你超可愛。對藝術和美有獨特品味，情感豐富。',
    traits: ['神秘感', '藝術魂', '可愛'],
  },
  COCONA: {
    color: '#3EFFAA', emoji: '💚',
    desc: '冷靜又穩定，是大家的定心丸。觀察力超強，總在對的時機說出最有力的話。',
    traits: ['冷靜', '智慧', '觀察力'],
  },
};

const QUESTIONS = [
  {
    text: '週五晚上，你最想做什麼？',
    options: [
      { text: '約朋友出去 High！',   scores: { JURIN: 2, HINATA: 2 } },
      { text: '一個人聽音樂、放空',  scores: { MAYA: 2,  COCONA: 1 } },
      { text: '練習技能或做創作',    scores: { CHISA: 2, HARVEY: 1 } },
      { text: '看劇或打電動放鬆',    scores: { JURIA: 2, HINATA: 1 } },
    ],
  },
  {
    text: '朋友說你給人的第一印象是？',
    options: [
      { text: '超有自信、很有氣場',   scores: { JURIN: 2, CHISA: 2  } },
      { text: '親切又好相處',         scores: { HINATA: 2, JURIA: 1 } },
      { text: '有點神秘、難以捉摸',   scores: { MAYA: 2,  COCONA: 2 } },
      { text: '超有活力、活潑外向',   scores: { HARVEY: 2, JURIA: 1 } },
    ],
  },
  {
    text: '遇到困難的時候，你會怎麼做？',
    options: [
      { text: '馬上找人商量、一起解決', scores: { HINATA: 2, JURIN: 1 } },
      { text: '自己想清楚再行動',       scores: { COCONA: 2, MAYA: 1  } },
      { text: '直接硬幹，越困難越燃',   scores: { HARVEY: 2, CHISA: 1 } },
      { text: '擬定完美計畫再出發',     scores: { CHISA: 2,  JURIN: 1 } },
    ],
  },
  {
    text: '你的穿搭風格比較偏向？',
    options: [
      { text: '帥氣俐落，能展現氣場的', scores: { JURIN: 2,  CHISA: 1  } },
      { text: '可愛甜美，讓人心情好',   scores: { JURIA: 2,  HINATA: 1 } },
      { text: '個性前衛，不按牌理出牌', scores: { MAYA: 2,   HARVEY: 1 } },
      { text: '簡單大方，舒服就好',     scores: { COCONA: 2, HINATA: 1 } },
    ],
  },
  {
    text: '在一個團體中，你通常是哪種角色？',
    options: [
      { text: '掌控全場的 Leader',       scores: { JURIN: 2,  HARVEY: 1 } },
      { text: '觀察大家、在背後出謀劃策', scores: { COCONA: 2, MAYA: 1   } },
      { text: '炒熱氣氛的開心果',         scores: { JURIA: 2,  HINATA: 1 } },
      { text: '認真執行、讓成果完美呈現', scores: { CHISA: 2,  COCONA: 1 } },
    ],
  },
  {
    text: '你最重視的事情是？',
    options: [
      { text: '對自己誠實，做自己喜歡的事', scores: { MAYA: 2,   HARVEY: 1 } },
      { text: '和身邊的人保持好關係',       scores: { HINATA: 2, JURIA: 1  } },
      { text: '不斷進步、超越自己',         scores: { CHISA: 2,  HARVEY: 1 } },
      { text: '穩定踏實，把每件事做好',     scores: { COCONA: 2, JURIN: 1  } },
    ],
  },
  {
    text: '如果你要出一首歌，會是哪種風格？',
    options: [
      { text: '超有力道的 Hype 歌',     scores: { HARVEY: 2, JURIN: 1  } },
      { text: '充滿情感讓人起雞皮疙瘩', scores: { MAYA: 2,   JURIA: 1  } },
      { text: '俐落乾淨的 swag rap',    scores: { CHISA: 2,  COCONA: 1 } },
      { text: '活潑可愛讓人想跳舞',     scores: { HINATA: 2, JURIA: 1  } },
    ],
  },
];
