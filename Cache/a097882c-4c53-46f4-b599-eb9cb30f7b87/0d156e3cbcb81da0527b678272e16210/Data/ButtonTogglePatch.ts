/**
 * Toggles visibility between this button and a target prefab when tapped.
 */
@component
export class ButtonTogglePatch extends BaseScriptComponent {
    @input("Component.TouchComponent")
    touchComponent: any = null;

    @input("SceneObject")
    targetPrefab: SceneObject = null;

    onStart(): void {
        // Hide the target prefab initially
        if (this.targetPrefab) {
            this.targetPrefab.enabled = false;
        } else {
            print(`[ButtonTogglePatch] ERROR: targetPrefab not set on ${this.getSceneObject().name}`);
            return;
        }

        // Validate TouchComponent
        if (!this.touchComponent) {
            print(`[ButtonTogglePatch] ERROR: touchComponent not set on ${this.getSceneObject().name}`);
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