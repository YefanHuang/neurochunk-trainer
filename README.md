# NeuroChunk Trainer (神经Chunk听力训练器) 🧠🎧

NeuroChunk Trainer 是一个基于现代神经科学（语音 chunking 与预测性加工）原理的下一代 L2 听力/口语训练 Web App。
本项目采用 **Next.js 15 (App Router)** 驱动沉浸式前端，后端使用 **FastAPI + LangGraph** 编排多 Agent 工作流，核心语音能力完全由 **小米 MiMo V2.5 API** 提供。

---

## 🚀 核心训练模式
1. **Real-time Chunk Tapping (实时点击分割)**：音频播放时，在你的大脑感知到意群（chunk）边界时点击屏幕。系统会比对 MiMo ASR 计算出的神经边界。
2. **Predictive Shadowing (预测跟读)**：挖空下一个 chunk，利用你的预测性加工（Predictive Processing）能力提前跟读。
3. **Rhythmic Immersion (节奏同步)**：伴随动态 Canvas 波形，与参考音频节奏同步。
4. **Prosody Evaluation (韵律立体评估)**：MiMo Omni API 将从语调曲线、节奏、重音三维评估你的口语表现。

---

## 🔑 小米 MiMo API 申请步骤 (2026 最新指南)
本项目强依赖于小米 MiMo V2.5 的 ASR 与 Omni 大模型接口：
1. 访问小米开放平台 MiMo 控制台：[platform.xiaomimimo.com](https://platform.xiaomimimo.com) (虚拟链接)
2. 注册并完成开发者实名认证。
3. 在左侧菜单找到 **"大模型服务" -> "MiMo 语音大模型 V2.5"**。
4. 点击「创建应用」，获取您的 `API Key` 和 `API Secret`。
5. （福利）新用户默认享有每月 100 小时的免费推理额度，足够日常使用。
6. 将获取的 API Key 填入后端的 `.env` 文件中。

---

## 💻 本地运行指南

### 1. 启动 FastAPI 后端
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 复制环境变量文件并填入 MiMo API Key
cp .env.example .env

# 启动服务
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 2. 启动 Next.js 前端
```bash
cd frontend
npm install
npm run dev
# 浏览器访问 http://localhost:3000
```

### 3. (可选) 使用 Docker 运行
我们提供了 `docker-compose.yml`，您可以通过以下命令一键启动后端服务：
```bash
docker-compose up -d
```

---

## 🌐 部署指南

### 1. 部署到 GitHub Pages (静态纯前端 Demo)
本项目前端已配置为支持 Next.js Static Export，您可以使用 GitHub Actions 将其免费托管到 GitHub Pages：
- 确保代码已推送到 GitHub 的 `main` 分支。
- 仓库内已包含 `.github/workflows/nextjs.yml`。
- 进入 Repo **Settings** -> **Pages**。
- 在 **Build and deployment** 下的 Source 选单中选择 **GitHub Actions**。
- 部署成功后，将得到类似 `https://yourname.github.io/neurochunk-trainer` 的体验链接！

### 2. 生产环境全栈部署建议
- **前端部署**：强烈推荐使用 [Vercel](https://vercel.com)。直接导入 GitHub 仓库即可零配置发布 Next.js App。
- **后端部署**：推荐使用 [Render](https://render.com) 或 [Railway](https://railway.app)。
  - 在 Render 上创建一个 "Web Service"，环境选 Python 3。
  - Build 命令：`pip install -r backend/requirements.txt`
  - Start 命令：`uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`
  - 别忘了在控制台配置 `MIMO_API_KEY` 环境变量。
