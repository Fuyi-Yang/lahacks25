//@input SceneObject bubbleStanding
//@input SceneObject bubbleSitting
//@input SceneObject therapistStanding
//@input SceneObject therapistSitting

// Called when Standing bubble is touched
function onStandingSelected() {
  script.bubbleStanding.enabled = false;
  script.bubbleSitting.enabled = false;

  script.therapistStanding.enabled = true;
  script.therapistSitting.enabled = false;
}

// Called when Sitting bubble is touched
function onSittingSelected() {
  script.bubbleStanding.enabled = false;
  script.bubbleSitting.enabled = false;

  script.therapistStanding.enabled = false;
  script.therapistSitting.enabled = true;
}

// Bind touch events
function setupTouchEvents() {
  var standingTouch = script.bubbleStanding.getComponent("TouchComponent");
  var sittingTouch = script.bubbleSitting.getComponent("TouchComponent");

  if (standingTouch) {
    standingTouch.onTouchStart.add(onStandingSelected);
  }
  if (sittingTouch) {
    sittingTouch.onTouchStart.add(onSittingSelected);
  }
}

setupTouchEvents();
