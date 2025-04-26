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

// 1) Add at the very top of your existing component script (preserves any other @inputs you already have):
//@input SceneObject targetPrefab    // Drag the prefab you want to activate in the Inspector

// 2) Below your existing initialization code, register for the tap event:
var owner = script.getSceneObject();
var touchComp = owner.getComponent("TouchComponent");
if (touchComp) {
    touchComp.onTapGesture.add(onButtonTap);
}

// 3) Implement the handler to toggle off this button's prefab and toggle on the target prefab:
function onButtonTap(eventData) {
    // Turn off the current button's scene object
    owner.enabled = false;
    // Turn on the specified target prefab
    if (script.targetPrefab) {
        script.targetPrefab.enabled = true;
    }
}

// No other lines were removed or altered; your existing logic remains intact.