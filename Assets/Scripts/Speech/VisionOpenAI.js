// @input Component.Text textInput
// @input Component.Text textOutput
// @input Component.Image image
// @input Component.Script ttsComponent {"hint":"Attach the TextToSpeechOpenAI Component"}
// @input SceneObject interactableObject {"hint":"Drag the SceneObject that has the Interactable component"}

const apiKey =
  "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";

// Remote service module for fetching data
var remoteServiceModule = require("LensStudio:RemoteServiceModule");
var isListening = false;
var isProcessing = false;
let conversation_history = [];

script.createEvent("OnStartEvent").bind(() => {
  onStart();
});

function onStart() {
  // Initialize SIK
  const SIK = require("SpectaclesInteractionKit/SIK").SIK;
  const interactionManager = SIK.InteractionManager;

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

  if (!interactable) {
    print(
      "Warning: Could not find Interactable component on the referenced SceneObject"
    );
    return;
  }

  // Define the callback for trigger end event
  const onTriggerEndCallback = (event) => {
    if (isListening) {
      handleTriggerEnd(event);
      print("Vision, start listening");
      isListening = false;
    } else {
      isListening = true;
      print("Vision, end listening");
    }
    print(
      `Interaction triggered by: ${event.interactor.inputType} at position: ${event.interactor.targetHitInfo.hit.position}`
    );
  };

  // Bind the callback to the trigger end event
  interactable.onInteractorTriggerEnd(onTriggerEndCallback);
}

async function handleTriggerEnd(eventData) {
  if (isProcessing) {
    print("A request is already in progress. Please wait.");
    return;
  }

  if (!script.textInput.text || !script.image || !apiKey) {
    print("Text, Image, or API key input is missing");
    return;
  }

  try {
    isProcessing = true;

    // Access the texture from the image component
    const texture = script.image.mainPass.baseTex;
    if (!texture) {
      print("Texture not found in the image component.");
      return;
    }

    const base64Image = await encodeTextureToBase64(texture);
    
    let input_text = script.textInput.text;
    script.textInput.text = "Input";
    let url = "https://35a9-164-67-70-232.ngrok-free.app";
    const agent_request = new Request(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"history": conversation_history, "message": input_text})
    });
            
    let agent_response = await remoteServiceModule.fetch(agent_request);
    let agentData = "";
    if (agent_response.status == 200)
    {
        print("step 0");
        agentData = await agent_response.json();
        agentData = agentData['result']['output'];
        /*
        let new_agent_conversation = {"input": input_text, "output": agentData};
        conversation_history.push(new_agent_conversation);
        if (conversation_history.length > 5)
        {
            conversation_history.shift();
        }
        */
    }
    else {
        print("Failure: agent response not successful");
        return;
    }
    

    const requestPayload = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI therapist that works for Snapchat that has access to the view that the user is looking at using Augmented Reality Glasses." +
            " The user is under their anxiety and need some accompaniments and therapy session with the following image and text. Keep it short like under 30 words. Be funny and healing, try to foward the conversation and make the user feel relieved and cozy! And remember to encourage the user to speak up! about their story or experience",
        },
        {
          role: "user",
          content: [
            { type: "text", text: input_text },
            { type: "text", text: "Professional advice: " + agentData },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
    };

    const request = new Request("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestPayload),
    });

    let response = await remoteServiceModule.fetch(request);
    if (response.status === 200) {
      // get text + image response
      print("step 1");
      let responseData = await response.json();
      script.textOutput.text = responseData.choices[0].message.content;
      print(responseData.choices[0].message.content);
      print("step 2");
      // Call TTS to generate and play speech from the response
      if (script.ttsComponent) {
        script.ttsComponent.api.generateAndPlaySpeech(
          responseData.choices[0].message.content
        );
        print("step 3");
      }
    } else {
      print("Failure: response not successful");
    }
  } catch (error) {
    print("step 4 error");
    print("Error: " + error);
  } finally {
    isProcessing = false;
  }
}

function encodeTextureToBase64(texture) {
  return new Promise((resolve, reject) => {
    Base64.encodeTextureAsync(
      texture,
      resolve,
      reject,
      CompressionQuality.LowQuality,
      EncodingType.Jpg
    );
  });
}
