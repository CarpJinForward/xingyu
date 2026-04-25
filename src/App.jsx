import React, { useEffect, useMemo, useState } from "react";

const zodiacs = [
  ["白羊座", "♈", "3月21日 - 4月19日", "火象", "开创", "火星", "行动力", "赤金色", 9, "热情直接，行动力强，敢开始也敢冲刺。", "感情里喜欢明确回应，讨厌暧昧拖延。", "适合项目推进、销售、创业和需要冲劲的工作。", "金羊毛传说赋予白羊启程、冒险与勇气的象征。"],
  ["金牛座", "♉", "4月20日 - 5月20日", "土象", "固定", "金星", "稳定感", "松石绿", 6, "踏实慢热，重视安全感、生活品质和长期积累。", "感情里慢热长情，喜欢稳定陪伴和真实行动。", "适合金融、品牌、美学、管理和长期型项目。", "宙斯化身白牛的传说让金牛带有魅力、力量与占有的意味。"],
  ["双子座", "♊", "5月21日 - 6月21日", "风象", "变动", "水星", "思维流动", "柠檬黄", 5, "好奇灵活，信息感强，擅长表达与连接。", "感情里重视聊天质量和精神互动。", "适合传媒、教育、运营、咨询、销售和内容创作。", "双子兄弟的神话象征陪伴、双重性与沟通。"],
  ["巨蟹座", "♋", "6月22日 - 7月22日", "水象", "开创", "月亮", "情感归属", "月光银", 2, "敏感温柔，重视家庭、归属感和情绪安全。", "感情里需要信任、稳定和被认真回应。", "适合教育、服务、照护、心理、家居和品牌运营。", "忠诚螃蟹的神话让巨蟹象征守护与归处。"],
  ["狮子座", "♌", "7月23日 - 8月22日", "火象", "固定", "太阳", "光芒感", "太阳金", 1, "自信热烈，有表现力，渴望价值被看见。", "感情里重视偏爱、仪式感和被珍惜。", "适合品牌、公关、表演、创意和领导管理。", "尼米亚巨狮象征荣耀、强大与试炼。"],
  ["处女座", "♍", "8月23日 - 9月22日", "土象", "变动", "水星", "秩序感", "麦穗米", 4, "细致理性，擅长整理、分析和持续优化。", "感情里谨慎认真，重视细节和长期经营。", "适合数据、运营、编辑、产品、医疗和项目管理。", "持麦穗女神象征丰收、秩序、修复与校准。"],
  ["天秤座", "♎", "9月23日 - 10月23日", "风象", "开创", "金星", "平衡感", "玫瑰粉", 7, "优雅会协调，重视公平、审美和关系平衡。", "感情里希望彼此平等、温柔、互相理解。", "适合设计、品牌、法律、咨询、公关和商务合作。", "正义女神的天平象征公平、契约与关系秩序。"],
  ["天蝎座", "♏", "10月24日 - 11月22日", "水象", "固定", "冥王星 / 火星", "深度感", "暗红紫", 8, "洞察强、情感深、重忠诚，习惯深度投入。", "感情里追求坦诚、忠诚和灵魂连接。", "适合研究、金融、心理、策略、咨询和安全技术。", "毒蝎与猎户的神话象征隐藏力量与重生。"],
  ["射手座", "♐", "11月23日 - 12月21日", "火象", "变动", "木星", "远方感", "靛蓝紫", 3, "乐观自由，热爱探索、学习和更大的世界。", "感情里需要空间、信任和共同成长。", "适合教育、旅游、国际事务、媒体、创业和咨询。", "半人马弓箭象征远方、目标与意义追寻。"],
  ["摩羯座", "♑", "12月22日 - 1月19日", "土象", "开创", "土星", "长期主义", "岩灰色", 10, "自律稳重，目标清晰，能扛事也重视结果。", "感情里不一定热烈，但认真负责、看重未来。", "适合管理、金融、法律、工程、组织统筹和经营。", "羊首鱼尾的海山羊象征攀登、沉淀与时间。"],
  ["水瓶座", "♒", "1月20日 - 2月18日", "风象", "固定", "天王星 / 土星", "未来感", "电光蓝", 11, "独立前卫，思维独特，重视精神自由。", "感情里重视共鸣和边界，不喜欢被控制。", "适合科技、互联网、研究、产品、社群和创新项目。", "持水少年象征知识传播、未来意识和人道精神。"],
  ["双鱼座", "♓", "2月19日 - 3月20日", "水象", "变动", "海王星 / 木星", "感受力", "海雾蓝", 12, "温柔浪漫，共情力强，想象力和艺术感丰富。", "感情里需要温柔、理解、浪漫和心灵靠近。", "适合艺术、设计、音乐、影视、疗愈、心理和公益。", "两条鱼的神话象征灵魂牵引、逃离与融合。"],
];

const zodiacData = Object.fromEntries(
  zodiacs.map(([name, symbol, date, element, mode, ruler, keyword, color, lucky, personality, love, career, story]) => [
    name,
    {
      name,
      symbol,
      date,
      element,
      mode,
      ruler,
      keyword,
      color,
      lucky,
      traits: [keyword, element, mode, ruler],
      people: `适合重视${keyword}，并希望通过自我理解提升关系和生活质量的人群。`,
      personality,
      love,
      career,
      fortune: `近期围绕“${keyword}”展开，适合把注意力放在真正重要的人和事上。`,
      story,
      cosmic: `${name}属于${element}与${mode}星座，在黄道十二宫中承载着“${keyword}”的象征意义。`,
      meaning: `${name}提醒你：所谓命运不是固定答案，而是理解自己之后做出更清醒的选择。`,
    },
  ])
);

const zodiacNames = zodiacs.map((item) => item[0]);
const elementTips = { 火象: "热情、行动、冒险、主动推进", 土象: "稳定、现实、耐心、长期经营", 风象: "沟通、思维、自由、关系流动", 水象: "情绪、共情、亲密、安全感" };
const oppositeSigns = { 白羊座: "天秤座", 金牛座: "天蝎座", 双子座: "射手座", 巨蟹座: "摩羯座", 狮子座: "水瓶座", 处女座: "双鱼座", 天秤座: "白羊座", 天蝎座: "金牛座", 射手座: "双子座", 摩羯座: "巨蟹座", 水瓶座: "狮子座", 双鱼座: "处女座" };
const elementRules = {
  "火象|火象": [90, "火花爆棚型", "两个人都热烈直接，吸引强，行动快，适合一起冒险和创造新体验。", "双方都容易急，争执来得快。", "冲突时先降温，再谈结论。"],
  "火象|风象": [88, "灵感点燃型", "风象给火象灵感，火象给风象行动力，关系轻快、有趣、容易互相激发。", "容易兴奋开局，却缺少沉淀。", "把灵感变成具体计划，别只停留在聊天。"],
  "火象|土象": [64, "快慢磨合型", "火象带来突破，土象带来稳定，能互补也会拉扯。", "火象嫌土象慢，土象嫌火象冲。", "火象负责启动，土象负责落地，重大决定留缓冲期。"],
  "火象|水象": [58, "冷热碰撞型", "火象热烈，水象温柔，容易被彼此不一样的气质吸引。", "火象太直，水象太细腻，容易误会。", "火象多确认情绪，水象把需求说清楚。"],
  "土象|土象": [86, "稳定经营型", "两个人都重视现实、安全感和长期规划，适合细水长流。", "可能太实际，浪漫感不足。", "定期制造仪式感，别只谈安排和责任。"],
  "土象|水象": [84, "安稳滋养型", "土象给水象安全感，水象给土象情绪滋养，适合长期经营。", "土象容易讲道理，水象容易沉浸情绪。", "把感受和计划放在一起谈。"],
  "土象|风象": [60, "现实与想法型", "风象打开视野，土象负责落地，能形成想法与执行的互补。", "风象嫌土象现实，土象嫌风象不稳定。", "风象提出可能性，土象制定步骤。"],
  "风象|风象": [87, "灵魂聊天型", "两个人都重视交流、自由和精神共鸣，很容易聊得来。", "容易轻松但不够落地。", "把承诺写成行动，别只靠聊天维系。"],
  "风象|水象": [64, "理性与情绪型", "风象帮水象跳出情绪，水象让风象更懂温度。", "一个要空间，一个要靠近。", "风象回应情绪，水象给对方呼吸空间。"],
  "水象|水象": [89, "深度共情型", "两个人都细腻敏感，容易建立深度信任和灵魂共鸣。", "容易一起多想或逃避现实。", "感受之后回到现实解决方案。"],
};

const trigrams = [
  { name: "乾", nature: "天", element: "金", symbol: "☰", bits: [1, 1, 1] },
  { name: "兑", nature: "泽", element: "金", symbol: "☱", bits: [1, 1, 0] },
  { name: "离", nature: "火", element: "火", symbol: "☲", bits: [1, 0, 1] },
  { name: "震", nature: "雷", element: "木", symbol: "☳", bits: [1, 0, 0] },
  { name: "巽", nature: "风", element: "木", symbol: "☴", bits: [0, 1, 1] },
  { name: "坎", nature: "水", element: "水", symbol: "☵", bits: [0, 1, 0] },
  { name: "艮", nature: "山", element: "土", symbol: "☶", bits: [0, 0, 1] },
  { name: "坤", nature: "地", element: "土", symbol: "☷", bits: [0, 0, 0] },
];

const hexagramNames = [
  ["乾为天", "泽天夬", "火天大有", "雷天大壮", "风天小畜", "水天需", "山天大畜", "地天泰"],
  ["天泽履", "兑为泽", "火泽睽", "雷泽归妹", "风泽中孚", "水泽节", "山泽损", "地泽临"],
  ["天火同人", "泽火革", "离为火", "雷火丰", "风火家人", "水火既济", "山火贲", "地火明夷"],
  ["天雷无妄", "泽雷随", "火雷噬嗑", "震为雷", "风雷益", "水雷屯", "山雷颐", "地雷复"],
  ["天风姤", "泽风大过", "火风鼎", "雷风恒", "巽为风", "水风井", "山风蛊", "地风升"],
  ["天水讼", "泽水困", "火水未济", "雷水解", "风水涣", "坎为水", "山水蒙", "地水师"],
  ["天山遁", "泽山咸", "火山旅", "雷山小过", "风山渐", "水山蹇", "艮为山", "地山谦"],
  ["天地否", "泽地萃", "火地晋", "雷地豫", "风地观", "水地比", "山地剥", "坤为地"],
];

const decisionTypes = ["感情", "事业", "财运", "学业", "人际", "出行", "合作", "其他"];
const planetRows = [["水星", "mercury", "8%", "17%", 42, "12s", "0s"], ["金星", "venus", "16%", "70%", 58, "15s", "1s"], ["地球", "earth", "28%", "22%", 80, "14s", "0.6s"], ["火星", "mars", "44%", "80%", 54, "11s", "1.8s"], ["木星", "jupiter", "76%", "22%", 120, "18s", "0.2s"], ["土星", "saturn", "86%", "58%", 110, "17s", "1.2s"], ["天王星", "uranus", "60%", "13%", 70, "13s", "1.9s"], ["海王星", "neptune", "92%", "82%", 82, "16s", "0.8s"]];
const meteorRows = [["2%", "10%", "0s", "5.6s", "180px"], ["18%", "6%", "1.8s", "6.2s", "220px"], ["34%", "14%", "3.2s", "5.2s", "200px"], ["52%", "8%", "1.2s", "6.8s", "240px"], ["66%", "15%", "4.6s", "5.8s", "210px"], ["78%", "11%", "2.8s", "6.5s", "230px"], ["10%", "30%", "6.2s", "7s", "190px"], ["58%", "28%", "7.6s", "5.9s", "170px"]];

