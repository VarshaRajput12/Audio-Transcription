async function uploadAudio(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:5000/transcribe', {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Transcription failed');
    }
    console.log('Transcribed text:', data.text);
    return data.text;
}