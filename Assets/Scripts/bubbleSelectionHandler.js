// Lens Studio Starter Project - Virtual Therapist Opening Scene (Button Version)
// ---------------------------------------------------------------
// This template sets up:
// - Two UI Buttons (Standing / Sitting)
// - Tap one button to select therapist pose
// - Therapist character spawns after selection

// Folder Structure you should set:
// /Resources
//   /Scripts
//     - buttonSelectionHandler.js
//   /Models
//     - therapist_standing.fbx
//     - therapist_sitting.fbx
// /Objects
//   - StandingButton (ScreenImage or UIButton)
//   - SittingButton (ScreenImage or UIButton)
//   - TherapistStanding (SceneObject, disabled)
//   - TherapistSitting (SceneObject, disabled)
//   - Manager (SceneObject with script attached)

//---------------------------------------------------------------
// buttonSelectionHandler.js
//---------------------------------------------------------------

//@input Component.ScriptComponent standingButtonScript
//@input Component.ScriptComponent sittingButtonScript
//@input SceneObject therapistStanding
//@input SceneObject therapistSitting

var isSelected = false;

function onStandingSelected() {
  if (isSelected) return;
  script.standingButtonScript.getSceneObject().enabled = false;
  script.sittingButtonScript.getSceneObject().enabled = false;

  script.therapistStanding.enabled = true;
  script.therapistSitting.enabled = false;
  isSelected = true;
}

function onSittingSelected() {
  if (isSelected) return;
  script.standingButtonScript.getSceneObject().enabled = false;
  script.sittingButtonScript.getSceneObject().enabled = false;

  script.therapistStanding.enabled = false;
  script.therapistSitting.enabled = true;
  isSelected = true;
}

function setupButtonEvents() {
  if (
    script.standingButtonScript.api &&
    script.standingButtonScript.api.onClick
  ) {
    script.standingButtonScript.api.onClick.add(onStandingSelected);
  }
  if (
    script.sittingButtonScript.api &&
    script.sittingButtonScript.api.onClick
  ) {
    script.sittingButtonScript.api.onClick.add(onSittingSelected);
  }
}

setupButtonEvents();
