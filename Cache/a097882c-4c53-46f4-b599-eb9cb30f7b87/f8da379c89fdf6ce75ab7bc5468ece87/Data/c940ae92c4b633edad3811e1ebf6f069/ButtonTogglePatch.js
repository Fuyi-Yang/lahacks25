/**
 * Toggles visibility between this button and a target prefab when tapped.
 *
 * @component
 * @input Component.TouchComponent touchComponent
 * @input SceneObject targetPrefab
 */
class ButtonTogglePatch extends ScriptComponent {
    constructor() {
        super(...arguments);
        this.touchComponent = null; // set by Lens Studio from the @input above
        this.targetPrefab = null; // set by Lens Studio from the @input above
    }
    start() {
        // Hide the target prefab initially
        if (this.targetPrefab) {
            this.targetPrefab.enabled = false;
        }
        else {
            print("[ButtonTogglePatch] ERROR: targetPrefab input not set on " + this.getSceneObject().name);
            return;
        }
        // Validate TouchComponent
        if (!this.touchComponent) {
            print("[ButtonTogglePatch] ERROR: TouchComponent input not set on " + this.getSceneObject().name);
            return;
        }
        // Listen for tap events
        this.touchComponent.onTapEnded.add(() => {
            // Hide this button
            this.getSceneObject().enabled = false;
            // Show the target prefab
            this.targetPrefab.enabled = true;
        });
    }
}
//# sourceMappingURL=ButtonTogglePatch.js.map