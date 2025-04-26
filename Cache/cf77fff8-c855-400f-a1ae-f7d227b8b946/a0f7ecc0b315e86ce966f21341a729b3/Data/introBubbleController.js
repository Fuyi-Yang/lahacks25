////@input SceneObject bubbleStanding
////@input SceneObject bubbleSitting
//
//var time = 0.0;
//
//// Animate the bubbles floating up and down gently
//function onUpdate(eventData) {
//  time += eventData.getDeltaTime();
//  var floatY = Math.sin(time * 2.0) * 2.0; // adjust amplitude/speed
//
//  var standingTransform = script.bubbleStanding.getTransform();
//  var sittingTransform = script.bubbleSitting.getTransform();
//
//  standingTransform.setLocalPosition(
//    new vec3(
//      standingTransform.getLocalPosition().x,
//      floatY,
//      standingTransform.getLocalPosition().z
//    )
//  );
//  sittingTransform.setLocalPosition(
//    new vec3(
//      sittingTransform.getLocalPosition().x,
//      floatY,
//      sittingTransform.getLocalPosition().z
//    )
//  );
//}
//
//var updateEvent = script.createEvent("UpdateEvent");
//updateEvent.bind(onUpdate);
//

// introBubbleController.js
// This controller instantiates two bubble‐buttons and positions them evenly across the screen.

//== Inputs ==
//@input SceneObject bubblePrefab       // assign your bubble prefab in the inspector
//@input Component.ScreenTransform canvasTransform   // optional: parent transform (e.g. your UI Canvas)

// Normalized horizontal offsets for the two buttons (negative = left, positive = right)
var bubbleOffsets = [ -0.3, 0.3 ];

function createButtons() {
    for (var i = 0; i < bubbleOffsets.length; i++) {
        // Instantiate the prefab under the canvas or scene root
        var parent = script.canvasTransform ? script.canvasTransform.sceneObject : null;
        var bubbleObj = script.bubblePrefab.instantiate(parent);

        // Position it horizontally based on normalized offset
        var st = bubbleObj.getComponent("Component.ScreenTransform");
        if (st && script.canvasTransform) {
            // Anchor to center and offset in X
            st.anchors = { min: { x: 0.5, y: 0.5 }, max: { x: 0.5, y: 0.5 } };
            st.position = new vec2(bubbleOffsets[i] * script.canvasTransform.anchors.max.x, 0);
        } else {
            // Fallback to local transform
            var t = bubbleObj.getTransform();
            t.setLocalPosition(new vec3(bubbleOffsets[i], 0, 0));
        }

        // Store index for touch handler
        var handler = bubbleObj.getComponent("Component.ScriptComponent");
        if (handler) handler.api.buttonIndex = i;
    }
}

// Create both buttons when the script starts
createButtons();