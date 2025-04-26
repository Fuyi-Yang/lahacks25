////@input SceneObject bubbleStanding
////@input SceneObject bubbleSitting
////@input SceneObject therapistStanding
////@input SceneObject therapistSitting
//
//// Called when Standing bubble is touched
//function onStandingSelected() {
//  script.bubbleStanding.enabled = false;
//  script.bubbleSitting.enabled = false;
//
//  script.therapistStanding.enabled = true;
//  script.therapistSitting.enabled = false;
//}
//
//// Called when Sitting bubble is touched
//function onSittingSelected() {
//  script.bubbleStanding.enabled = false;
//  script.bubbleSitting.enabled = false;
//
//  script.therapistStanding.enabled = false;
//  script.therapistSitting.enabled = true;
//}
//
//// Bind touch events
//function setupTouchEvents() {
//  var standingTouch = script.bubbleStanding.getComponent("TouchComponent");
//  var sittingTouch = script.bubbleSitting.getComponent("TouchComponent");
//
//  if (standingTouch) {
//    standingTouch.onTouchStart.add(onStandingSelected);
//  }
//  if (sittingTouch) {
//    sittingTouch.onTouchStart.add(onSittingSelected);
//  }
//}
//
//setupTouchEvents();
//

// bubbleTouchHandler.js
// This handler listens for taps and routes them based on the buttonIndex set above.

//== Handler Input ==
//@input int buttonIndex   // auto‐assigned by Intro controller

script.createEvent("TapEvent").bind(onTap);

function onTap(eventData) {
    print("Bubble button " + script.buttonIndex + " tapped.");
    if (script.buttonIndex === 0) {
        // TODO: First button action
    } else if (script.buttonIndex === 1) {
        // TODO: Second button action
    }
}