function pairKey(a, b) { const direct = `${a}|${b}`, reverse = `${b}|${a}`; if (elementRules[direct]) return direct; if (elementRules[reverse]) return reverse; return direct; }
function seedIndex(seed, length) { let n = 0; for (let i = 0; i < seed.length; i++) n = (n * 31 + seed.charCodeAt(i)) % 1000003; return n % length; }
function todayText() { const d = new Date(); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; }
function pad(n) { return String(n).padStart(2, "0"); }
function getSign(month, day) { const d = month * 100 + day; if (d >= 321 && d <= 419) return "白羊座"; if (d >= 420 && d <= 520) return "金牛座"; if (d >= 521 && d <= 621) return "双子座"; if (d >= 622 && d <= 722) return "巨蟹座"; if (d >= 723 && d <= 822) return "狮子座"; if (d >= 823 && d <= 922) return "处女座"; if (d >= 923 && d <= 1023) return "天秤座"; if (d >= 1024 && d <= 1122) return "天蝎座"; if (d >= 1123 && d <= 1221) return "射手座"; if (d >= 1222 || d <= 119) return "摩羯座"; if (d >= 120 && d <= 218) return "水瓶座"; return "双鱼座"; }
function getCurrentTimeString() { const now = new Date(); return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`; }
function getCurrentDateTimeString() { const now = new Date(); return `${now.getFullYear()}年${pad(now.getMonth() + 1)}月${pad(now.getDate())}日 ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`; }
function getCurrentDateSeed() { const now = new Date(); return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`; }
function parseSeconds(timeText) { const [h = 0, m = 0, s = 0] = timeText.split(":").map(Number); return Math.max(0, Math.min(86399, h * 3600 + m * 60 + s)); }
function trigramIndexFromBits(bits) { return trigrams.findIndex((t) => t.bits.join("") === bits.join("")); }
function compatibility(aName, bName) { const a = zodiacData[aName] || zodiacData["白羊座"]; const b = zodiacData[bName] || zodiacData["白羊座"]; const rule = elementRules[pairKey(a.element, b.element)] || [70, "需要观察型", "这组关系有吸引也有差异，关键在于双方是否愿意理解彼此的表达方式。", "容易因为节奏不同产生误会。", "先确认需求，再谈对错；先稳定情绪，再解决问题。"]; let score = rule[0]; let special = ""; if (aName === bName) { score += 4; special = "同星座组合会有很强的熟悉感，也容易把彼此的优点和缺点同时放大。"; } if (oppositeSigns[aName] === bName) { score += 2; special = "这是一组对宫关系，吸引力强、互补性明显，也会照见彼此最不习惯的部分。"; } if (a.mode === b.mode && aName !== bName) score += 2; if (a.element === b.element) score += 2; score = Math.max(48, Math.min(99, score)); return { score, title: rule[1], chemistry: rule[2], challenge: rule[3], advice: rule[4], special }; }
function daily(sign) { const item = zodiacData[sign], seed = todayText() + sign; const pick = (arr, k) => arr[seedIndex(seed + k, arr.length)]; return { sign, symbol: item.symbol, energy: 68 + seedIndex(seed + "energy", 27), color: item.color, number: ((item.lucky + seedIndex(seed, 9)) % 12) + 1, focus: pick(["适合主动推进计划", "适合整理关系与情绪", "适合学习、沟通和表达", "适合沉淀现实目标", "适合休息恢复与自我照顾", "适合展示作品与建立连接"], "focus"), love: pick(["感情里适合说真话，但语气要柔软一点。", "别把沉默自动理解成冷淡，先确认再判断。", "适合制造一点仪式感，让关系重新升温。", "今天适合给彼此空间，不必急着逼出答案。", "暧昧关系容易有新互动，但不要过度脑补。"], "love"), career: pick(["适合处理拖延已久的任务，越具体越有成果。", "适合开会、沟通、提出方案，但要保留数据支撑。", "今天适合低调推进，不必急着证明自己。", "容易获得灵感，适合做策划、内容、设计或复盘。", "注意细节和时间节点，别让小失误影响整体节奏。"], "career"), wealth: pick(["消费欲略强，适合先加入购物车，晚点再决定。", "适合检查预算、账单和订阅服务。", "偏财运普通，稳定收入和长期规划更重要。", "适合为学习、工具或健康做小额投入。", "不要被短期诱惑带节奏，今天更适合保守选择。"], "wealth"), health: pick(["注意睡眠和肩颈放松。", "适合轻运动和拉伸，不宜过度透支。", "情绪紧张时先离开屏幕，给自己十分钟空白。", "饮食上少冰冷刺激，保持稳定节奏。", "适合散步、冥想或整理房间来恢复能量。"], "health") }; }
function castDivination({ question, sign, type, time }) { const z = zodiacData[sign]; const seconds = parseSeconds(time); const baseSeed = `${seconds}|${question}|${sign}|${type}`; const values = Array.from({ length: 6 }).map((_, i) => { const n = seedIndex(baseSeed + "|yao|" + i, 100); if (n < 14) return 6; if (n < 50) return 7; if (n < 86) return 8; return 9; }); const bits = values.map((v) => (v === 7 || v === 9 ? 1 : 0)); const changing = values.map((v, i) => (v === 6 || v === 9 ? i + 1 : null)).filter(Boolean); const changedBits = bits.map((bit, i) => (values[i] === 6 || values[i] === 9 ? 1 - bit : bit)); const lowerIndex = trigramIndexFromBits(bits.slice(0, 3)); const upperIndex = trigramIndexFromBits(bits.slice(3, 6)); const changedLower = trigramIndexFromBits(changedBits.slice(0, 3)); const changedUpper = trigramIndexFromBits(changedBits.slice(3, 6)); const lower = trigrams[lowerIndex] || trigrams[0], upper = trigrams[upperIndex] || trigrams[0]; const changedLowerTri = trigrams[changedLower] || lower, changedUpperTri = trigrams[changedUpper] || upper; const hexName = hexagramNames[upperIndex]?.[lowerIndex] || `${upper.name}${lower.name}卦`; const changedName = changing.length ? (hexagramNames[changedUpper]?.[changedLower] || `${changedUpperTri.name}${changedLowerTri.name}卦`) : "无变卦"; const hourBand = Math.floor(seconds / 7200); const timeTone = ["子夜潜机", "黎明萌动", "上午生发", "午间炽盛", "傍晚收束", "夜间沉潜"][Math.min(5, hourBand)]; const baseScore = 48 + seedIndex(baseSeed + "score", 36); const changePenalty = changing.length >= 4 ? -8 : changing.length === 0 ? 5 : changing.length <= 2 ? 4 : -2; const starBonus = z.element === "火象" && upper.element === "火" ? 5 : z.element === "水象" && upper.element === "水" ? 5 : z.element === "土象" && lower.element === "土" ? 5 : z.element === "风象" && (upper.name === "巽" || lower.name === "巽") ? 5 : 0; const score = Math.max(18, Math.min(96, baseScore + changePenalty + starBonus)); const tendency = score >= 78 ? "大吉偏向" : score >= 64 ? "小吉可行" : score >= 48 ? "中性观望" : score >= 34 ? "谨慎偏凶" : "暂缓为宜"; const should = score >= 64 ? "可以做，但要把节奏控制住。" : score >= 48 ? "可以先试探，不建议立刻押上全部筹码。" : "暂时不建议直接做，先收集信息或等待更合适的时机。"; const action = type === "感情" ? "先看回应，再决定投入深度。" : type === "事业" ? "先做小规模验证，再扩大行动。" : type === "财运" ? "先保守评估成本，不要冲动加码。" : type === "学业" ? "先定计划，再用连续三天执行验证状态。" : type === "出行" ? "先检查时间、天气、预算和备选路线。" : "先把问题拆小，用一步行动验证局势。"; return { time, seconds, values, bits, changing, lower, upper, changedLowerTri, changedUpperTri, hexName, changedName, timeTone, score, tendency, should, action, question: question || "未填写具体问题", sign, type }; }

async function classifyQuestionByAI({ question, zodiac, questionType }) {
  const response = await fetch("/api/classify-question", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, zodiac, questionType }),
  });

  const data = await response.json();
  if (!response.ok || !data.ok) {
    throw new Error(data.error || data.detail || "AI识别失败");
  }
  return data.data;
}

async function castDivinationByAPI({ question, sign, type, time }) {
  const response = await fetch("/api/oracle/cast", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, sign, type, time }),
  });

  const data = await response.json();
  if (!response.ok || !data.ok) {
    throw new Error(data.error || data.detail || "后端起卦失败");
  }
  return data.data;
}

async function getAIOracleReading(payload) {
  const response = await fetch("/api/oracle-reading", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok || !data.ok) {
    throw new Error(data.error || data.detail || "AI解读失败");
  }
  return data.data;
}

