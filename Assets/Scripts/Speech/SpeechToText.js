// @input Component.Text textInput
// @input SceneObject interactableObject {"hint":"Drag the SceneObject that has the Interactable component"}

// Remote service module for fetching data
var voiceMLModule = require("LensStudio:VoiceMLModule");
var isListening = false;
var cachedText = "";

script.createEvent("OnStartEvent").bind(() => {
  const SIK = require("SpectaclesInteractionKit/SIK").SIK;
  const interactionManager = SIK.InteractionManager;
  let options = VoiceML.ListeningOptions.create();
  options.shouldReturnAsrTranscription = true;
  options.shouldReturnInterimAsrTranscription = true;

  if (!script.interactableObject) {
    print(
      "Warning: Please assign a SceneObject with an Interactable component in the inspector"
    );
    return;
  }

  // Get the Interactable from the referenced SceneObject
  const interactable = interactionManager.getInteractableBySceneObject(
    script.interactableObject
  );
  voiceMLModule.onListeningUpdate.add(onListenUpdate);
  const startOrStopListening = (event) => {
    if (!isListening) {
      // Start listening
      voiceMLModule.startListening(options);
      script.textInput.text = "Listening...";
      cachedText = ""; // clear any previous text
      isListening = true;
      print("speech, start listening");
    } else {
      // Stop listening
      voiceMLModule.stopListening();
      script.textInput.text = cachedText + " (finished)";
      isListening = false;

      // Optional: clear cache after displaying
      // cachedText = "";
    }
  };

  if (!interactable) {
    print(
      "Warning: Could not find Interactable component on the referenced SceneObject"
    );
    return;
  }

  interactable.onInteractorTriggerEnd(startOrStopListening);

  /*
    voiceMLModule.onListeningEnabled.add(() => {
        
    });
    */
});

function onListenUpdate(eventData) {
  if (!eventData.transcription) {
    return;
  }

  if (eventData.isFinalTranscription) {
    cachedText += eventData.transcription + " ";
  } else {
    cachedText += eventData.transcription + " ";
  }

  if (isListening) {
    // While still recording, optionally show live updates
    script.textInput.text = cachedText;
  }
}

//   if (eventData.transcription) {
//     // Check if we have a transcription
//     if (eventData.isFinalTranscription) {
//       // Final recognized speech
//       script.textInput.text = eventData.transcription;
//     } else {
//       // Optional: show live transcription updates
//       script.textInput.text = eventData.transcription + " (listening...)";
//     }
//   } else {
//     script.textInput.text = "Hello World";
//   }
