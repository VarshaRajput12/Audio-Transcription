import { useState } from "react";

export default function App() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Please select an audio file");
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    const res = await fetch("http://localhost:5000/transcribe", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setText(data.text || data.error);
    setLoading(false);
  };

  return (
      <div className="w-full max-w-4xl mx-auto mt-24 p-8 bg-white rounded-xl shadow flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-800 text-center">Whisper Transcription</h1>
        <input
          className="mb-4 w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-base file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 file:cursor-pointer"
          type="file"
          accept="audio/*"
          onChange={handleFile}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded mb-4 disabled:bg-blue-300 disabled:cursor-not-allowed"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Transcribing..." : "Upload & Transcribe"}
        </button>
        <pre className="w-full min-h-[180px] bg-gray-50 rounded p-4 text-gray-900 text-base mt-2 whitespace-pre-wrap overflow-auto border">
          {text}
        </pre>
      </div>
  );
}
