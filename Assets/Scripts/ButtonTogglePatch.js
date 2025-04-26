// ButtonTogglePatch.ts

// … your existing imports / decorator lines …

/** 
 * Reference to the TouchComponent on this button 
 * (or whatever event you already have wired up)
 */
// @input Component.TouchComponent touchComp

/**
 * Drag your PageController game-object’s Script component here
 * (that has the nextPage()/prevPage() methods on script.api)
 */
// @input Component.ScriptComponent pageController

function onButtonPressed() {
    // first do your normal toggle-off / toggle-on logic…
    // e.g. script.thisButton.enabled = false; script.otherButton.enabled = true;

    // then tell the page controller to advance:
    if (script.pageController && script.pageController.api && 
        typeof script.pageController.api.nextPage === "function") {
        script.pageController.api.nextPage();
    } else {
        print("⚠️ pageController.api.nextPage() isn’t available – check your @input");
    }
}

// wire it up
script.touchComp.onTap.add(onButtonPressed);
