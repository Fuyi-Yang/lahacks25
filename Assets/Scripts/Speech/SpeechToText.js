// @input Component.Text textInput


// Remote service module for fetching data
var voiceMLModule = require("LensStudio:VoiceMLModule");

script.createEvent("OnStartEvent").bind(() => {
    let options = VoiceML.ListeningOptions.create();
    options.shouldReturnAsrTranscription = true;
    options.shouldReturnInterimAsrTranscription = true;

    voiceMLModule.onListeningUpdate.add(onListenUpdate);
    
    voiceMLModule.startListening(options);
    script.textInput.text = "Listening...";

    /*
    voiceMLModule.onListeningEnabled.add(() => {
        
    });
    */
});

function onListenUpdate(eventData) {
    if (eventData.transcription) { // Check if we have a transcription
        if (eventData.isFinalTranscription) {
            // Final recognized speech
            script.textInput.text = eventData.transcription;
        } else {
            // Optional: show live transcription updates
            script.textInput.text = eventData.transcription + " (listening...)";
        }
    }
    else {
        script.textInput.text = "Hello World";
    }
}