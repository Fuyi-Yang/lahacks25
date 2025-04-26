// ButtonToggleComponent.js
// Attach this script as a component to your Button SceneObject
// Configure the following inputs in the Inspector:
//   button               - the Button SceneObject this script is added to
//   targetSceneObject    - the SceneObject to enable when the button is touched

// @input SceneObject button
// @input SceneObject targetSceneObject

/**
 * Called when the button is touched. Disables the button and enables the target object.
 */
function onButtonTouched() {
    // Disable the button so it can't be touched again
    if (script.button) {
        script.button.enabled = false;
    }

    // Enable the target scene object
    if (script.targetSceneObject) {
        script.targetSceneObject.enabled = true;
    }
}

/**
 * Binds the TouchComponent on the configured button to the onButtonTouched handler.
 */
function setupTouchEvent() {
    if (!script.button) {
        print("[ButtonToggleComponent] Error: 'button' input is not assigned.");
        return;
    }

    // Get or add a TouchComponent
    var touchComp = script.button.getComponent("TouchComponent");
    if (!touchComp) {
        print("[ButtonToggleComponent] Warning: TouchComponent not found on the button. Adding one.");
        touchComp = script.button.createComponent("TouchComponent");
    }

    // Bind the touch start event
    touchComp.onTouchStart.add(onButtonTouched);
}

// Initialize event binding
setupTouchEvent();