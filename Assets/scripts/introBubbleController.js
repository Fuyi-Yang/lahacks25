//@input SceneObject bubbleStanding
//@input SceneObject bubbleSitting

var time = 0.0;

// Animate the bubbles floating up and down gently
function onUpdate(eventData) {
  time += eventData.getDeltaTime();
  var floatY = Math.sin(time * 2.0) * 2.0; // adjust amplitude/speed

  var standingTransform = script.bubbleStanding.getTransform();
  var sittingTransform = script.bubbleSitting.getTransform();

  standingTransform.setLocalPosition(
    new vec3(
      standingTransform.getLocalPosition().x,
      floatY,
      standingTransform.getLocalPosition().z
    )
  );
  sittingTransform.setLocalPosition(
    new vec3(
      sittingTransform.getLocalPosition().x,
      floatY,
      sittingTransform.getLocalPosition().z
    )
  );
}

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdate);
