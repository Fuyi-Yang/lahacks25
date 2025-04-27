import {validate} from "../../Utils/validate"
import {Interactable} from "../Interaction/Interactable/Interactable"
import {ToggleButton} from "../UI/ToggleButton/ToggleButton"

/**
 * This class provides visual feedback for a {@link ToggleButton} by changing the material of the provided {@link RenderMeshVisual}s when the button is toggled on or off.
 */
@component
export class ToggleFeedback extends BaseScriptComponent {
  @input
  toggledOffMaterial!: Material
  @input
  toggledOffSelectMaterial!: Material
  @input
  toggledOnMaterial!: Material
  @input
  toggledOnSelectMaterial!: Material
  @input
  disabledMaterial!: Material
  @input
  meshVisuals: RenderMeshVisual[] = []

  @input
  pageControllerObject?: SceneObject

  @input
  to_pageIndex: number = 0

  @input
  cur_pageIndex: number = 0

  private toggleButton: ToggleButton | null = null
  private interactable: Interactable | null = null

  private materials: Material[] = []

  onAwake(): void {
    this.materials = [
      this.toggledOffMaterial,
      this.toggledOffSelectMaterial,
      this.toggledOnMaterial,
      this.toggledOnSelectMaterial,
      this.disabledMaterial,
    ]

    this.defineScriptEvents()
  }

  private defineScriptEvents() {
    this.createEvent("OnStartEvent").bind(() => {
      this.init()
    })
  }

  init(): void {
    this.toggleButton = this.getSceneObject().getComponent(
      ToggleButton.getTypeName(),
    )

    this.interactable = this.getSceneObject().getComponent(
      Interactable.getTypeName(),
    )

    if (this.interactable === null || this.interactable === undefined) {
      throw new Error(
        "UIToggleButtonCustomize script requires an Interactable on the ToggleButton",
      )
    }

    this.setupInteractableCallbacks(this.interactable)
  }

  private removeMaterials(): void {
    for (let i = 0; i < this.meshVisuals.length; i++) {
      let materials = []

      const matCount = this.meshVisuals[i].getMaterialsCount()

      for (let k = 0; k < matCount; k++) {
        const material = this.meshVisuals[i].getMaterial(k)

        if (this.materials.includes(material)) {
          continue
        }

        materials.push(material)
      }

      this.meshVisuals[i].clearMaterials()

      for (var k = 0; k < materials.length; k++) {
        this.meshVisuals[i].addMaterial(materials[k])
      }
    }
  }

  // Changes the material of each RenderMeshVisual provided.
  private changeMeshes(material: Material | undefined): void {
    validate(material)

    this.removeMaterials()

    this.meshVisuals.forEach((mesh) => {
      mesh.addMaterial(material)
    })
  }

  /**
   * Changes the materials depending on the {@link ToggleButton}'s status.
   * @param materialOn - The material to be used if on.
   * @param materialOff - The material to be used if off.
   */
  private changeToggleOnMesh(
    materialOn: Material | undefined,
    materialOff: Material | undefined,
  ) {
    validate(this.toggleButton)
    this.changeMeshes(this.toggleButton.isToggledOn ? materialOn : materialOff)
  }

  // Sets up interactable callbacks.
  setupInteractableCallbacks(interactable: Interactable): void {
    validate(this.toggleButton)
  
    interactable.onTriggerStart.add(() => {
      // optional “pressed” feedback
      this.changeToggleOnMesh(
        this.toggledOnSelectMaterial,
        this.toggledOffSelectMaterial,
      )
  
      // call showPage once
      if (this.pageControllerObject) {
        const pc = this.pageControllerObject.getComponent("Component.ScriptComponent") as any
        pc?.api?.toPage?.(this.to_pageIndex)
      }
    })
  }
  
}
