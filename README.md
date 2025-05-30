# Should I Post That?

🤖 A real-time AI-powered tool that analyzes the sentiment and toxicity of your social media posts before you share them.

## 🚀 Demo

Paste a post, click **Analyze**, and get instant feedback:
- Sentiment: positive / neutral / negative
- Toxicity: low / high
- Recommendation: post or rethink

![screenshot](./screenshot.png)

## 🛠️ Built With

- **Frontend:** Next.js (React), TailwindCSS
- **Backend:** Flask (Python)
- **NLP:** TextBlob for sentiment, custom logic for toxicity
- **Tools:** VS Code, GitHub, localhost testing

## 🧠 Why I Made This

I wanted to build an AI tool that reflects my values: **ethical tech**, **practical UX**, and **AI with a purpose**. SIPT is designed to promote thoughtfulness online, especially in emotionally charged spaces. I built it from scratch as a solo developer—including frontend, backend, and ML logic.

## 📚 What I Learned

- Full-stack integration from frontend to Python API
- NLP basics and serving AI with Flask
- Real-world UX practices (loading states, feedback)
- Debugging and deployment readiness

## ✅ Future Features

- Replace TextBlob with Hugging Face transformer models
- Toxicity detection using Detoxify or `unitary/toxic-bert`
- User history and export features
- Mobile optimization and accessibility polish

## 📦 To Run Locally

```bash
# Backend
cd backend
python -m venv env
env\Scripts\activate
pip install flask flask-cors textblob
python -m textblob.download_corpora
python app.py

# Frontend
cd frontend
npm install
npm run dev
