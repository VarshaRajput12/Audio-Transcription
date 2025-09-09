import os
import subprocess
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from yt_dlp import YoutubeDL

app = FastAPI()

# Ensure uploads directory exists
UPLOADS_DIR = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOADS_DIR, exist_ok=True)
from fastapi.responses import JSONResponse

class TranscribeRequest(BaseModel):
    url: str
    backend: str = "local" 

@app.post("/api/transcribe")
async def api_transcribe(req: TranscribeRequest):
    print("Received request:", req)
    try:
        # Download audio
        audio_path = download_audio(req.url, UPLOADS_DIR)
        # Convert to wav
        wav_path = os.path.splitext(audio_path)[0] + ".wav"
        to_wav_16k_mono(audio_path, wav_path)
        # Transcribe
        if req.backend == "local":
            result = transcribe_local(wav_path)
            print("Transcription result:", result)  # Log full result to backend terminal
            return {"text": result.get("text", ""), "segments": result.get("segments", [])}
        else:
            return JSONResponse(status_code=400, content={"error": "Invalid backend"})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})


def download_audio(youtube_url: str, dest_dir: str) -> str:
    opts = {
        "format": "bestaudio/best",
        "outtmpl": os.path.join(dest_dir, "%(id)s.%(ext)s"),
        "quiet": True,
        "no_warnings": True,
    }
    with YoutubeDL(opts) as ydl:
        info = ydl.extract_info(youtube_url, download=True)
        # downloaded filename (ext from info)
        downloaded = os.path.join(dest_dir, f"{info['id']}.{info.get('ext','m4a')}")
        if not os.path.exists(downloaded):
            # sometimes ydl changes extension in postprocessing, try to find file
            for f in os.listdir(dest_dir):
                if f.startswith(info['id']):
                    return os.path.join(dest_dir, f)
        return downloaded

def to_wav_16k_mono(in_path: str, out_path: str):
    # Convert + resample to 16k mono WAV
    cmd = [
        "ffmpeg", "-y", "-i", in_path,
        "-ac", "1", "-ar", "16000",
        "-vn", out_path
    ]
    subprocess.check_call(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return out_path

# ---- Local Whisper transcription ----
def transcribe_local(wav_path: str, model_name: str = "small"):
    import whisper
    model = whisper.load_model(model_name)
    # return full result: text, segments, etc.
    result = model.transcribe(wav_path)
    return result
