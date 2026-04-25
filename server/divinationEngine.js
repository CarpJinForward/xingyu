// ============================================================
// 星卦问事 · 起卦算法引擎
// 从 src/App.jsx 提取，保持与前端一致的卦象生成逻辑
// ============================================================

// ---- 星座原始数据 ----
export const zodiacs = [
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

// ---- 星座数据字典 ----
export const zodiacData = Object.fromEntries(
  zodiacs.map(([name, symbol, date, element, mode, ruler, keyword, color, lucky, personality, love, career, story]) => [
    name,
    {
      name, symbol, date, element, mode, ruler, keyword, color, lucky,
      traits: [keyword, element, mode, ruler],
      people: `适合重视${keyword}，并希望通过自我理解提升关系和生活质量的人群。`,
      personality, love, career,
      fortune: `近期围绕"${keyword}"展开，适合把注意力放在真正重要的人和事上。`,
      story,
      cosmic: `${name}属于${element}与${mode}星座，在黄道十二宫中承载着"${keyword}"的象征意义。`,
      meaning: `${name}提醒你：所谓命运不是固定答案，而是理解自己之后做出更清醒的选择。`,
    },
  ])
);

// ---- 八卦数据 ----
export const trigrams = [
  { name: "乾", nature: "天", element: "金", symbol: "☰", bits: [1, 1, 1] },
  { name: "兑", nature: "泽", element: "金", symbol: "☱", bits: [1, 1, 0] },
  { name: "离", nature: "火", element: "火", symbol: "☲", bits: [1, 0, 1] },
  { name: "震", nature: "雷", element: "木", symbol: "☳", bits: [1, 0, 0] },
  { name: "巽", nature: "风", element: "木", symbol: "☴", bits: [0, 1, 1] },
  { name: "坎", nature: "水", element: "水", symbol: "☵", bits: [0, 1, 0] },
  { name: "艮", nature: "山", element: "土", symbol: "☶", bits: [0, 0, 1] },
  { name: "坤", nature: "地", element: "土", symbol: "☷", bits: [0, 0, 0] },
];

// ---- 六十四卦名称表 ----
export const hexagramNames = [
  ["乾为天", "泽天夬", "火天大有", "雷天大壮", "风天小畜", "水天需", "山天大畜", "地天泰"],
  ["天泽履", "兑为泽", "火泽睽", "雷泽归妹", "风泽中孚", "水泽节", "山泽损", "地泽临"],
  ["天火同人", "泽火革", "离为火", "雷火丰", "风火家人", "水火既济", "山火贲", "地火明夷"],
  ["天雷无妄", "泽雷随", "火雷噬嗑", "震为雷", "风雷益", "水雷屯", "山雷颐", "地雷复"],
  ["天风姤", "泽风大过", "火风鼎", "雷风恒", "巽为风", "水风井", "山风蛊", "地风升"],
  ["天水讼", "泽水困", "火水未济", "雷水解", "风水涣", "坎为水", "山水蒙", "地水师"],
  ["天山遁", "泽山咸", "火山旅", "雷山小过", "风山渐", "水山蹇", "艮为山", "地山谦"],
  ["天地否", "泽地萃", "火地晋", "雷地豫", "风地观", "水地比", "山地剥", "坤为地"],
];

// ---- 工具函数 ----

export function seedIndex(seed, length) {
  let n = 0;
  for (let i = 0; i < seed.length; i++)
    n = (n * 31 + seed.charCodeAt(i)) % 1000003;
  return n % length;
}

export function parseSeconds(timeText) {
  const [h = 0, m = 0, s = 0] = timeText.split(":").map(Number);
  return Math.max(0, Math.min(86399, h * 3600 + m * 60 + s));
}

export function trigramIndexFromBits(bits) {
  return trigrams.findIndex((t) => t.bits.join("") === bits.join(""));
}

// ---- 核心起卦函数 ----

export function castDivination({ question, sign, type, time }) {
  const z = zodiacData[sign];
  if (!z) throw new Error(`未知星座: ${sign}`);
  const seconds = parseSeconds(time);
  const baseSeed = `${seconds}|${question}|${sign}|${type}`;

  // 生成六爻数值：6老阴 / 7少阳 / 8少阴 / 9老阳
  const values = Array.from({ length: 6 }).map((_, i) => {
    const n = seedIndex(baseSeed + "|yao|" + i, 100);
    if (n < 14) return 6;
    if (n < 50) return 7;
    if (n < 86) return 8;
    return 9;
  });

  const bits = values.map((v) => (v === 7 || v === 9 ? 1 : 0));
  const changing = values
    .map((v, i) => (v === 6 || v === 9 ? i + 1 : null))
    .filter(Boolean);

  // 变卦：动爻阴阳翻转
  const changedBits = bits.map((bit, i) =>
    values[i] === 6 || values[i] === 9 ? 1 - bit : bit
  );

  const lowerIndex = trigramIndexFromBits(bits.slice(0, 3));
  const upperIndex = trigramIndexFromBits(bits.slice(3, 6));
  const changedLower = trigramIndexFromBits(changedBits.slice(0, 3));
  const changedUpper = trigramIndexFromBits(changedBits.slice(3, 6));

  const lower = trigrams[lowerIndex] || trigrams[0];
  const upper = trigrams[upperIndex] || trigrams[0];
  const changedLowerTri = trigrams[changedLower] || lower;
  const changedUpperTri = trigrams[changedUpper] || upper;

  const hexName =
    hexagramNames[upperIndex]?.[lowerIndex] || `${upper.name}${lower.name}卦`;
  const changedName = changing.length
    ? hexagramNames[changedUpper]?.[changedLower] ||
      `${changedUpperTri.name}${changedLowerTri.name}卦`
    : "无变卦";

  // 时辰基调
  const hourBand = Math.floor(seconds / 7200);
  const timeTone = [
    "子夜潜机", "黎明萌动", "上午生发", "午间炽盛", "傍晚收束", "夜间沉潜",
  ][Math.min(5, hourBand)];

  // 分数计算
  const baseScore = 48 + seedIndex(baseSeed + "score", 36);
  const changePenalty =
    changing.length >= 4 ? -8
    : changing.length === 0 ? 5
    : changing.length <= 2 ? 4
    : -2;

  const starBonus =
    z.element === "火象" && upper.element === "火" ? 5
    : z.element === "水象" && upper.element === "水" ? 5
    : z.element === "土象" && lower.element === "土" ? 5
    : z.element === "风象" && (upper.name === "巽" || lower.name === "巽") ? 5
    : 0;

  const score = Math.max(18, Math.min(96, baseScore + changePenalty + starBonus));

  const tendency =
    score >= 78 ? "大吉偏向"
    : score >= 64 ? "小吉可行"
    : score >= 48 ? "中性观望"
    : score >= 34 ? "谨慎偏凶"
    : "暂缓为宜";

  const should =
    score >= 64
      ? "可以做，但要把节奏控制住。"
      : score >= 48
        ? "可以先试探，不建议立刻押上全部筹码。"
        : "暂时不建议直接做，先收集信息或等待更合适的时机。";

  const action =
    type === "感情"
      ? "先看回应，再决定投入深度。"
      : type === "事业"
        ? "先做小规模验证，再扩大行动。"
        : type === "财运"
          ? "先保守评估成本，不要冲动加码。"
          : type === "学业"
            ? "先定计划，再用连续三天执行验证状态。"
            : type === "出行"
              ? "先检查时间、天气、预算和备选路线。"
              : "先把问题拆小，用一步行动验证局势。";

  return {
    time,
    seconds,
    values,
    bits,
    changing,
    lower,
    upper,
    changedLowerTri,
    changedUpperTri,
    hexName,
    changedName,
    timeTone,
    score,
    tendency,
    should,
    action,
    question: question || "未填写具体问题",
    sign,
    type,
  };
}
