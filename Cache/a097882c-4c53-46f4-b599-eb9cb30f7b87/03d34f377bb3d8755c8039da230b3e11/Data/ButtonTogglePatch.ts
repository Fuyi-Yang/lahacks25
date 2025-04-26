// ButtonTogglePatch.ts

/**
 * Toggles visibility between this button and a target prefab when tapped.
 *
 * NOTE: Assign a Touch Component from the same SceneObject in the "Touch Component" input field.
 */
@component
export class ButtonTogglePatch extends BaseScriptComponent {
    /**
     * Drag the prefab you want to activate in the Inspector
     */
    @input targetPrefab: SceneObject;

    /**
     * Assign the Touch Component attached to this button (required)
     */
    @input touchComponent: any;

    onAwake() {
        if (!this.touchComponent) {
            const owner = this.getSceneObject();
            print(`[ButtonTogglePatch] ERROR: Touch Component not assigned on ${owner.name}`);
            return;
        }
        // Bind to onTapEnded for a reliable tap
        this.touchComponent.onTapEnded.add(() => this.onButtonTap());
    }

    private onButtonTap() {
        const owner = this.getSceneObject();
        // Disable this button's scene object
        owner.enabled = false;
        // Enable the specified target prefab
        if (this.targetPrefab) {
            this.targetPrefab.enabled = true;
        } else {
            print(`[ButtonTogglePatch] ERROR: targetPrefab input not set on ${owner.name}`);
        }
    }
}