// @input SceneObject therapistModel
// @input Component.AnimationMixer therapistAnimationMixer
// @input string idleAnimationName = "Idle"
// @input string talkingAnimationName = "Talking"

// Store whether the therapist is currently talking
var isTalking = false;

// Make the therapist face the camera every frame
function updateFacing() {
  var camera = global.scene.getCamera();
  if (!camera) {
    print("No camera found");
    return;
  }

  var cameraPosition = camera.getTransform().getWorldPosition();
  var therapistTransform = script.therapistModel.getTransform();

  therapistTransform.lookAt(cameraPosition);
}

// Play idle animation when not talking
function playIdleAnimation() {
  if (script.therapistAnimationMixer && script.idleAnimationName.length > 0) {
    script.therapistAnimationMixer.start(script.idleAnimationName, 0, -1);
  }
}

// Play talking animation
function playTalkingAnimation() {
  if (
    script.therapistAnimationMixer &&
    script.talkingAnimationName.length > 0
  ) {
    script.therapistAnimationMixer.start(script.talkingAnimationName, 0, -1);
  }
}

// Call this function when AI responds and therapist should "talk"
function startTalking() {
  isTalking = true;
  playTalkingAnimation();

  // After a few seconds, stop talking and go back to idle
  script
    .createEvent("DelayedCallbackEvent")
    .bind(function (eventData) {
      isTalking = false;
      playIdleAnimation();
    })
    .reset(3.0); // Talk for 3 seconds (adjust timing as needed)
}

// Bind the update event to make the therapist always face the camera
script.createEvent("UpdateEvent").bind(function (eventData) {
  updateFacing();
});

// Start in idle animation when scene starts
playIdleAnimation();

// Optionally expose startTalking() to be called externally
global.startTherapistTalking = startTalking;
