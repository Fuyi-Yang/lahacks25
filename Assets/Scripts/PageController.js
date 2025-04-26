// PageController.js
// @input SceneObject[] pages   // ← this lives in a comment, not as a TS decorator

var current = 0;

function showPage(idx) {
    for (var i = 0; i < script.pages.length; i++) {
        script.pages[i].enabled = (i === idx);
    }
    current = idx;
}

// expose next/prev so other scripts can call them
script.api.nextPage = function() {
    showPage((current + 1) % script.pages.length);
};
script.api.prevPage = function() {
    showPage((current - 1 + script.pages.length) % script.pages.length);
};

// initialize
showPage(0);