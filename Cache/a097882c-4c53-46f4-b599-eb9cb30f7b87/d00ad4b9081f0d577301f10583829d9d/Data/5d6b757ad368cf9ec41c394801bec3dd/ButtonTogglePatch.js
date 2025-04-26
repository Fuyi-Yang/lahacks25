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
// ButtonTogglePatch.ts
/**
 * Toggles visibility between this button and a target prefab when tapped.
 */
let ButtonTogglePatch = class ButtonTogglePatch extends BaseScriptComponent {
    onAwake() {
        const owner = this.getSceneObject();
        // Retrieve the TouchComponent instance (as any to avoid TS lookup issues)
        const touchComp = owner.getComponent("Component.TouchComponent");
        if (!touchComp) {
            print(`[ButtonTogglePatch] ERROR: No TouchComponent found on ${owner.name}`);
            return;
        }
        // Bind to onTapEnded for a reliable tap
        touchComp.onTapEnded.add(() => this.onButtonTap());
    }
    onButtonTap() {
        const owner = this.getSceneObject();
        // Disable this button's scene object
        owner.enabled = false;
        // Enable the specified target prefab
        if (this.targetPrefab) {
            this.targetPrefab.enabled = true;
        }
        else {
            print(`[ButtonTogglePatch] ERROR: targetPrefab input not set on ${owner.name}`);
        }
    }
};
exports.ButtonTogglePatch = ButtonTogglePatch;
exports.ButtonTogglePatch = ButtonTogglePatch = __decorate([
    component
], ButtonTogglePatch);
//# sourceMappingURL=ButtonTogglePatch.js.map