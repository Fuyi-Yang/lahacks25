// PageController.js
// @input SceneObject[] pages
// @input SceneObject chatScreen

var current = 0;

function setChatVisible(on) {
    // hide/show all MeshVisuals (3D) under chatScreen
    var meshVisuals = script.chatScreen.getComponents("Component.MeshVisual");
    for (var i = 0; i < meshVisuals.length; i++) {
        meshVisuals[i].enabled = on;
    }

    // also handle SpriteVisuals (2D) if you have any
    var spriteVisuals = script.chatScreen.getComponents("Component.SpriteVisual");
    for (var i = 0; i < spriteVisuals.length; i++) {
        spriteVisuals[i].enabled = on;
    }

    // disable touch so it can’t be interacted with when hidden
    var touch = script.chatScreen.getComponent("Component.TouchComponent");
    if (touch) {
        touch.enabled = on;
    }
}

function showPage(idx) {
    print("PageController.showPage(" + idx + ")");

    if (!script.pages || script.pages.length === 0) {
        print("PageController ERROR: no pages assigned on this component.");
        return;
    }
    print(idx);
    for (var i = 0; i < script.pages.length; i++) {
        if (i === idx) {
            script.pages[i].enabled = true;
        } else {
            script.pages[i].enabled = false;
        }
    }
    if (idx === 0) {
        setChatVisible(false);
    } else {
        setChatVisible(true);
        // …and reparent/reset position if desired…
    }
    var chatXform = script.chatScreen.getTransform();
    if (idx === 0 || idx == 3) {
        // shove it way off-canvas
        chatXform.setLocalPosition(new vec3(0, -10000, 0));
    } else {
        // bring it back
        chatXform.setLocalPosition(vec3.zero());
    }
    current = idx;
}

script.api.nextPage = function() {
    showPage((current + 1) % script.pages.length);
};

script.api.toPage = function(idx) {
    // validate
    if (typeof idx !== "number" || idx < 0 || idx >= script.pages.length) {
        print("PageController.toPage error: invalid page index “" + idx + "”");
        return;
    }
    showPage(idx);
};

script.api.prevPage = function() {
    showPage((current - 1 + script.pages.length) % script.pages.length);
};

script.api.showPage = showPage;

// initialize to page 0
showPage(0);