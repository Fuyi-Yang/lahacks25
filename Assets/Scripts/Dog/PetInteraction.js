// @input SceneObject interactableButton1
// @input SceneObject interactableButton2
// @input SceneObject interactableButton3
// @input SceneObject prefabA
// @input SceneObject prefabB
// @input SceneObject prefabC
// @input SceneObject prefabD
// @input float switchBackDelay = 8.0

var currentPrefab = script.prefabA;

// Enable the initial prefab
script.prefabA.enabled = true;
script.prefabB.enabled = false;
script.prefabC.enabled = false;
script.prefabD.enabled = false;

// Setup buttons using SIK
setupButtonSIK(script.interactableButton1, () => switchPrefab(script.prefabB));
setupButtonSIK(script.interactableButton2, () => switchPrefab(script.prefabC));
setupButtonSIK(script.interactableButton3, () => switchPrefab(script.prefabD));

function setupButtonSIK(buttonObj, callback) {

    const SIK = require("SpectaclesInteractionKit/SIK").SIK;
    const interactionManager = SIK.InteractionManager;
    const interactable = interactionManager.getInteractableBySceneObject(
        buttonObj
    );

    if (!buttonObj) {
        print(
        "Warning: Please assign a SceneObject with an Interactable component in the inspector"
        );
        return;
    }

    if (interactable) {
        interactable.onInteractorTriggerEnd(callback);
    } else {
        print("⚡ Could not find Interactable on " + buttonObj.name +
              ". Make sure the Interactable script is on that SceneObject (or its child).");
    }
}



function switchPrefab(newPrefab) {
    if (currentPrefab) { currentPrefab.enabled = false; }
    currentPrefab = newPrefab;
    currentPrefab.enabled = true;

    // create​-​once timer to revert after delay
    var delayed = script.createEvent("DelayedCallbackEvent");   // ➜ returns event object :contentReference[oaicite:1]{index=1}
    delayed.bind(revertToPrefabA);                              // ➜ returns void (don’t chain) :contentReference[oaicite:2]{index=2}
    delayed.reset(script.switchBackDelay);  
}

function revertToPrefabA() {
    if (currentPrefab !== script.prefabA) {
        currentPrefab.enabled = false;
        script.prefabA.enabled = true;
        currentPrefab = script.prefabA;
    }
}