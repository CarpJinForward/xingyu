import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";
import { castDivination } from "./server/divinationEngine.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// --- DeepSeek 客户端 ---
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
if (!DEEPSEEK_API_KEY) {
    console.error("❌ DEEPSEEK_API_KEY 未设置，AI 功能将不可用");
}

const deepseek = DEEPSEEK_API_KEY ? new OpenAI({
    baseURL: "https://api.deepseek.com/v1",
    apiKey: DEEPSEEK_API_KEY,
}) : null;

const DEEPSEEK_MODEL = process.env.DEEPSEEK_MODEL || "deepseek-chat";

const DEEPSEEK_MODEL = process.env.DEEPSEEK_MODEL || "deepseek-chat";

const app = express();
app.use(cors());
app.use(express.json());

// --- 测试接口 ---
app.get("/api/test", async (req, res) => {
    if (!deepseek) {
        return res.json({ ok: false, message: "DeepSeek 未配置：缺少 DEEPSEEK_API_KEY" });
    }
    try {
        await deepseek.chat.completions.create({
            model: DEEPSEEK_MODEL,
            messages: [{ role: "user", content: "回复ok" }],
            max_tokens: 10,
        });
        res.json({ ok: true, message: "DeepSeek连接成功" });
    } catch (err) {
        res.json({ ok: false, message: "DeepSeek连接失败: " + err.message });
    }
});

// --- 用户问题分类接口 ---
app.post("/api/classify-question", async (req, res) => {
    if (!deepseek) {
        return res.json({
            ok: true,
            data: { mainCategory: "事业", subCategory: "一般问事", intent: "是否行动", emotion: "未识别", riskLevel: "中", keywords: [], shortUnderstanding: "AI 未配置，使用默认分类。" },
        });
    }
    try {
        const { question, sign, questionType } = req.body;

        const completion = await deepseek.chat.completions.create({
            model: DEEPSEEK_MODEL,
            messages: [
                {
                    role: "system",
                    content: `你是一个占星起卦问题分析专家。分析用户提出的问题，返回 JSON 格式的分类结果。
必须返回以下结构（不要包含其他文字，只返回 JSON）：
{
  "mainCategory": "感情|事业|财运|学业|人际|出行|合作|其他",
  "subCategory": "更具体的子类别，如'职场晋升'、'表白时机'",
  "intent": "用户的核心意图",
  "emotion": "用户当前的情绪状态",
  "riskLevel": "高|中|低",
  "keywords": ["关键词1", "关键词2"],
  "shortUnderstanding": "用一句话概括用户的真实困惑"
}`,
                },
                { role: "user", content: `问题：${question}\n星座：${sign}\n问题类型：${questionType}` },
            ],
            temperature: 0.3,
            max_tokens: 800,
        });

        const text = completion.choices[0]?.message?.content || "";
        const clean = text.replace(/```json|```/g, "").trim();
        const data = JSON.parse(clean);

        res.json({ ok: true, data });
    } catch (err) {
        console.error("classify-question 失败:", err.message);
        res.json({
            ok: true,
            data: { mainCategory: "事业", subCategory: "一般问事", intent: "是否行动", emotion: "未识别", riskLevel: "中", keywords: [], shortUnderstanding: "AI 暂未完成分析，使用默认分类。" },
        });
    }
});

// --- 卦象解读接口 ---
app.post("/api/oracle-reading", async (req, res) => {
    if (!deepseek) {
        return res.json({
            ok: true,
            data: {
                title: "AI 未配置",
                summary: "DeepSeek API 密钥未设置，请在环境变量中添加 DEEPSEEK_API_KEY。",
                situation: "暂无 AI 解读。",
                advice: "先按卦象的行动建议执行。",
                risk: "暂无",
                timing: "暂无",
                suitable: [],
                unsuitable: [],
                finalWords: "配置 API 密钥后即可获得 AI 解读。",
            },
        });
    }
    try {
        const { scene, question, zodiac, classification, oracle, relationship } = req.body;

        const systemPrompt = `你是一位精通易经与占星的解读师。根据用户的问题、星座、卦象数据和配对信息，提供有洞见的解读。

返回 JSON 格式（只返回 JSON，不要包含其他文字）：
{
  "title": "概括当前卦象的核心判断",
  "summary": "2-3句话的核心解读",
  "situation": "围绕用户的具体问题展开分析",
  "advice": "具体的行动建议",
  "risk": "风险提醒",
  "timing": "时机方面的提示",
  "suitable": ["适合做的1", "适合做的2", "适合做的3"],
  "unsuitable": ["不宜做的1", "不宜做的2", "不宜做的3"],
  "finalWords": "最后的提醒或祝福",
  "healingStory": {
    "title": "故事标题",
    "content": "故事内容"
  }
}`;

        let userPrompt = `问题：${question}\n星座：${zodiac}\n`;
        if (classification) {
            userPrompt += `问题分类：${classification.mainCategory || ""} / ${classification.subCategory || ""}\n意图：${classification.intent || ""}\n风险等级：${classification.riskLevel || ""}\n`;
        }
        if (oracle) {
            userPrompt += `本卦：${oracle.hexagram || ""}\n变卦：${oracle.changedHexagram || ""}\n动爻：${oracle.movingLines?.join(",") || "无"}\n分数：${oracle.score || ""}\n趋势：${oracle.tendency || ""}\n时辰基调：${oracle.timeTone || ""}\n`;
        }
        if (scene === "love" && relationship) {
            userPrompt += `情感配对：${relationship.firstSign || ""} 与 ${relationship.secondSign || ""}\n配对指数：${relationship.matchScore || ""}\n配对类型：${relationship.matchType || ""}\n`;
        }

        const completion = await deepseek.chat.completions.create({
            model: DEEPSEEK_MODEL,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            temperature: 0.7,
            max_tokens: 1500,
        });

        const text = completion.choices[0]?.message?.content || "";
        const clean = text.replace(/```json|```/g, "").trim();
        const data = JSON.parse(clean);

        res.json({ ok: true, data });
    } catch (err) {
        console.error("oracle-reading 失败:", err.message);
        // 返回有意义的兜底数据
        res.json({
            ok: true,
            data: {
                title: "静观其变",
                summary: "AI 解读暂未完成，以下为基于卦象的基础参考。",
                situation: "当前局势不明朗，建议先收集更多信息再做决定。",
                advice: "先按卦象的行动建议执行，等待时机更清晰。",
                risk: "不要被一时的情绪推着走，保持理性判断。",
                timing: "等待信息变清楚后再行动。",
                suitable: ["观察局势变化", "收集更多信息", "保持现有节奏"],
                unsuitable: ["冲动决策", "押上全部筹码", "忽略直觉信号"],
                finalWords: "把卦象当作整理内心的镜子，而不是唯一答案。",
            },
        });
    }
});

// --- 起卦接口 ---
app.post("/api/oracle/cast", (req, res) => {
    try {
        const { question, sign, type, time } = req.body;
        if (!sign || !type) {
            return res.status(400).json({ ok: false, error: "缺少必填字段: sign, type" });
        }
        const divination = castDivination({ question, sign, type, time });
        res.json({ ok: true, data: divination });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, error: err.message });
    }
});

// --- 静态前端 & SPA 回退 ---
app.use(express.static(path.join(__dirname, 'dist')));
app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    } else {
        next();
    }
});

// --- 启动 ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});