# Audio Transcription Project - Setup & Run Instructions

## Prerequisites

- Python 3.8 or newer
- Node.js (v18+ recommended) and npm
- ffmpeg (must be installed and available in PATH)

## 1. Clone the Repository

```
git clone https://github.com/VarshaRajput12/Audio-Transcription.git
cd Audio-Transcription
```

## 2. Backend Setup (FastAPI + Whisper)

```
# Create and activate virtual environment (Windows)
python -m venv .venv
.\.venv\Scripts\activate

# Install backend dependencies
pip install fastapi uvicorn yt-dlp openai-whisper

# (Optional) If you need multipart/form support:
pip install python-multipart

# Start the backend server
cd server
uvicorn server:app --reload
# The backend will run at http://127.0.0.1:8000
```

## 3. Frontend Setup (Vite + React)

```
cd ../video-analyzer
npm install
npm run dev
# The frontend will run at http://localhost:5173
```

## 4. Usage

- Open http://localhost:5173 in your browser.
- Paste a YouTube URL and click "Transcribe".
- The backend will download, process, and transcribe the audio using Whisper.

## 5. Notes

- Make sure both backend and frontend servers are running.
- If you want to use the OpenAI backend, set your `OPENAI_API_KEY` and update the backend code.
- For local Whisper, no API key is needed.
- If you encounter errors about missing modules, activate your virtual environment and install the required packages.

---
**Enjoy transcribing audio from YouTube!**
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
