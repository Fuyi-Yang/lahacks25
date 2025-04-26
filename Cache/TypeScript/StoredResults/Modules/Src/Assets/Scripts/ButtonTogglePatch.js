"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonTogglePatch = void 0;
var __selfType = requireType("./ButtonTogglePatch");
function component(target) { target.getTypeName = function () { return __selfType; }; }
/**
 * Toggles visibility between this button and a target prefab when tapped.
 */
let ButtonTogglePatch = class ButtonTogglePatch extends BaseScriptComponent {
    onStart() {
        // Hide the target prefab initially
        if (this.targetPrefab) {
            this.targetPrefab.enabled = false;
        }
        else {
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
};
exports.ButtonTogglePatch = ButtonTogglePatch;
exports.ButtonTogglePatch = ButtonTogglePatch = __decorate([
    component
], ButtonTogglePatch);
//# sourceMappingURL=ButtonTogglePatch.js.map