// audioToTextScript.js

// @input string speechToTextApiUrl
// @input string apiKey

// This function captures microphone audio (Lens Studio simulation)
// In real Spectacles hardware, use the built-in mic or VoiceML APIs if available
function captureAudioAndTranscribe() {
  // Simulate microphone capture: Lens Studio doesn't fully support raw audio capture,
  // so we'll assume you have a way to send pre-recorded audio, or trigger recording externally.

  print("Capturing audio...");

  // (Here you would integrate actual microphone capture if available)

  // For now, simulate sending a pre-recorded audio file to the Speech-to-Text API
  var audioUrl = "https://example.com/sample_audio.wav"; // URL to an audio file

  sendAudioForTranscription(audioUrl);
}

function sendAudioForTranscription(audioUrl) {
  print("Sending audio to Speech-to-Text API...");

  var request = new XMLHttpRequest();
  request.open("POST", script.speechToTextApiUrl);

  // Headers
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("Authorization", "Bearer " + script.apiKey);

  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      if (request.status === 200) {
        var response = JSON.parse(request.responseText);
        handleTranscribedText(response.text);
      } else {
        print("Speech-to-Text API Error: " + request.status);
      }
    }
  };

  var payload = {
    audio_url: audioUrl,
  };

  request.send(JSON.stringify(payload));
}

function handleTranscribedText(text) {
  print("Transcribed Text: " + text);

  // Call your AI agent here and pass the transcribed text
  if (global.sendToTherapistAI) {
    global.sendToTherapistAI(text);
  }
}

// Listen for a trigger to start capture (bind to tap, button, or auto-start)
var tapEvent = script.createEvent("TapEvent");
tapEvent.bind(function (eventData) {
  captureAudioAndTranscribe();
});

// You can also expose capture function globally if you want to call from other scripts
global.captureTherapistAudio = captureAudioAndTranscribe;