function CosmicBackground() {
  const stars = Array.from({ length: 260 }).map((_, i) => {
    const colors = ["white", "gold", "blue", "violet", "pink"];
    const sizes = ["tiny", "small", "small", "medium", "medium", "large"];
    return {
      id: i,
      left: `${(i * 37 + i * i * 3) % 100}%`,
      top: `${(i * 53 + i * 7) % 100}%`,
      c: colors[i % colors.length],
      s: sizes[i % sizes.length],
      d: `${(i % 23) * 0.22}s`,
      du: `${3.2 + (i % 9) * 0.42}s`,
    };
  });

  return (
    <div className="cosmic-scene">
      <div className="deep-space-photo" />
      <div className="galaxy-stream stream-a" />
      <div className="galaxy-stream stream-b" />
      <div className="galaxy-stream stream-c" />
      <div className="nebula nebula-a" />
      <div className="nebula nebula-b" />
      <div className="nebula nebula-c" />
      <div className="nebula nebula-d" />
      <div className="milky milky-a" />
      <div className="milky milky-b" />
      <div className="milky milky-c" />
      <div className="orbit orbit-a" />
      <div className="orbit orbit-b" />
      <div className="orbit orbit-c" />
      {stars.map((s) => (
        <span key={s.id} className={`star star-${s.s} star-${s.c}`} style={{ left: s.left, top: s.top, animationDelay: s.d, animationDuration: s.du }} />
      ))}
      {meteorRows.map(([l, t, d, du, w], i) => (
        <div key={i} className="meteor" style={{ left: l, top: t, animationDelay: d, animationDuration: du, width: w }}>
          <span className="meteor-head" />
          <span className="meteor-tail" />
          <span className="meteor-glow" />
        </div>
      ))}
      {planetRows.map(([name, cls, left, top, size, duration, delay]) => (
        <div key={name} className={`planet ${cls}`} style={{ left, top, width: size, height: size, animationDuration: duration, animationDelay: delay }}>
          <div className="planet-orbit-glow" />
          <div className="planet-core" />
          <span className="planet-label">{name}</span>
        </div>
      ))}
    </div>
  );
}
function SectionTitle({ tag, title, children }) { return <div className="section-title left-title"><span>{tag}</span><h2>{title}</h2><p>{children}</p></div>; }
function ZodiacDetail({ selected }) { const z = zodiacData[selected]; return <article className="zodiac-detail-card"><div className="detail-head"><div className="detail-symbol">{z.symbol}</div><div><p>Constellation Archive</p><h3>{selected}</h3><span>{z.date} · {z.element} · {z.mode} · 守护星：{z.ruler}</span></div></div><div className="trait-list">{z.traits.map((t) => <span key={t}>{t}</span>)}</div><div className="detail-grid"><section><h4>性格画像</h4><p>{z.personality}</p></section><section><h4>适合人群</h4><p>{z.people}</p></section><section><h4>感情倾向</h4><p>{z.love}</p></section><section><h4>事业风格</h4><p>{z.career}</p></section><section><h4>近期运势</h4><p>{z.fortune}</p></section><section><h4>神话故事</h4><p>{z.story}</p></section><section><h4>宇宙定位</h4><p>{z.cosmic}</p></section><section><h4>深层含义</h4><p>{z.meaning}</p></section></div></article>; }
function CompatibilitySection({ defaultA }) { const [first, setFirst] = useState(defaultA || "天蝎座"), [second, setSecond] = useState("双鱼座"); const a = zodiacData[first], b = zodiacData[second], r = compatibility(first, second); return <section id="compatibility" className="glass-section"><SectionTitle tag="Love Match" title="星座配对分析">任意两个星座都可以选择并生成结果，包含匹配指数、吸引点、磨合点、沟通方式、长期经营建议和约会灵感。</SectionTitle><div className="compatibility-layout"><div className="match-card"><div className="select-row"><label><span>你的星座</span><select value={first} onChange={(e) => setFirst(e.target.value)}>{zodiacNames.map((n) => <option key={n} value={n}>{zodiacData[n].symbol} {n}</option>)}</select></label><div className="heart">♡</div><label><span>对方星座</span><select value={second} onChange={(e) => setSecond(e.target.value)}>{zodiacNames.map((n) => <option key={n} value={n}>{zodiacData[n].symbol} {n}</option>)}</select></label></div><div className="match-hero"><div className="match-sign"><strong>{a.symbol}</strong><span>{first}</span><small>{a.element} · {a.mode} · {a.keyword}</small></div><div className="score-ring"><strong>{r.score}</strong><span>匹配指数</span></div><div className="match-sign"><strong>{b.symbol}</strong><span>{second}</span><small>{b.element} · {b.mode} · {b.keyword}</small></div></div><div className="score-bar"><i style={{ width: `${r.score}%` }} /></div><div className="match-result"><h3>{r.title}</h3><p>{r.chemistry}</p>{r.special && <p className="special-note">{r.special}</p>}<div className="advice-box"><strong>相处建议</strong><span>{r.advice}</span></div></div></div><div className="match-detail-panel"><article><h4>元素关系</h4><p>{first}偏向“{elementTips[a.element]}”，{second}偏向“{elementTips[b.element]}”。</p></article><article><h4>吸引点</h4><p>{first}的“{a.keyword}”会被{second}的“{b.keyword}”触动，差异本身就是吸引力来源。</p></article><article><h4>磨合点</h4><p>{r.challenge}</p></article><article><h4>沟通方式</h4><p>{a.element === "风象" || b.element === "风象" ? "这组关系要把想法讲清楚，少靠猜测推进。" : "这组关系要同时说感受和现实安排，别只用沉默表达不满。"}</p></article><article><h4>长期经营</h4><p>每隔一段时间做一次关系复盘：最近最累的地方、最需要的支持、下一步一起完成的事。</p></article><article><h4>约会灵感</h4><p>{a.element === "火象" || b.element === "火象" ? "旅行、运动、演出、短途冒险。" : a.element === "土象" || b.element === "土象" ? "美食、展览、手作、城市散步。" : a.element === "风象" || b.element === "风象" ? "咖啡聊天、书店、桌游、脱口秀。" : "夜景、电影、音乐、海边或安静谈心。"}</p></article><article className="wide-card"><h4>关系关键词</h4><div className="keyword-cloud"><span>{a.keyword}</span><span>{b.keyword}</span><span>{a.element}</span><span>{b.element}</span><span>{a.mode}</span><span>{b.mode}</span><span>{r.title}</span></div></article></div></div></section>; }
function DailySection({ defaultSign }) { const [sign, setSign] = useState(defaultSign || "天蝎座"); const d = daily(sign); return <section id="daily" className="glass-section"><SectionTitle tag="Daily Horoscope" title="每日运势">选择星座查看今日主题、感情、事业、财运、健康、幸运色和幸运数字。内容会根据日期自动变化。</SectionTitle><div className="daily-layout"><div className="daily-main-card"><div className="daily-top"><label><span>选择星座</span><select value={sign} onChange={(e) => setSign(e.target.value)}>{zodiacNames.map((n) => <option key={n} value={n}>{zodiacData[n].symbol} {n}</option>)}</select></label><div className="daily-symbol"><strong>{d.symbol}</strong><span>{d.sign}</span></div></div><div className="daily-score"><div><small>今日能量</small><strong>{d.energy}%</strong></div><div><small>幸运色</small><strong>{d.color}</strong></div><div><small>幸运数字</small><strong>{d.number}</strong></div></div><div className="daily-focus"><h3>今日主题：{d.focus}</h3><p>今天不需要把所有问题一次解决，先抓住最重要的一件事，顺着自己的节奏推进。</p></div></div><div className="daily-grid"><article><h4>感情</h4><p>{d.love}</p></article><article><h4>事业 / 学业</h4><p>{d.career}</p></article><article><h4>财运</h4><p>{d.wealth}</p></article><article><h4>健康</h4><p>{d.health}</p></article></div></div></section>; }
function DivinationSection({ defaultSign }) {
  const [question, setQuestion] = useState("我要不要现在行动？");
  const [sign, setSign] = useState(defaultSign || "天蝎座");
  const [type, setType] = useState("事业");
  const [time, setTime] = useState(getCurrentTimeString());
  const [liveNow, setLiveNow] = useState(getCurrentDateTimeString());
  const [autoTime, setAutoTime] = useState(true);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [aiReadError, setAiReadError] = useState("");
  const [aiClass, setAiClass] = useState(null);
  const [aiReading, setAiReading] = useState(null);
  const [aiReadingLoading, setAiReadingLoading] = useState(false);
  const [showOracleDeep, setShowOracleDeep] = useState(false);
  const [result, setResult] = useState(() =>
    castDivination({
      question: `我要不要现在行动？|日期:${getCurrentDateSeed()}`,
      sign: defaultSign || "天蝎座",
      type: "事业",
      time: getCurrentTimeString(),
    })
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      const currentTime = getCurrentTimeString();
      setLiveNow(getCurrentDateTimeString());
      if (autoTime) setTime(currentTime);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [autoTime]);

  const lineText = (value) => {
    if (value === 6) return "老阴 ×";
    if (value === 9) return "老阳 ○";
    if (value === 7) return "少阳";
    return "少阴";
  };

  const buildOraclePayload = (nextResult, classification) => ({
    scene: "general",
    question,
    zodiac: sign,
    classification,
    oracle: {
      hexagram: nextResult.hexName,
      changedHexagram: nextResult.changedName,
      movingLines: nextResult.changing,
      score: nextResult.score,
      tendency: nextResult.tendency,
      time: nextResult.time,
      timeTone: nextResult.timeTone,
      action: nextResult.action,
      should: nextResult.should,
    },
  });

  const runCast = async (useNow) => {
    const castTime = useNow ? getCurrentTimeString() : time;
    const seedQuestion = `${question}|日期:${getCurrentDateSeed()}|同步时间:${getCurrentDateTimeString()}`;
    setTime(castTime);
    setLoading(true);
    setAiReadError("");
    setShowOracleDeep(false);

    try {
      const nextResult = await castDivinationByAPI({ question: seedQuestion, sign, type, time: castTime });
      setResult(nextResult);
    } catch (error) {
      setAiError(error.message || "后端起卦失败，请确认 npm run server 正在运行。");
    } finally {
      setLoading(false);
    }
  };

  const runAIClassify = async () => {
    setAiError("");
    setAiReadError("");
    setAiLoading(true);
    setLoading(true);
    setAiReadingLoading(true);
    setShowOracleDeep(false);

    try {
      const data = await classifyQuestionByAI({ question, zodiac: sign, questionType: type });
      setAiClass(data);

      const aiType = data.mainCategory && decisionTypes.includes(data.mainCategory) ? data.mainCategory : type;
      const castTime = getCurrentTimeString();
      const aiSeedQuestion = `${question}|日期:${getCurrentDateSeed()}|同步时间:${getCurrentDateTimeString()}|AI分类:${data.mainCategory || "未知"}|${data.subCategory || "未细分"}|${data.intent || "未识别"}|风险:${data.riskLevel || "未知"}`;
      const nextResult = await castDivinationByAPI({ question: aiSeedQuestion, sign, type: aiType, time: castTime });

      setType(aiType);
      setTime(castTime);
      setResult(nextResult);
      setLoading(false);

      const reading = await getAIOracleReading(buildOraclePayload(nextResult, data));
      setAiReading(reading);
    } catch (error) {
      setLoading(false);
      setAiError(error.message || "AI识别失败，请确认后端 npm run server 正在运行。");
    } finally {
      setAiLoading(false);
      setAiReadingLoading(false);
    }
  };

  return (
    <section id="divination" className="glass-section">
      <SectionTitle tag="Oracle Decision" title="星卦问事 · 秒级问卦">
        结合用户问题、星座、当前年月日时分秒与 AI 问题归类，生成本卦、变卦、动爻和更贴合问题的解读。
      </SectionTitle>

      <div className="oracle-layout">
        <div className="oracle-card">
          <label>
            <span>你正在纠结什么？</span>
            <textarea value={question} onChange={(e) => setQuestion(e.target.value)} />
          </label>

          <div className="time-sync-card">
            <div>
              <strong>{liveNow}</strong>
              <small>起卦会纳入今日日期与当前时分秒</small>
            </div>
            <button className={autoTime ? "sync-switch active" : "sync-switch"} type="button" onClick={() => setAutoTime(!autoTime)}>
              {autoTime ? "同步" : "手动"}
            </button>
          </div>

          <div className="oracle-controls">
            <label>
              <span>你的星座</span>
              <select value={sign} onChange={(e) => setSign(e.target.value)}>
                {zodiacNames.map((n) => (
                  <option key={n} value={n}>{zodiacData[n].symbol} {n}</option>
                ))}
              </select>
            </label>
            <label>
              <span>问事类型</span>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                {decisionTypes.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </label>
            <label className="pretty-time-label">
              <span>问事时间</span>
              <div className="pretty-time-box compact-time-box">
                <div className="pretty-time-icon">✦</div>
                <input
                  type="time"
                  step="1"
                  value={time}
                  onChange={(e) => {
                    setAutoTime(false);
                    setTime(e.target.value);
                  }}
                />
                <div className="pretty-time-glow" />
              </div>
            </label>
          </div>

          <div className="oracle-actions">
            <button className="ai-btn" onClick={runAIClassify} disabled={aiLoading || loading}>
              {aiLoading || aiReadingLoading ? "AI推演中..." : "AI识别并起卦"}
            </button>
            <button className="primary-btn" onClick={() => runCast(true)} disabled={loading || aiLoading}>
              {loading ? "星盘推演中..." : "取此刻时间起卦"}
            </button>
            <button className="ghost-btn" onClick={() => runCast(false)} disabled={loading || aiLoading}>按选定时间重算</button>
          </div>

          {aiError && <div className="ai-error">{aiError}</div>}
          {aiReadError && <div className="ai-error">{aiReadError}</div>}

          {aiClass && (
            <div className="ai-class-card">
              <div className="ai-class-head">
                <span>AI 问题归类</span>
                <strong>{aiClass.mainCategory || "未知"} · {aiClass.subCategory || "未细分"}</strong>
              </div>
              <div className="ai-class-grid">
                <p><b>问题意图</b><em>{aiClass.intent || "未识别"}</em></p>
                <p><b>情绪状态</b><em>{aiClass.emotion || "未识别"}</em></p>
                <p><b>风险等级</b><em>{aiClass.riskLevel || "未知"}</em></p>
              </div>
              {Array.isArray(aiClass.keywords) && aiClass.keywords.length > 0 && (
                <div className="ai-keywords">
                  {aiClass.keywords.map((word) => <i key={word}>{word}</i>)}
                </div>
              )}
              <p className="ai-understanding">{aiClass.shortUnderstanding || "AI已完成问题理解，可以继续起卦。"}</p>
            </div>
          )}

          {aiReading && (
            <div className="oracle-split-reading-card left-oracle-reading-card">
              <div className="left-reading-head">
                <span>AI 卦象解读</span>
                <strong>{aiReading.title || result.tendency}</strong>
              </div>
              <p><b>核心判断：</b>{aiReading.summary || result.should}</p>
              <p><b>围绕问题：</b>{aiReading.situation || result.action}</p>
              {Array.isArray(aiReading.suitable) && aiReading.suitable.length > 0 && (
                <div className="mini-advice-list">
                  <h4>适合做</h4>
                  {aiReading.suitable.slice(0, 3).map((item, index) => <span key={index}>{item}</span>)}
                </div>
              )}
            </div>
          )}

          <p className="oracle-note">点击“AI识别并起卦”后，AI会先判断问题类型，再把分类结果、今日日期和实时秒数纳入起卦种子，右侧卦象会同步刷新。</p>
        </div>

        <div className="oracle-result">
          {loading && (
            <div className="casting-mask">
              <div className="casting-ring"><i /><span>星辰校准中</span><small>正在推演时辰、卦象与动爻</small></div>
            </div>
          )}

          <div className="oracle-head">
            <div>
              <small>问事时间</small>
              <strong>{result.time}</strong>
              <span>第 {result.seconds} 秒 · {result.timeTone}</span>
            </div>
            <div className="score-ring"><strong>{result.score}</strong><span>{result.tendency}</span></div>
          </div>

          <div className="gua-row">
            <article>
              <small>本卦</small>
              <h3>{result.upper.symbol}{result.lower.symbol} {result.hexName}</h3>
              <p>上卦：{result.upper.name}为{result.upper.nature} · 下卦：{result.lower.name}为{result.lower.nature}</p>
            </article>
            <article>
              <small>变卦</small>
              <h3>{result.changedName === "无变卦" ? "—" : `${result.changedUpperTri.symbol}${result.changedLowerTri.symbol} ${result.changedName}`}</h3>
              <p>{result.changing.length ? `动爻：第 ${result.changing.join("、")} 爻` : "无动爻：局势相对稳定，重在守正。"}</p>
            </article>
          </div>

          <div className="yao-list">
            {result.values.map((v, i) => (
              <div key={i} className="yao-item">
                <span>第 {i + 1} 爻</span>
                <i className={v === 7 || v === 9 ? "yang" : "yin"}>{v === 7 || v === 9 ? "━━━━" : "━━  ━━"}</i>
                <em>{lineText(v)}</em>
              </div>
            ))}
          </div>

          <div className="oracle-reading right-oracle-reading-card">
            <h3>{aiReading ? "应对策略" : result.tendency}</h3>
            {aiReading ? (
              <>
                <p><strong>风险提醒：</strong>{aiReading.risk || "先等信息更清楚，不要被一时情绪推着走。"}</p>
                <p><strong>行动建议：</strong>{aiReading.advice || result.action}</p>
                <p><strong>时机提示：</strong>{aiReading.timing || "等待信息变清楚后再行动。"}</p>
                {Array.isArray(aiReading.unsuitable) && aiReading.unsuitable.length > 0 && (
                  <div className="mini-advice-list right-mini-list">
                    <h4>不宜做</h4>
                    {aiReading.unsuitable.slice(0, 3).map((item, index) => <span key={index}>{item}</span>)}
                  </div>
                )}
              </>
            ) : (
              <>
                <p><strong>是否行动：</strong>{result.should}</p>
                <p><strong>具体建议：</strong>{result.action}</p>
                <p><strong>风险提醒：</strong>{result.changing.length >= 4 ? "动爻较多，说明局势变动大，不适合冲动定终身。" : result.score >= 64 ? "虽然倾向可行，但仍需要设置止损点。" : "先等信息更清楚，不要被一时情绪推着走。"}</p>
              </>
            )}
          </div>

          {aiReadingLoading && <div className="ai-reading-loading">AI正在生成深度解读...</div>}

          {aiReading && (
            <button className="deep-toggle" type="button" onClick={() => setShowOracleDeep(!showOracleDeep)}>
              {showOracleDeep ? "收起深度解读" : "展开深度解读"}
            </button>
          )}
        </div>
      </div>

      {showOracleDeep && aiReading && (
        <div className="deep-reading oracle-deep-panel oracle-deep-full">
          <h3>深度解读</h3>
          <div className="deep-grid deep-grid-wide">
            <article><h4>适合做</h4><p>{Array.isArray(aiReading.suitable) ? aiReading.suitable.join("；") : "先选择低风险动作。"}</p></article>
            <article><h4>不宜做</h4><p>{Array.isArray(aiReading.unsuitable) ? aiReading.unsuitable.join("；") : "不宜冲动押注。"}</p></article>
            <article><h4>转机提示</h4><p>{aiReading.timing || "等待信息变清楚后再行动。"}</p></article>
            <article><h4>最后提醒</h4><p>{aiReading.finalWords || "把卦象当作整理内心的镜子，不把它当成唯一答案。"}</p></article>
          </div>
          {aiReading.healingStory && (
            <div className="healing-story">
              <span>故事疗愈</span>
              <h4>{aiReading.healingStory.title}</h4>
              <p>{aiReading.healingStory.content}</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function LoveDivinationSection({ defaultSign }) {
  const [first, setFirst] = useState(defaultSign || "天蝎座");
  const [second, setSecond] = useState("双鱼座");
  const [question, setQuestion] = useState("我们现在适合继续推进这段关系吗？");
  const [time, setTime] = useState(getCurrentTimeString());
  const [loading, setLoading] = useState(false);
  const [showDeep, setShowDeep] = useState(false);
  const [loveAIReading, setLoveAIReading] = useState(null);
  const [loveAIClass, setLoveAIClass] = useState(null);
  const [loveAIError, setLoveAIError] = useState("");
  const [result, setResult] = useState(() =>
    castDivination({
      question: `我们现在适合继续推进这段关系吗？|日期:${getCurrentDateSeed()}`,
      sign: defaultSign || "天蝎座",
      type: "感情",
      time: getCurrentTimeString(),
    })
  );

  const match = compatibility(first, second);
  const a = zodiacData[first];
  const b = zodiacData[second];

  const fallbackLoveAdvice = useMemo(() => {
    if (!result) return "";
    if (result.score >= 78) return "卦象偏顺，适合自然推进关系，但不要急着索要最终承诺。可以通过一次轻松见面、一次认真沟通或一个小约定来确认彼此状态。";
    if (result.score >= 64) return "卦象小吉，说明有推进空间，但需要控制节奏。建议先释放善意，再观察对方是否有同等回应。";
    if (result.score >= 48) return "卦象中平，适合试探与观察，不适合立刻摊牌。先把问题问小一点，比如对方是否愿意继续交流，而不是直接判断成败。";
    return "卦象偏谨慎，暂时不建议强行推进。先处理误会、情绪和现实阻力，给关系一点缓冲时间。";
  }, [result]);

  const fallbackLoveStory = useMemo(() => {
    if (!result) return { title: "星河回信", text: "" };
    if (result.score >= 78) return {
      title: "良缘渐明",
      text: "像两个人在夜路上同时看见一盏灯，重要的不是立刻奔向终点，而是确认彼此愿不愿意朝同一个方向多走几步。好的关系通常不是突然完成的，而是在一次次稳定回应里慢慢变亮。",
    };
    if (result.score >= 64) return {
      title: "春水初生",
      text: "有些感情像春天刚解冻的河面，看似平静，底下已经开始流动。此时最忌用力过猛，适合用温和的方式试探：一句自然的问候、一次轻松的邀请，都比沉重的追问更容易打开局面。",
    };
    if (result.score >= 48) return {
      title: "隔雾看花",
      text: "雾里看花并不代表没有花，只是现在还看不清。关系中的暧昧、沉默和误会，常常让人把自己的担心投射成答案。先别急着判定好坏，给自己一点观察期，也给对方一点表达空间。",
    };
    return {
      title: "月落潮缓",
      text: "有时候退一步不是失去，而是让情绪的潮水慢慢落下。真正属于你的关系，不会只靠一次冲动来维系。此刻适合照顾好自己，把主动权收回来，等心安定后再看对方是否仍值得靠近。",
    };
  }, [result]);

  const deepReading = useMemo(() => {
    if (!result) return [];
    const moving = result.changing.length
      ? `第 ${result.changing.join("、")} 爻为动爻，说明这段关系并非静止状态，仍有转圜、变化或重新定位的空间。`
      : "本卦无动爻，说明当前关系状态相对稳定，短时间内不宜用强烈动作打破平衡。";
    const rhythm = result.score >= 64
      ? "关系节奏偏向可推进，但推进方式要轻，不要让对方感觉被逼迫。"
      : "关系节奏偏向观望，适合先稳定自己的情绪，再看对方是否愿意靠近。";
    const communication = match.score >= 80
      ? "双方基础吸引力较强，沟通时可以更真诚一点，但仍要避免把热度当成承诺。"
      : match.score >= 65
        ? "双方有互补空间，但需要把期待讲清楚，尤其不要用冷处理测试对方。"
        : "双方节奏差异明显，沟通时要减少试探和猜测，尽量用具体表达代替情绪拉扯。";
    return [
      moving,
      rhythm,
      communication,
      `从星座角度看，${first}的“${a.keyword}”与${second}的“${b.keyword}”会形成这段关系的核心张力：它可能是吸引点，也可能是磨合点。`,
      "建议把接下来的行动缩小成一个低风险步骤：发一条自然信息、提出一个轻松邀约，或者暂缓一天再观察回应。",
    ];
  }, [result, match.score, first, second, a.keyword, b.keyword]);

  const runLoveCast = async (useNow) => {
    const castTime = useNow ? getCurrentTimeString() : time;
    setTime(castTime);
    setLoading(true);
    setLoveAIError("");
    setLoveAIReading(null);
    setLoveAIClass(null);
    setShowDeep(false);

    try {
      const aiClass = await classifyQuestionByAI({
        question,
        zodiac: first,
        questionType: "感情",
      });
      setLoveAIClass(aiClass);

      const seedQuestion = `${question}|情感AI分类:${aiClass.mainCategory || "感情"}|${aiClass.subCategory || "关系问事"}|${aiClass.intent || "关系趋势"}|双方:${first}-${second}|配对:${match.score}|日期:${getCurrentDateSeed()}|同步时间:${getCurrentDateTimeString()}`;
      const nextResult = castDivination({
        question: seedQuestion,
        sign: first,
        type: "感情",
        time: castTime,
      });

      setResult(nextResult);

      const aiReading = await getAIOracleReading({
        scene: "love",
        question,
        zodiac: first,
        classification: aiClass,
        relationship: {
          firstSign: first,
          secondSign: second,
          matchScore: match.score,
          matchType: match.title,
          matchAdvice: match.advice,
          firstKeyword: a.keyword,
          secondKeyword: b.keyword,
        },
        oracle: {
          hexagram: nextResult.hexName,
          changedHexagram: nextResult.changedName,
          movingLines: nextResult.changing,
          score: nextResult.score,
          tendency: nextResult.tendency,
          time: nextResult.time,
          timeTone: nextResult.timeTone,
          action: nextResult.action,
          should: nextResult.should,
        },
      });

      setLoveAIReading(aiReading);
    } catch (error) {
      setLoveAIError(error.message || "AI情感解读失败，请确认后端 npm run server 正在运行，并且 server.js 已加入 /api/oracle-reading 接口。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="love-oracle" className="glass-section love-oracle-section">
      <SectionTitle tag="Love Oracle" title="情感起卦 · AI 关系问事">
        先选择两个人的星座，再提出情感问题。系统会用 AI 识别问题，再结合配对指数、时辰卦象和关系信息生成解读。
      </SectionTitle>

      <div className="love-oracle-layout">
        <div className="love-form-card">
          <div className="select-row love-select-row">
            <label>
              <span>你的星座</span>
              <select value={first} onChange={(e) => setFirst(e.target.value)}>
                {zodiacNames.map((n) => (
                  <option key={n} value={n}>{zodiacData[n].symbol} {n}</option>
                ))}
              </select>
            </label>

            <div className="heart">♡</div>

            <label>
              <span>对方星座</span>
              <select value={second} onChange={(e) => setSecond(e.target.value)}>
                {zodiacNames.map((n) => (
                  <option key={n} value={n}>{zodiacData[n].symbol} {n}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="love-mini-match">
            <div>
              <strong>{a.symbol} {first}</strong>
              <span>{a.element} · {a.keyword}</span>
            </div>
            <div className="mini-score">
              <b>{match.score}</b>
              <small>配对指数</small>
            </div>
            <div>
              <strong>{b.symbol} {second}</strong>
              <span>{b.element} · {b.keyword}</span>
            </div>
          </div>

          <label>
            <span>你想问的情感问题</span>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="例如：我要不要主动联系他？我们还有机会吗？这段关系适合继续吗？"
            />
          </label>

          <div className="oracle-controls single-time">
            <label className="pretty-time-label">
              <span>起卦时间</span>
              <div className="pretty-time-box compact-time-box">
                <div className="pretty-time-icon">✦</div>
                <input type="time" step="1" value={time} onChange={(e) => setTime(e.target.value)} />
                <div className="pretty-time-glow" />
              </div>
            </label>
          </div>

          <div className="oracle-actions">
            <button className="ai-btn" onClick={() => runLoveCast(true)} disabled={loading}>
              {loading ? "AI情感推演中..." : "AI情感起卦"}
            </button>
            <button className="ghost-btn" onClick={() => runLoveCast(false)} disabled={loading}>
              按选定时间起卦
            </button>
          </div>

          {loveAIError && <div className="ai-error">{loveAIError}</div>}

          {loveAIClass && (
            <div className="ai-class-card">
              <div className="ai-class-head">
                <span>AI 情感归类</span>
                <strong>{loveAIClass.mainCategory || "感情"} · {loveAIClass.subCategory || "关系问事"}</strong>
              </div>
              <div className="ai-class-grid">
                <p><b>问题意图</b><em>{loveAIClass.intent || "关系趋势"}</em></p>
                <p><b>情绪状态</b><em>{loveAIClass.emotion || "未识别"}</em></p>
                <p><b>风险等级</b><em>{loveAIClass.riskLevel || "未知"}</em></p>
              </div>
              <p className="ai-understanding">{loveAIClass.shortUnderstanding || "AI已完成情感问题理解。"}</p>
            </div>
          )}

          <p className="oracle-note">情感起卦会调用 AI，围绕你的具体问题、双方星座与卦象生成关系建议。</p>
        </div>

        <div className="love-result-card">
          {loading && (
            <div className="casting-mask">
              <div className="casting-ring">
                <i />
                <span>情缘星轨合盘中</span>
                <small>AI正在校准问题、配对与卦象</small>
              </div>
            </div>
          )}

          <div className="oracle-head">
            <div>
              <small>情感卦象</small>
              <strong>{result.hexName}</strong>
              <span>{result.time} · {result.timeTone}</span>
            </div>
            <div className="score-ring">
              <strong>{result.score}</strong>
              <span>{result.tendency}</span>
            </div>
          </div>

          <div className="gua-row">
            <article>
              <small>本卦</small>
              <h3>{result.upper.symbol}{result.lower.symbol} {result.hexName}</h3>
              <p>这代表关系当前表层状态与内在流动。</p>
            </article>
            <article>
              <small>变卦</small>
              <h3>{result.changedName === "无变卦" ? "—" : `${result.changedUpperTri.symbol}${result.changedLowerTri.symbol} ${result.changedName}`}</h3>
              <p>{result.changing.length ? `第 ${result.changing.join("、")} 爻动，说明关系仍有变化空间。` : "无动爻，说明当前关系状态较稳定，宜慢不宜急。"}</p>
            </article>
          </div>

          <div className="love-reading">
            <h3>{loveAIReading?.title || "情势指引"}</h3>
            <p>{loveAIReading?.summary || fallbackLoveAdvice}</p>
            <p><strong>围绕问题：</strong>{loveAIReading?.situation || "AI 解读完成后，这里会围绕你的具体情感问题展开说明。"}</p>
            <p><strong>相处提醒：</strong>{loveAIReading?.advice || match.advice}</p>
            <p><strong>风险提醒：</strong>{loveAIReading?.risk || "不要用一次起卦替代真实沟通，也不要用试探代替表达。"}</p>
          </div>

          <button className="deep-toggle" type="button" onClick={() => setShowDeep(!showDeep)}>
            {showDeep ? "收起深度解读" : "展开深度解读"}
          </button>
        </div>

        {showDeep && (
          <div className="deep-reading love-deep-panel">
            <h3>深度解读</h3>
            <div className="deep-grid deep-grid-wide">
              <article><h4>卦象层面</h4><p>{deepReading[0]}</p></article>
              <article><h4>关系节奏</h4><p>{loveAIReading?.timing || deepReading[1]}</p></article>
              <article><h4>沟通提醒</h4><p>{deepReading[2]}</p></article>
              <article><h4>星座张力</h4><p>{deepReading[3]}</p></article>
            </div>

            {loveAIReading && (
              <div className="deep-grid deep-grid-wide love-ai-extra">
                <article><h4>适合做</h4><p>{Array.isArray(loveAIReading.suitable) ? loveAIReading.suitable.join("；") : "用轻量方式确认关系状态。"}</p></article>
                <article><h4>不宜做</h4><p>{Array.isArray(loveAIReading.unsuitable) ? loveAIReading.unsuitable.join("；") : "不要用试探代替真诚沟通。"}</p></article>
                <article><h4>时机提示</h4><p>{loveAIReading.timing || "先观察短期回应，再决定是否加深投入。"}</p></article>
                <article><h4>最后提醒</h4><p>{loveAIReading.finalWords || "关系不是靠一次起卦决定，而是在回应中慢慢看清。"}</p></article>
              </div>
            )}

            <div className="healing-story">
              <span>故事疗愈</span>
              <h4>{loveAIReading?.healingStory?.title || fallbackLoveStory.title}</h4>
              <p>{loveAIReading?.healingStory?.content || fallbackLoveStory.text}</p>
            </div>

            <div className="deep-action">
              <strong>温柔行动：</strong>
              <span>{loveAIReading?.advice || deepReading[4]}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function App() {
  const [name, setName] = useState("匿名旅人"), [birthday, setBirthday] = useState("1998-10-24"), [birthtime, setBirthtime] = useState("21:30"), [city, setCity] = useState("杭州"), [selected, setSelected] = useState("天蝎座");
  const result = useMemo(() => { const d = new Date(birthday); const sign = getSign(d.getMonth() + 1, d.getDate()); return { sign, ...zodiacData[sign], energy: 72 + (sign.charCodeAt(0) % 23) }; }, [birthday]);
  const jumpToMyZodiac = () => { setSelected(result.sign); document.getElementById("zodiac-library")?.scrollIntoView({ behavior: "smooth" }); };
  return <main className="site-shell"><CosmicBackground /><nav className="navbar"><div className="brand"><span className="brand-mark">✦</span><div><strong>星语</strong><small>AstroWhisper</small></div></div><div className="nav-links"><a href="#home">首页</a><a href="#compatibility">星座配对</a><a href="#daily">每日运势</a><a href="#divination">星卦问事</a><a href="#love-oracle">情感起卦</a><a href="#zodiac-library">星座百科</a></div><button className="ghost-btn">登录 / 注册</button></nav><section id="home" className="hero-section"><div className="hero-copy"><div className="tag">✦ AI 星盘解读 · 沉浸式宇宙星图体验</div><h1>探索星辰，<span>遇见更懂你的自己</span></h1><p className="hero-desc">这不是一个只告诉你“今天幸运色”的普通星座网站，而是一个带有<strong> 宇宙氛围、神话故事、星座性格分析、运势理解、配对分析、秒级问卦与深层象征解读 </strong>的沉浸式星座世界。</p><div className="input-grid"><label><span>昵称</span><input value={name} onChange={(e) => setName(e.target.value)} /></label><label><span>出生日期</span><input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} /></label><label><span>出生时间</span><input type="time" value={birthtime} onChange={(e) => setBirthtime(e.target.value)} /></label><label><span>出生地点</span><input value={city} onChange={(e) => setCity(e.target.value)} /></label></div><div className="hero-actions"><button className="primary-btn" onClick={jumpToMyZodiac}>查看我的星座档案</button><a className="secondary-link" href="#compatibility">测试星座配对</a><a className="secondary-link" href="#divination">开始星卦问事</a><a className="secondary-link" href="#love-oracle">情感起卦</a></div></div><div className="astro-panel"><div className="zodiac-wheel"><div className="wheel-ring ring-one" /><div className="wheel-ring ring-two" /><div className="wheel-ring ring-three" /><div className="wheel-center">✦</div>{zodiacNames.map((n, i) => <span key={n} style={{ transform: `rotate(${i * 30}deg) translateY(-142px)` }}>{zodiacData[n].symbol}</span>)}</div><div className="result-card"><div><small>{name} 的太阳星座</small><h2>{result.sign}</h2></div><div className="energy-box"><small>今日能量</small><strong>{result.energy}%</strong></div><div className="result-meta"><span>{result.element}</span><span>{result.mode}</span><span>{result.keyword}</span><span>{city}</span><span>{birthtime}</span></div><p>{result.personality}</p><div className="advice-box"><strong>星座速览</strong><span>{result.sign} 的核心关键词是“{result.keyword}”，守护星为 {result.ruler}。</span></div></div></div></section><section className="glass-section"><div className="section-title"><span>Why This Site</span><h2>不是简单娱乐，而是宇宙中的自我探索</h2><p>现在页面包含星座档案、配对分析、每日运势、秒级问卦、星盘视觉和动态宇宙背景。</p></div><div className="intro-cards"><article><h3>性格分析</h3><p>从行为风格、性格特征、心理驱动力理解每一个星座。</p></article><article><h3>星座配对</h3><p>任意两个星座生成匹配指数、吸引点、磨合点和关系建议。</p></article><article><h3>每日运势</h3><p>包含今日主题、感情、事业、财运、健康、幸运色和幸运数字。</p></article><article><h3>星卦问事</h3><p>基于一天二十四小时每一秒，生成本卦、变卦和行动建议。</p></article><article><h3>情感起卦</h3><p>先选择双方星座，再结合情感问题与起卦时间生成关系建议。</p></article></div></section><CompatibilitySection defaultA={result.sign} /><DailySection defaultSign={result.sign} /><DivinationSection defaultSign={result.sign} /><LoveDivinationSection defaultSign={result.sign} /><section id="zodiac-library" className="glass-section"><SectionTitle tag="Zodiac Archive" title="十二星座百科档案库">点击左侧任意星座卡片，即可查看更详细的星座资料。</SectionTitle><div className="zodiac-layout"><div className="zodiac-tabs">{zodiacNames.map((n) => <button key={n} className={selected === n ? "zodiac-tab active" : "zodiac-tab"} onClick={() => setSelected(n)}><span>{zodiacData[n].symbol}</span><strong>{n}</strong><small>{zodiacData[n].keyword}</small></button>)}</div><ZodiacDetail selected={selected} /></div></section><footer className="footer"><div><strong>星语 AstroWhisper</strong><p>在宇宙的光影中，理解自己，而不是被命运定义。</p></div><div className="footer-links"><a href="#home">首页</a><a href="#compatibility">星座配对</a><a href="#daily">每日运势</a><a href="#divination">星卦问事</a></div></footer><style>{`
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:Inter,"PingFang SC","Microsoft YaHei",Arial,sans-serif;color:#f8fafc;background:radial-gradient(circle at 18% 18%,rgba(92,88,255,.18),transparent 30%),radial-gradient(circle at 82% 16%,rgba(255,178,94,.12),transparent 24%),radial-gradient(circle at 50% 78%,rgba(65,176,255,.1),transparent 32%),linear-gradient(180deg,#01030a 0%,#030713 30%,#050b1a 65%,#02040b 100%);overflow-x:hidden}button,input,select,textarea{font:inherit}button{cursor:pointer}.site-shell{position:relative;min-height:100vh;overflow:hidden;padding:28px;isolation:isolate}.cosmic-scene{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none;background:radial-gradient(circle at 50% 40%,rgba(255,255,255,.03),transparent 45%),linear-gradient(180deg,rgba(4,6,15,.1),rgba(3,4,12,.42))}.nebula{position:absolute;border-radius:50%;filter:blur(55px);opacity:.9;animation:nebulaFloat 18s ease-in-out infinite alternate}.nebula-a{width:700px;height:540px;left:-120px;top:-40px;background:radial-gradient(circle,rgba(99,75,255,.32),transparent 70%)}.nebula-b{width:620px;height:500px;right:-110px;top:120px;background:radial-gradient(circle,rgba(75,201,255,.22),transparent 68%);animation-duration:22s}.nebula-c{width:760px;height:420px;left:12%;bottom:-120px;background:radial-gradient(circle,rgba(255,112,189,.16),transparent 70%);animation-duration:24s}.nebula-d{width:460px;height:360px;left:40%;top:10%;background:radial-gradient(circle,rgba(255,216,126,.08),transparent 70%);animation-duration:26s}.milky{position:absolute;border-radius:999px;filter:blur(18px);mix-blend-mode:screen;opacity:.55;animation:riverFlow 16s ease-in-out infinite alternate}.milky-a{width:980px;height:26px;left:-100px;top:22%;background:linear-gradient(90deg,transparent,rgba(124,100,255,.18),rgba(137,239,255,.28),rgba(255,196,126,.14),transparent)}.milky-b{width:860px;height:20px;right:-80px;top:50%;background:linear-gradient(90deg,transparent,rgba(255,193,120,.12),rgba(255,132,223,.16),rgba(129,164,255,.16),transparent)}.milky-c{width:920px;height:18px;left:10%;bottom:16%;background:linear-gradient(90deg,transparent,rgba(103,182,255,.16),rgba(162,113,255,.18),rgba(255,224,162,.12),transparent)}.orbit{position:absolute;border:1px solid rgba(255,255,255,.06);border-radius:50%;opacity:.45}.orbit-a{width:700px;height:700px;right:-140px;top:-40px}.orbit-b{width:520px;height:520px;left:-100px;bottom:30px}.orbit-c{width:940px;height:940px;left:20%;top:18%;border-color:rgba(255,222,150,.04)}.star{position:absolute;border-radius:999px;animation:twinkle ease-in-out infinite}.star-tiny{width:1px;height:1px}.star-small{width:2px;height:2px}.star-medium{width:3px;height:3px}.star-large{width:4px;height:4px}.star-white{background:#fff;box-shadow:0 0 8px #fff}.star-gold{background:#ffe1aa;box-shadow:0 0 10px #ffd07a}.star-blue{background:#b0e1ff;box-shadow:0 0 10px #6ebeff}.star-violet{background:#d0baff;box-shadow:0 0 10px #a07aff}.star-pink{background:#ffbce6;box-shadow:0 0 10px #ff84d4}.meteor{position:absolute;height:3px;transform:rotate(-28deg);opacity:0;animation:meteorFly linear infinite;filter:drop-shadow(0 0 8px rgba(255,255,255,.6))}.meteor-head{position:absolute;right:0;top:50%;width:10px;height:10px;transform:translateY(-50%);border-radius:50%;background:radial-gradient(circle,#fff 0%,rgba(179,235,255,.95) 45%,rgba(255,255,255,.12) 100%);box-shadow:0 0 12px #fff,0 0 26px rgba(134,219,255,.8),0 0 48px rgba(255,240,184,.45)}.meteor-tail{position:absolute;right:6px;top:50%;transform:translateY(-50%);height:2px;width:100%;border-radius:999px;background:linear-gradient(90deg,transparent,rgba(99,187,255,.08),rgba(162,214,255,.28),rgba(255,255,255,.95));filter:blur(.4px)}.meteor-glow{position:absolute;right:0;top:50%;transform:translateY(-50%);width:36px;height:12px;background:radial-gradient(circle,rgba(173,225,255,.45),transparent 72%);filter:blur(6px)}.planet{position:absolute;transform:translate(-50%,-50%);display:grid;place-items:center;animation:planetFloat ease-in-out infinite;z-index:1}.planet-core{position:relative;width:100%;height:100%;border-radius:50%;box-shadow:inset -18px -18px 28px rgba(0,0,0,.35),inset 10px 10px 18px rgba(255,255,255,.08),0 0 26px rgba(255,255,255,.1);overflow:hidden}.planet-core:before{content:"";position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 30% 26%,rgba(255,255,255,.35),transparent 22%),radial-gradient(circle at 70% 70%,rgba(0,0,0,.12),transparent 42%)}.planet-label{position:absolute;bottom:-26px;font-size:12px;color:rgba(255,255,255,.82);text-shadow:0 0 12px rgba(0,0,0,.5);white-space:nowrap}.mercury .planet-core{background:radial-gradient(circle at 35% 30%,#e9dfd2,#9d9288 58%,#554f49)}.venus .planet-core{background:radial-gradient(circle at 35% 30%,#f7d7a8,#d89b67 54%,#78513d)}.earth .planet-core{background:radial-gradient(circle at 52% 44%,#49c374 0 10%,transparent 11%),radial-gradient(circle at 64% 35%,#3fa45f 0 9%,transparent 10%),radial-gradient(circle at 48% 48%,#45aef8 0 68%,#163d74)}.mars .planet-core{background:radial-gradient(circle at 35% 30%,#eda882,#c56645 55%,#6b2c20)}.jupiter .planet-core{background:repeating-linear-gradient(180deg,#d9b894 0 10px,#b88762 10px 20px,#ecd2ad 20px 30px,#a97452 30px 40px)}.saturn .planet-core{background:radial-gradient(circle at 35% 30%,#f4ddb0,#d0ad75 58%,#7a6241)}.saturn .planet-core:after{content:"";position:absolute;left:50%;top:50%;width:162%;height:34%;border:4px solid rgba(226,214,188,.6);border-radius:50%;transform:translate(-50%,-50%) rotate(-20deg)}.uranus .planet-core{background:radial-gradient(circle at 35% 30%,#dffcff,#8ce1e6 55%,#41838c)}.neptune .planet-core{background:radial-gradient(circle at 35% 30%,#bcd7ff,#5889eb 55%,#203b7e)}.navbar,.hero-section,.glass-section,.footer{position:relative;z-index:2;max-width:1240px;margin:0 auto}.navbar{display:flex;align-items:center;justify-content:space-between;gap:22px;padding:14px 18px;border:1px solid rgba(255,255,255,.12);border-radius:999px;background:rgba(8,12,31,.42);backdrop-filter:blur(20px);box-shadow:0 20px 60px rgba(0,0,0,.26)}.brand{display:flex;align-items:center;gap:12px}.brand-mark{display:grid;place-items:center;width:42px;height:42px;border-radius:50%;color:#f5c77a;border:1px solid rgba(245,199,122,.55);background:rgba(245,199,122,.08)}.brand strong{display:block;font-size:18px;letter-spacing:.08em}.brand small{display:block;margin-top:2px;color:#9aa5bb;font-size:12px}.nav-links{display:flex;align-items:center;gap:22px}.nav-links a{color:#d6def0;text-decoration:none;font-size:14px}.nav-links a:hover{color:#f5c77a}.ghost-btn,.secondary-link{border:1px solid rgba(255,255,255,.18);color:#f8fafc;background:rgba(255,255,255,.06);border-radius:999px;padding:12px 20px;backdrop-filter:blur(8px);text-decoration:none;display:inline-flex;align-items:center}.hero-section{display:grid;grid-template-columns:minmax(0,.95fr) minmax(420px,1.05fr);align-items:center;gap:54px;padding:96px 10px 72px}.tag{display:inline-flex;align-items:center;gap:8px;padding:9px 14px;border-radius:999px;color:#f8e4b8;border:1px solid rgba(245,199,122,.26);background:rgba(255,255,255,.06);font-size:14px}.hero-copy h1{margin:26px 0 0;font-size:clamp(44px,7vw,84px);line-height:1.03;letter-spacing:-.06em}.hero-copy h1 span{display:block;margin-top:8px;background:linear-gradient(90deg,#fff,#f7d18b,#c7a8ff,#8cdcff);-webkit-background-clip:text;background-clip:text;color:transparent}.hero-desc{max-width:680px;margin:26px 0 0;color:#dbe4f4;font-size:17px;line-height:1.95}.input-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-top:34px;max-width:660px}.input-grid label,label{display:grid;gap:8px}.input-grid span,label span{color:#dbeafe;font-size:13px}.input-grid input,select,textarea{border:1px solid rgba(255,255,255,.13);border-radius:14px;padding:0 15px;color:#fff;outline:none;background:rgba(9,14,32,.68);backdrop-filter:blur(10px)}.input-grid input,select{height:50px}textarea{min-height:126px;padding:14px 15px;resize:vertical;line-height:1.7}option{background:#0b1025}.hero-actions{display:flex;gap:14px;flex-wrap:wrap;margin-top:28px}.primary-btn{border:0;color:#16120a;border-radius:999px;padding:15px 28px;font-weight:700;background:linear-gradient(135deg,#ffe2a5,#f3bf68 34%,#cf8fff 68%,#8dd9ff);box-shadow:0 18px 46px rgba(245,190,101,.22)}.astro-panel{display:grid;gap:24px;justify-items:center}.zodiac-wheel{position:relative;width:min(520px,88vw);aspect-ratio:1;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle,rgba(246,211,142,.1),transparent 28%),radial-gradient(circle,rgba(255,255,255,.06),transparent 62%);border:1px solid rgba(255,255,255,.08);backdrop-filter:blur(12px);box-shadow:0 0 50px rgba(245,199,122,.12);animation:zodiacRotate 36s linear infinite}.wheel-ring{position:absolute;border-radius:50%;border:1px solid rgba(245,199,122,.28)}.ring-one{inset:9%}.ring-two{inset:20%;border-style:dashed}.ring-three{inset:33%}.wheel-center{display:grid;place-items:center;width:84px;height:84px;border-radius:50%;color:#f5c77a;background:rgba(245,199,122,.08);border:1px solid rgba(245,199,122,.45);box-shadow:0 0 38px rgba(245,199,122,.22)}.zodiac-wheel span{position:absolute;color:#f5c77a;font-size:23px;transform-origin:center}.result-card{width:min(520px,100%);padding:26px;border-radius:28px;background:rgba(8,12,29,.54);border:1px solid rgba(255,255,255,.14);box-shadow:0 24px 80px rgba(0,0,0,.34);backdrop-filter:blur(24px);display:grid;grid-template-columns:1fr auto;gap:18px}.result-card small,.energy-box small{color:#9fb0ca}.result-card h2{margin:8px 0 0;font-size:36px;color:#f8e4b8}.energy-box{text-align:right}.energy-box strong{display:block;margin-top:8px;font-size:32px}.result-meta,.result-card p,.advice-box{grid-column:1/-1}.result-meta,.trait-list,.keyword-cloud{display:flex;gap:8px;flex-wrap:wrap}.result-meta span,.trait-list span,.keyword-cloud span{padding:7px 11px;border-radius:999px;color:#f8e4b8;background:rgba(245,199,122,.1);border:1px solid rgba(245,199,122,.18);font-size:13px}.result-card p{margin:0;color:#dbeafe;line-height:1.9}.advice-box{display:grid;gap:8px;padding:16px;border-radius:18px;color:#fdf6e5;background:rgba(255,255,255,.06)}.glass-section{margin-top:28px;padding:44px;border-radius:34px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);backdrop-filter:blur(20px);box-shadow:0 20px 60px rgba(0,0,0,.18)}.section-title{text-align:center;max-width:780px;margin:0 auto 34px}.left-title{text-align:left;margin-left:0}.left-title p{margin-left:0}.section-title span{color:#f5c77a;letter-spacing:.16em;text-transform:uppercase;font-size:13px}.section-title h2{margin:14px 0 0;font-size:clamp(30px,4.5vw,50px);letter-spacing:-.04em}.section-title p{margin:16px auto 0;color:#cbd5e1;line-height:1.9}.intro-cards{display:grid;grid-template-columns:repeat(5,1fr);gap:16px}.intro-cards article,.match-detail-panel article,.daily-grid article,.match-card,.daily-main-card,.oracle-card,.oracle-result,.love-form-card,.love-result-card{border:1px solid rgba(255,255,255,.12);background:linear-gradient(145deg,rgba(255,255,255,.09),rgba(255,255,255,.035));backdrop-filter:blur(18px);box-shadow:0 20px 58px rgba(0,0,0,.22)}.intro-cards article{min-height:180px;padding:22px;border-radius:22px}.intro-cards h3,.match-detail-panel h4,.daily-grid h4{margin:0 0 10px;color:#f8e4b8}.intro-cards p,.match-detail-panel p,.daily-grid p{margin:0;color:#c7d3e8;line-height:1.8;font-size:14px}.compatibility-layout,.daily-layout,.oracle-layout,.love-oracle-layout{display:grid;grid-template-columns:1.08fr .92fr;gap:22px}.match-card,.daily-main-card,.oracle-card,.oracle-result,.love-form-card,.love-result-card{position:relative;padding:28px;border-radius:30px}.casting-mask{position:absolute;inset:0;z-index:8;display:grid;place-items:center;border-radius:30px;background:rgba(4,7,19,.72);backdrop-filter:blur(10px)}.casting-ring{width:210px;height:210px;border-radius:50%;display:grid;place-items:center;text-align:center;border:1px solid rgba(245,199,122,.34);background:radial-gradient(circle,rgba(245,199,122,.16),rgba(142,109,255,.12),rgba(255,255,255,.04));box-shadow:0 0 46px rgba(245,199,122,.16)}.casting-ring i{width:92px;height:92px;border-radius:50%;border:3px solid rgba(255,255,255,.14);border-top-color:#f8e4b8;border-right-color:#8dd9ff;animation:spinOracle 1.1s linear infinite}.casting-ring span{display:block;color:#f8e4b8;font-weight:800;margin-top:-18px}.casting-ring small{display:block;color:#cbd5e1;font-size:12px;margin-top:-20px}.love-mini-match{display:grid;grid-template-columns:1fr 110px 1fr;gap:12px;align-items:center;margin:18px 0;padding:16px;border-radius:22px;background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.08)}.love-mini-match strong{display:block;color:#f8e4b8;font-size:18px}.love-mini-match span{display:block;color:#cbd5e1;margin-top:6px;font-size:13px}.mini-score{display:grid;place-items:center;text-align:center;width:96px;height:96px;border-radius:50%;background:rgba(245,199,122,.09);border:1px solid rgba(245,199,122,.24)}.mini-score b{font-size:30px;color:#f8e4b8}.mini-score small{font-size:12px;color:#cbd5e1}.single-time{grid-template-columns:1fr}.love-reading{margin-top:18px;padding:18px;border-radius:22px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08)}.love-reading h3{margin:0 0 10px;color:#f8e4b8}.love-reading p{color:#dbe4f4;line-height:1.85}.deep-toggle{margin-top:14px;width:100%;height:48px;border-radius:999px;border:1px solid rgba(245,199,122,.24);background:rgba(245,199,122,.08);color:#f8e4b8;font-weight:700}.deep-reading{margin-top:14px;padding:18px;border-radius:24px;background:linear-gradient(145deg,rgba(255,255,255,.075),rgba(255,255,255,.035));border:1px solid rgba(255,255,255,.1)}.love-deep-panel{grid-column:1/-1;margin-top:0}.deep-reading h3{margin:0 0 16px;color:#f8e4b8}.deep-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.deep-grid-wide{grid-template-columns:repeat(4,1fr)}.deep-grid article{padding:15px;border-radius:18px;background:rgba(2,6,23,.26);border:1px solid rgba(255,255,255,.07)}.deep-grid h4,.healing-story h4{margin:0 0 8px;color:#f8e4b8}.deep-grid p,.healing-story p{margin:0;color:#dbe4f4;line-height:1.85;font-size:14px}.healing-story{margin-top:14px;padding:18px;border-radius:22px;background:radial-gradient(circle at 10% 0%,rgba(245,199,122,.12),transparent 38%),rgba(255,255,255,.055);border:1px solid rgba(245,199,122,.16)}.healing-story span{display:inline-flex;margin-bottom:10px;color:#f5c77a;letter-spacing:.14em;text-transform:uppercase;font-size:12px}.deep-action{display:flex;gap:8px;margin-top:14px;padding:14px;border-radius:18px;color:#fdf6e5;background:rgba(255,255,255,.06)}.ai-btn{border:1px solid rgba(141,217,255,.32);color:#e9f8ff;background:linear-gradient(135deg,rgba(141,217,255,.18),rgba(207,143,255,.12));border-radius:999px;padding:15px 22px;font-weight:800;box-shadow:0 14px 34px rgba(141,217,255,.12)}.ai-btn:disabled,.primary-btn:disabled,.ghost-btn:disabled{opacity:.62;cursor:not-allowed}.ai-error{margin-top:14px;padding:13px 15px;border-radius:16px;color:#ffd8d8;background:rgba(255,84,112,.12);border:1px solid rgba(255,84,112,.24)}.ai-class-card{margin-top:16px;padding:18px;border-radius:22px;background:radial-gradient(circle at 0% 0%,rgba(141,217,255,.12),transparent 34%),rgba(255,255,255,.055);border:1px solid rgba(141,217,255,.18)}.ai-class-head{display:flex;justify-content:space-between;gap:14px;align-items:center;margin-bottom:14px}.ai-class-head span{color:#8dd9ff;letter-spacing:.14em;text-transform:uppercase;font-size:12px}.ai-class-head strong{color:#f8e4b8;font-size:18px}.ai-class-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.ai-class-grid p{margin:0;padding:12px;border-radius:16px;background:rgba(2,6,23,.24);border:1px solid rgba(255,255,255,.07)}.ai-class-grid b{display:block;color:#9fb0ca;font-size:12px;margin-bottom:6px}.ai-class-grid em{font-style:normal;color:#fff}.ai-keywords{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.ai-keywords i{font-style:normal;padding:7px 10px;border-radius:999px;color:#dff6ff;background:rgba(141,217,255,.1);border:1px solid rgba(141,217,255,.18);font-size:13px}.ai-understanding{margin:12px 0 0;color:#dbe4f4;line-height:1.75}.time-sync-card{display:flex;justify-content:space-between;gap:16px;align-items:center;margin-top:14px;padding:16px;border-radius:22px;background:radial-gradient(circle at 0% 0%,rgba(245,199,122,.13),transparent 34%),rgba(255,255,255,.055);border:1px solid rgba(245,199,122,.18)}.time-sync-card span{display:block;color:#f5c77a;letter-spacing:.12em;text-transform:uppercase;font-size:12px}.time-sync-card strong{display:block;margin-top:7px;color:#fff;font-size:22px}.time-sync-card small{display:block;margin-top:6px;color:#9fb0ca}.sync-switch{min-width:116px;border-radius:999px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.06);color:#dbeafe;padding:10px 14px;font-weight:800}.sync-switch.active{border-color:rgba(141,217,255,.32);background:linear-gradient(135deg,rgba(141,217,255,.18),rgba(207,143,255,.14));color:#e9f8ff}.select-row,.oracle-controls{display:grid;grid-template-columns:1fr 72px 1fr;gap:14px;align-items:end}.oracle-controls{grid-template-columns:repeat(3,1fr);margin-top:14px}.heart{height:52px;display:grid;place-items:center;font-size:34px;color:#ffd7e8}.match-hero{display:grid;grid-template-columns:1fr 150px 1fr;gap:18px;align-items:center;margin-top:28px}.match-sign{min-height:162px;border-radius:26px;display:grid;place-items:center;text-align:center;padding:18px;background:rgba(6,10,28,.38);border:1px solid rgba(255,255,255,.09)}.match-sign strong{font-size:56px;color:#f8e4b8;line-height:1}.match-sign span{font-size:22px;font-weight:700;margin-top:8px}.match-sign small{color:#aeb8cd}.score-ring{width:142px;height:142px;border-radius:50%;display:grid;place-items:center;text-align:center;border:1px solid rgba(245,199,122,.44);background:radial-gradient(circle,rgba(245,199,122,.2),rgba(158,116,255,.08),rgba(255,255,255,.04));box-shadow:0 0 42px rgba(245,199,122,.16)}.score-ring strong{font-size:42px;color:#f8e4b8}.score-ring span{color:#cbd5e1;font-size:13px;margin-top:-20px}.score-bar{height:12px;border-radius:999px;overflow:hidden;background:rgba(255,255,255,.08);margin:24px 0}.score-bar i{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,#8dd9ff,#c996ff,#ffe2a5);transition:width .35s ease}.match-result h3{margin:0;font-size:28px;color:#f8e4b8}.match-result p{color:#dbe4f4;line-height:1.85}.special-note{padding:12px 14px;border-radius:16px;background:rgba(255,255,255,.055)}.match-detail-panel{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.match-detail-panel article,.daily-grid article{border-radius:24px;padding:20px}.wide-card{grid-column:1/-1}.daily-top{display:flex;justify-content:space-between;gap:18px;align-items:center}.daily-symbol{display:grid;place-items:center;text-align:center;width:120px;height:120px;border-radius:32px;background:rgba(245,199,122,.08);border:1px solid rgba(245,199,122,.22)}.daily-symbol strong{font-size:48px;color:#f8e4b8}.daily-score{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:22px 0}.daily-score div{padding:16px;border-radius:20px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08)}.daily-score small{display:block;color:#9fb0ca}.daily-score strong{display:block;margin-top:8px;color:#f8e4b8;font-size:22px}.daily-focus{padding:18px;border-radius:22px;background:rgba(255,255,255,.06)}.daily-focus h3{margin:0 0 10px;color:#f8e4b8}.daily-focus p{margin:0;color:#dbe4f4;line-height:1.8}.daily-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.oracle-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:18px}.oracle-note{color:#cbd5e1;line-height:1.8}.oracle-head{display:flex;justify-content:space-between;gap:18px;align-items:center}.oracle-head small,.gua-row small{color:#9fb0ca}.oracle-head strong{display:block;font-size:34px;color:#f8e4b8;margin:6px 0}.oracle-head span{color:#cbd5e1}.gua-row{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin:22px 0}.gua-row article,.oracle-reading{padding:18px;border-radius:22px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08)}.gua-row h3,.oracle-reading h3{margin:8px 0;color:#f8e4b8}.gua-row p,.oracle-reading p{color:#dbe4f4;line-height:1.8}.yao-list{display:grid;gap:8px}.yao-item{display:grid;grid-template-columns:80px 1fr 88px;gap:10px;align-items:center;padding:10px 12px;border-radius:16px;background:rgba(2,6,23,.26);border:1px solid rgba(255,255,255,.06)}.yao-item span{color:#9fb0ca}.yao-item i{font-style:normal;letter-spacing:4px;text-align:center;color:#f8e4b8}.yao-item i.yin{color:#8dd9ff}.yao-item em{font-style:normal;color:#cbd5e1}.oracle-reading{margin-top:18px}.zodiac-layout{display:grid;grid-template-columns:390px 1fr;gap:24px;align-items:start}.zodiac-tabs{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.zodiac-tab{min-height:112px;text-align:left;border:1px solid rgba(255,255,255,.1);border-radius:20px;color:#e5e7eb;background:rgba(9,14,32,.42);padding:16px;transition:.22s ease;backdrop-filter:blur(10px)}.zodiac-tab:hover,.zodiac-tab.active{transform:translateY(-2px);border-color:rgba(245,199,122,.48);background:linear-gradient(180deg,rgba(245,199,122,.12),rgba(188,127,255,.08));box-shadow:0 18px 42px rgba(0,0,0,.24)}.zodiac-tab span{display:block;margin-bottom:8px;color:#f5c77a;font-size:28px}.zodiac-tab strong{display:block;font-size:18px}.zodiac-tab small{display:block;margin-top:6px;color:#aeb8cd}.zodiac-detail-card{position:sticky;top:24px;padding:30px;border-radius:30px;background:linear-gradient(145deg,rgba(255,255,255,.08),rgba(255,255,255,.03)),radial-gradient(circle at 80% 0%,rgba(245,199,122,.14),transparent 36%);border:1px solid rgba(255,255,255,.14);box-shadow:0 24px 80px rgba(0,0,0,.24);backdrop-filter:blur(18px)}.detail-head{display:flex;align-items:center;gap:18px;margin-bottom:20px}.detail-symbol{display:grid;place-items:center;flex:0 0 86px;height:86px;border-radius:28px;color:#f5c77a;font-size:48px;background:rgba(245,199,122,.1);border:1px solid rgba(245,199,122,.24)}.detail-head p{margin:0 0 7px;color:#f5c77a;letter-spacing:.14em;text-transform:uppercase;font-size:12px}.detail-head h3{margin:0;font-size:36px;letter-spacing:-.03em}.detail-head span{display:block;margin-top:8px;color:#cbd5e1;line-height:1.7}.detail-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}.detail-grid section{min-height:180px;padding:18px;border-radius:22px;background:rgba(2,6,23,.28);border:1px solid rgba(255,255,255,.08)}.detail-grid h4{margin:0 0 10px;color:#f8e4b8;font-size:18px}.detail-grid p{margin:0;color:#cbd5e1;line-height:1.86;font-size:14px}.footer{display:flex;justify-content:space-between;gap:22px;padding:28px 10px 8px;color:#94a3b8;border-top:1px solid rgba(255,255,255,.08);margin-top:34px}.footer strong{color:#fff}.footer-links{display:flex;gap:22px;flex-wrap:wrap}.footer-links a{color:#94a3b8;text-decoration:none}@keyframes twinkle{0%,100%{transform:scale(.7);opacity:.25}50%{transform:scale(1.55);opacity:1}}@keyframes meteorFly{0%{transform:translate3d(0,0,0) rotate(-28deg);opacity:0}8%{opacity:1}40%{transform:translate3d(280px,210px,0) rotate(-28deg);opacity:0}100%{transform:translate3d(280px,210px,0) rotate(-28deg);opacity:0}}@keyframes planetFloat{0%,100%{transform:translate(-50%,-50%) translateY(0)}50%{transform:translate(-50%,-50%) translateY(-12px)}}@keyframes nebulaFloat{0%{transform:translate3d(0,0,0) scale(1)}100%{transform:translate3d(24px,-18px,0) scale(1.06)}}@keyframes riverFlow{0%{transform:translateX(-20px) rotate(-6deg);opacity:.42}100%{transform:translateX(34px) rotate(6deg);opacity:.7}}@keyframes zodiacRotate{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes spinOracle{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@media(max-width:1100px){.hero-section,.compatibility-layout,.daily-layout,.oracle-layout,.love-oracle-layout,.zodiac-layout{grid-template-columns:1fr}.intro-cards,.match-detail-panel,.daily-grid,.deep-grid-wide{grid-template-columns:repeat(2,1fr)}.nav-links{display:none}.zodiac-detail-card{position:static}.planet-label{font-size:11px}}@media(max-width:720px){.site-shell{padding:16px}.navbar{border-radius:24px}.ghost-btn{display:none}.hero-section{padding-top:58px}.input-grid,.zodiac-tabs,.detail-grid,.intro-cards,.match-detail-panel,.daily-grid,.select-row,.match-hero,.oracle-controls,.gua-row,.love-mini-match,.ai-class-grid{grid-template-columns:1fr}.glass-section{padding:28px 18px}.heart{height:auto}.result-card{grid-template-columns:1fr}.energy-box{text-align:left}.daily-top,.oracle-head{display:grid}.daily-score{grid-template-columns:1fr}.yao-item{grid-template-columns:1fr}.footer{flex-direction:column}.planet-label{display:none}}

/* === Cosmic deluxe upgrade: smoother, cleaner, less flicker === */
body{background:#02040e}.cosmic-scene{background:linear-gradient(180deg,rgba(1,3,14,.08),rgba(3,5,20,.36)),radial-gradient(circle at 48% 45%,rgba(168,92,255,.13),transparent 38%),radial-gradient(circle at 74% 20%,rgba(255,178,92,.1),transparent 25%),#02040e}.deep-space-photo{position:absolute;inset:0;background-image:radial-gradient(circle at 50% 45%,rgba(255,218,150,.13),transparent 2%,transparent 12%),radial-gradient(ellipse at 42% 42%,rgba(138,83,255,.2),transparent 34%),radial-gradient(ellipse at 34% 55%,rgba(255,80,190,.14),transparent 42%),radial-gradient(ellipse at 72% 30%,rgba(255,158,84,.13),transparent 38%),radial-gradient(ellipse at 58% 74%,rgba(49,170,255,.12),transparent 34%),linear-gradient(120deg,rgba(13,22,58,.82),rgba(6,7,22,.74) 38%,rgba(18,10,40,.88) 68%,rgba(3,7,18,.96));filter:saturate(1.15) contrast(1.03)}.deep-space-photo:before{content:"";position:absolute;inset:-12%;background:conic-gradient(from 210deg at 48% 46%,transparent 0 12%,rgba(111,92,255,.1) 16%,rgba(255,104,202,.12) 22%,rgba(89,178,255,.14) 31%,transparent 43%,rgba(255,202,126,.1) 55%,transparent 72%,rgba(116,83,255,.12) 86%,transparent 100%);filter:blur(24px);opacity:.75;animation:cosmicSlowSpin 160s linear infinite}.deep-space-photo:after{content:"";position:absolute;inset:0;background-image:radial-gradient(circle,rgba(255,255,255,.72) 0 1px,transparent 1.6px),radial-gradient(circle,rgba(141,217,255,.54) 0 1px,transparent 1.8px),radial-gradient(circle,rgba(255,205,122,.42) 0 1px,transparent 1.7px);background-size:110px 110px,170px 170px,250px 250px;background-position:0 0,36px 52px,90px 18px;opacity:.55}.galaxy-stream{position:absolute;left:-8%;right:-8%;height:150px;border-radius:999px;filter:blur(18px);mix-blend-mode:screen;opacity:.58;transform:rotate(-18deg);animation:galaxyDrift 46s ease-in-out infinite alternate}.stream-a{top:22%;background:linear-gradient(90deg,transparent,rgba(85,176,255,.15),rgba(176,96,255,.22),rgba(255,199,126,.14),transparent)}.stream-b{top:43%;height:190px;transform:rotate(-23deg);background:linear-gradient(90deg,transparent,rgba(255,87,188,.13),rgba(105,142,255,.18),rgba(255,223,155,.1),transparent);animation-duration:54s}.stream-c{bottom:8%;height:130px;transform:rotate(13deg);background:linear-gradient(90deg,transparent,rgba(67,210,255,.1),rgba(156,89,255,.15),rgba(255,130,204,.1),transparent);animation-duration:60s}.nebula{filter:blur(68px);opacity:.82}.nebula-a{background:radial-gradient(circle,rgba(92,76,255,.36),transparent 70%)}.nebula-b{background:radial-gradient(circle,rgba(67,213,255,.24),transparent 68%)}.nebula-c{background:radial-gradient(circle,rgba(255,79,190,.22),transparent 70%)}.nebula-d{background:radial-gradient(circle,rgba(255,205,118,.14),transparent 70%)}.star{z-index:2;will-change:opacity,transform}.star-large{width:4px;height:4px}.star-white{background:#fff;box-shadow:0 0 7px #fff,0 0 16px rgba(255,255,255,.65)}.star-gold{background:#ffe4a8;box-shadow:0 0 8px #ffd07a,0 0 18px rgba(255,196,93,.58)}.star-blue{background:#aee7ff;box-shadow:0 0 9px #67c7ff,0 0 20px rgba(83,186,255,.58)}.star-violet{background:#d3b6ff;box-shadow:0 0 9px #a475ff,0 0 20px rgba(159,94,255,.6)}.star-pink{background:#ffb9e8;box-shadow:0 0 9px #ff7bd8,0 0 20px rgba(255,103,201,.6)}.planet{z-index:3;filter:drop-shadow(0 18px 22px rgba(0,0,0,.28)) drop-shadow(0 0 16px rgba(125,185,255,.14));will-change:transform}.planet-core{box-shadow:inset -28px -24px 36px rgba(0,0,0,.48),inset 12px 12px 22px rgba(255,255,255,.2),0 0 30px rgba(160,207,255,.18);transform:rotate(-10deg)}.planet-core:before{background:radial-gradient(circle at 28% 22%,rgba(255,255,255,.74),transparent 18%),radial-gradient(circle at 68% 72%,rgba(0,0,0,.18),transparent 44%)}.planet-orbit-glow{position:absolute;inset:-10px;border-radius:50%;background:radial-gradient(circle,rgba(133,207,255,.16),transparent 68%);filter:blur(7px)}.planet-label{font-size:13px;color:#fff3d0;text-shadow:0 0 12px rgba(255,217,146,.45),0 2px 10px #000}.earth .planet-core{background-image:radial-gradient(circle at 32% 28%,#fff 0 3%,transparent 4%),radial-gradient(ellipse at 38% 42%,#67c66a 0 11%,transparent 12%),radial-gradient(ellipse at 58% 55%,#4fa95f 0 10%,transparent 11%),radial-gradient(ellipse at 66% 34%,#c8e6b7 0 6%,transparent 7%),radial-gradient(circle at 45% 48%,#4db7ff 0 64%,#153b7f 100%)}.venus .planet-core{background-image:radial-gradient(circle at 35% 28%,rgba(255,255,255,.55),transparent 20%),repeating-linear-gradient(168deg,#f4d5a4 0 10px,#d99b62 10px 18px,#f0bd7e 18px 28px,#9d613f 28px 38px)}.mars .planet-core{background-image:radial-gradient(circle at 35% 28%,rgba(255,255,255,.42),transparent 18%),radial-gradient(ellipse at 58% 62%,rgba(96,42,29,.52),transparent 26%),repeating-linear-gradient(158deg,#ed9c73 0 12px,#b95437 12px 25px,#e07e55 25px 36px,#6e2b1f 36px 48px)}.jupiter .planet-core{background-image:radial-gradient(ellipse at 63% 58%,rgba(116,52,32,.75) 0 9%,transparent 11%),radial-gradient(circle at 32% 25%,rgba(255,255,255,.55),transparent 18%),repeating-linear-gradient(180deg,#ead0a9 0 11px,#c39169 11px 22px,#f5dfba 22px 35px,#9d6a4c 35px 48px,#d4a073 48px 62px)}.saturn .planet-core{background-image:radial-gradient(circle at 35% 30%,rgba(255,255,255,.62),transparent 18%),repeating-linear-gradient(178deg,#f0d6a5 0 12px,#cfa46d 12px 23px,#f8e3ba 23px 34px,#8a6a43 34px 48px)}.saturn .planet-core:after{width:192%;height:40%;border:5px solid rgba(230,220,190,.72);border-left-color:rgba(255,238,185,.3);border-right-color:rgba(133,170,255,.45);box-shadow:0 0 16px rgba(255,225,163,.2)}.uranus .planet-core{background-image:radial-gradient(circle at 34% 26%,rgba(255,255,255,.74),transparent 20%),linear-gradient(140deg,#bdfaff,#6bd7df 48%,#2d6f81)}.neptune .planet-core{background-image:radial-gradient(circle at 35% 26%,rgba(255,255,255,.58),transparent 19%),radial-gradient(ellipse at 62% 58%,rgba(22,55,147,.5),transparent 26%),linear-gradient(140deg,#b2d3ff,#4d82eb 52%,#192d7d)}.mercury .planet-core{background-image:radial-gradient(circle at 32% 25%,rgba(255,255,255,.54),transparent 18%),radial-gradient(circle at 58% 62%,rgba(60,55,54,.35),transparent 18%),linear-gradient(135deg,#e8dfd5,#a1978d 58%,#5e5650)}.zodiac-wheel{background:radial-gradient(circle at 50% 50%,rgba(255,218,142,.16),transparent 13%),radial-gradient(circle at 50% 50%,rgba(140,80,255,.18),transparent 34%),rgba(7,9,27,.46);border:1px solid rgba(255,220,148,.32);box-shadow:0 0 55px rgba(155,95,255,.22),inset 0 0 80px rgba(255,202,126,.08);animation:zodiacRotate 88s linear infinite}.zodiac-wheel:before{content:"";position:absolute;inset:7%;border-radius:50%;background:conic-gradient(from 0deg,rgba(255,214,130,.06),rgba(162,91,255,.16),rgba(95,213,255,.1),rgba(255,214,130,.08),rgba(162,91,255,.16));mask:radial-gradient(circle,transparent 0 51%,#000 52% 54%,transparent 55% 62%,#000 63% 64%,transparent 65%);animation:zodiacRotate 110s linear infinite reverse}.zodiac-wheel:after{content:"";position:absolute;inset:16%;border-radius:50%;border:1px solid rgba(255,220,148,.24);box-shadow:0 0 0 1px rgba(147,95,255,.14),inset 0 0 26px rgba(255,221,150,.08)}.zodiac-wheel span{font-size:28px;color:#e9ccff;text-shadow:0 0 10px rgba(184,95,255,.82),0 0 18px rgba(160,89,255,.54);background:radial-gradient(circle,rgba(145,77,255,.48),rgba(72,42,132,.58));width:42px;height:42px;border-radius:12px;display:grid;place-items:center;border:1px solid rgba(218,180,255,.28)}.wheel-ring{border-color:rgba(255,210,132,.42)}.wheel-center{background:radial-gradient(circle,#fff4c8,rgba(247,182,69,.22));box-shadow:0 0 30px rgba(255,220,130,.46),0 0 70px rgba(162,90,255,.2)}.hero-copy h1{font-size:clamp(52px,7.2vw,98px);text-shadow:0 0 26px rgba(255,225,173,.18)}.hero-copy h1 span{background:linear-gradient(90deg,#fff1c8,#ffd47b,#e4b4ff,#9fceff);-webkit-background-clip:text;background-clip:text;color:transparent}.navbar{background:rgba(4,7,22,.54);border-color:rgba(255,224,160,.16)}.glass-section,.result-card,.match-card,.daily-main-card,.oracle-card,.oracle-result,.love-form-card,.love-result-card{background:linear-gradient(145deg,rgba(255,255,255,.1),rgba(255,255,255,.035));border-color:rgba(255,225,161,.13);box-shadow:0 24px 70px rgba(0,0,0,.24),inset 0 1px 0 rgba(255,255,255,.06)}

/* === layout polish: align, reduce empty space, decorate time fields === */
.section-title{text-align:center}.left-title{text-align:center;margin-left:auto}.left-title p{margin-left:auto}.hero-section{grid-template-columns:minmax(460px,.9fr) minmax(520px,1.1fr);gap:34px}.hero-copy{max-width:680px}.hero-desc{max-width:620px}.astro-panel{align-self:center}.input-grid{max-width:620px}.compatibility-layout,.daily-layout,.oracle-layout,.love-oracle-layout{align-items:start}.oracle-controls{align-items:stretch}.oracle-controls label{height:100%}.oracle-controls select,.oracle-controls input{width:100%}.oracle-result,.love-result-card{display:flex;flex-direction:column;gap:16px}.oracle-reading,.love-reading{margin-top:0}.gua-row{margin:0}.deep-reading.oracle-deep-panel{grid-column:1/-1;margin-top:18px}.love-oracle-layout .love-deep-panel{grid-column:1/-1;margin-top:18px}.love-oracle-layout{align-items:start}.deep-grid-wide{grid-template-columns:repeat(4,minmax(0,1fr))}.pretty-time-label{display:grid;gap:8px}.pretty-time-box{position:relative;display:flex;align-items:center;gap:12px;min-height:54px;padding:10px 14px;border-radius:18px;border:1px solid rgba(141,217,255,.22);background:radial-gradient(circle at 15% 20%,rgba(141,217,255,.16),transparent 35%),radial-gradient(circle at 85% 80%,rgba(207,143,255,.12),transparent 38%),rgba(7,14,35,.68);box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 12px 26px rgba(0,0,0,.18);overflow:hidden}.pretty-time-icon{position:relative;z-index:2;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;color:#ffe7a8;font-size:16px;background:linear-gradient(135deg,rgba(255,226,153,.22),rgba(141,217,255,.12));border:1px solid rgba(255,231,168,.18);box-shadow:0 0 16px rgba(255,221,150,.12)}.pretty-time-box input[type="time"]{position:relative;z-index:2;flex:1;min-width:0;border:none!important;outline:none!important;background:transparent!important;color:#f7fbff;font-size:17px;letter-spacing:.08em;font-weight:700;padding:0;height:auto;font-family:Georgia,"Times New Roman",serif}.pretty-time-box input[type="time"]::-webkit-calendar-picker-indicator{filter:invert(1) opacity(.8);cursor:pointer}.pretty-time-glow{position:absolute;inset:auto -30px -30px auto;width:110px;height:110px;border-radius:50%;background:radial-gradient(circle,rgba(123,198,255,.13),transparent 68%);pointer-events:none}.compact-time-box{min-height:50px}.daily-grid,.match-detail-panel,.intro-cards,.detail-grid{align-items:stretch}.daily-grid article,.match-detail-panel article,.intro-cards article,.detail-grid section{height:100%}.ai-class-head,.daily-top,.oracle-head{align-items:center}.love-mini-match{text-align:center}.deep-action{align-items:flex-start}.time-sync-card{padding:14px 16px}.time-sync-card strong{margin-top:0;text-align:left}.sync-switch{min-width:82px}.section-title h2,.intro-cards h3,.match-result h3,.daily-focus h3,.oracle-reading h3,.love-reading h3,.deep-reading h3,.detail-head h3{color:#f8e4b8;text-align:inherit}.intro-cards h3,.daily-grid h4,.match-detail-panel h4,.deep-grid h4{text-align:center}.intro-cards p,.daily-grid p,.match-detail-panel p,.deep-grid p{text-align:left}@media(max-width:1100px){.hero-section{grid-template-columns:1fr}.hero-copy,.hero-desc,.input-grid{max-width:none}.deep-grid-wide{grid-template-columns:repeat(2,minmax(0,1fr))}}.oracle-deep-full,.love-deep-panel{width:100%;margin-top:22px}.oracle-layout,.love-oracle-layout{grid-auto-rows:auto}.oracle-card,.love-form-card{height:auto;min-height:0}.oracle-result,.love-result-card{height:max-content}.single-time{display:flex!important;justify-content:center;align-items:center}.single-time .pretty-time-label{width:min(100%,360px);text-align:center}.pretty-time-label>span{text-align:center}.pretty-time-box{width:100%;justify-content:center}.pretty-time-box input[type="time"]{min-width:118px;text-align:center;letter-spacing:.04em}.compact-time-box{min-height:60px;padding:12px 16px}.love-form-card textarea,.oracle-card textarea{display:block;width:100%;text-align:left}.love-form-card label>span,.oracle-card label>span{text-align:center}.oracle-card .oracle-controls label>span{text-align:center}.time-sync-card{text-align:center}.time-sync-card strong,.time-sync-card small{text-align:center}.oracle-actions{justify-content:center}.oracle-note{text-align:center}.ai-class-card{text-align:center}.ai-class-grid p{text-align:center}.love-reading,.oracle-reading{text-align:left}.love-reading h3,.oracle-reading h3{text-align:center}.oracle-split-reading-card,.right-oracle-reading-card{padding:18px;border-radius:24px;background:radial-gradient(circle at 0% 0%,rgba(245,199,122,.14),transparent 34%),linear-gradient(145deg,rgba(255,255,255,.085),rgba(255,255,255,.035));border:1px solid rgba(245,199,122,.18);box-shadow:0 18px 44px rgba(0,0,0,.16)}.left-oracle-reading-card{margin-top:16px}.left-reading-head{display:flex;justify-content:space-between;gap:14px;align-items:center;margin-bottom:12px}.left-reading-head span{color:#8dd9ff;letter-spacing:.14em;text-transform:uppercase;font-size:12px}.left-reading-head strong{color:#f8e4b8;font-size:22px}.left-oracle-reading-card p,.right-oracle-reading-card p{margin:10px 0 0;color:#dbe4f4;line-height:1.9;text-align:left}.left-oracle-reading-card b,.right-oracle-reading-card strong{color:#fff1c8}.right-oracle-reading-card{margin-top:0}.right-oracle-reading-card h3{text-align:center;margin-bottom:10px}.mini-advice-list{display:grid;gap:8px;margin-top:14px}.mini-advice-list h4{margin:0 0 2px;color:#f8e4b8;text-align:left;font-size:16px}.mini-advice-list span{display:block;padding:9px 11px;border-radius:14px;color:#dff6ff;background:rgba(141,217,255,.08);border:1px solid rgba(141,217,255,.14);line-height:1.6}.right-mini-list span{color:#ffe8ee;background:rgba(255,132,180,.08);border-color:rgba(255,132,180,.14)}.oracle-card{display:flex;flex-direction:column}.oracle-card .oracle-note{margin-top:16px;padding-top:0}@media(max-width:720px){.deep-grid-wide{grid-template-columns:1fr}.pretty-time-box input[type="time"]{font-size:16px;min-width:110px}.single-time .pretty-time-label{width:100%}.left-reading-head{display:grid;text-align:center}.left-oracle-reading-card p{text-align:left}}
@keyframes cosmicSlowSpin{to{transform:rotate(360deg)}}@keyframes galaxyDrift{0%{transform:translateX(-2%) rotate(-18deg);opacity:.45}100%{transform:translateX(3%) rotate(-15deg);opacity:.68}}
`}</style></main>;
}
