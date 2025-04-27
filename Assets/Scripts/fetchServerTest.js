// @input SceneObject interactableObject {"hint":"Drag the SceneObject that has the Interactable component"}

// Remote service module for fetching data
var remoteServiceModule = require("LensStudio:RemoteServiceModule");

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
    handleTriggerEnd(event);
    print(
      `Interaction triggered by: ${event.interactor.inputType} at position: ${event.interactor.targetHitInfo.hit.position}`
    );
  };

  // Bind the callback to the trigger end event
  interactable.onInteractorTriggerEnd(onTriggerEndCallback);
}

async function handleTriggerEnd(eventData) {
    print("wooo");
    let url = "https://a2be-164-67-70-232.ngrok-free.app/greet";
    let request = new Request(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "user": {
                "name": "Alice",
                "career": "Developer"
            }
        })
    });
    

    await remoteServiceModule.fetch(request)
        .then((response) => response.json())
        .then((data) => {
            print(data['message']);
            print(data.json['message']);
    });
    
    
    
    let contentTypeHeader = response.headers.get('content-type');
    if (!contentTypeHeader.includes('application/json')) {
      print('Failure: wrong content type in response');
      return;
    }
    
    let responseJson = await response.json();
    let username = responseJson.json['user']['name'];
    let career = responseJson.json['user']['career'];
}


