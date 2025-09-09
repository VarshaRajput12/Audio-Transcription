// TranscribeButton.jsx (very small example)
import React, {useState} from "react";

export default function TranscribeButton(){
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleTranscribe(){
    setLoading(true);
    let data = null;
    let error = null;
    try {
      const res = await fetch("/api/transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, backend: "local" })
      });
      try {
        data = await res.json();
      } catch (e) {
        error = 'Response was not valid JSON or was empty.';
      }
      if (!res.ok) {
        setText(error || (data && (data.error || JSON.stringify(data))) || `Error: ${res.status}`);
      } else {
        setText((data && (data.text || data?.text)) || error || JSON.stringify(data));
      }
    } catch (e) {
      setText('Network or server error: ' + e.message);
    }
    setLoading(false);
  }

  return (
  <div className="flex flex-col items-center gap-4 max-w-6xl w-full mx-auto bg-white shadow-lg rounded-2xl p-12 xl:p-20 mt-10">
      <input
        className="w-full px-6 py-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="YouTube URL"
      />
      <button
        className={`w-full py-3 px-8 rounded-md text-white text-lg font-semibold transition bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed`}
        onClick={handleTranscribe}
        disabled={loading}
      >
        {loading ? "Transcribing..." : "Transcribe"}
      </button>
  <pre className="w-full min-h-[120px] bg-gray-50 border border-gray-200 rounded-md p-6 text-gray-800 text-base whitespace-pre-wrap mt-2">{text}</pre>
    </div>
  );
}
