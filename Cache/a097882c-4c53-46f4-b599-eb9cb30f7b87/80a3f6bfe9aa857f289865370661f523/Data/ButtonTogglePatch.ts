// ButtonTogglePatch.ts

/**
 * Toggles visibility between this button and a target prefab when tapped.
 */
@component
export class ButtonTogglePatch extends BaseScriptComponent {
    /**
     * Drag the prefab you want to activate in the Inspector
     */
    @input targetPrefab: SceneObject;

    onAwake() {
        const owner = this.getSceneObject();
        // Retrieve the TouchComponent (runtime identifier remains "Component.TouchComponent")
        const touchComp = owner.getComponent("Component.TouchComponent") as TouchComponent;
        if (!touchComp) {
            print(`[ButtonTogglePatch] ERROR: No TouchComponent found on ${owner.name}`);
            return;
        }
        // Bind to tap-end for a reliable tap event
        touchComp.onTapEnded.add(() => this.onButtonTap());
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