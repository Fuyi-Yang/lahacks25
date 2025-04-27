// @input Component.Text textInput
// @input Component.Button recordButton

var voiceMLModule = require("LensStudio:VoiceMLModule");

// Keep track of whether we are currently listening
var isListening = false;

// Save options globally
var options = VoiceML.ListeningOptions.create();
options.shouldReturnAsrTranscription = true;
options.shouldReturnInterimAsrTranscription = true;

// Hook up button click
script.recordButton.api.addOnClick(startOrStopListening);

// Handle live transcription updates
voiceMLModule.onListeningUpdate.add(onListenUpdate);

// Function: Toggle listening
function startOrStopListening() {
  if (!isListening) {
    // Start listening
    voiceMLModule.startListening(options);
    script.textInput.text = "Listening...";
    isListening = true;
  } else {
    // Stop listening
    voiceMLModule.stopListening();
    script.textInput.text += " (finished)";
    isListening = false;
  }
}

// Function: Handle updates from VoiceML
function onListenUpdate(eventData) {
  if (eventData.transcription) {
    if (eventData.isFinalTranscription) {
      // Final text
      script.textInput.text = eventData.transcription;
    } else {
      // Live updating text
      script.textInput.text = eventData.transcription + " (listening...)";
    }
  } else {
    script.textInput.text = "Hello World";
  }
}
