//// PageController.js
//// @input SceneObject[] pages   // ← this lives in a comment, not as a TS decorator
//
//var current = 0;
//
//function showPage(idx) {
//    print("im here");
//    for (var i = 0; i < script.pages.length; i++) {
//        script.pages[i].enabled = (i === idx);
//    }
//    current = idx;
//}
//
//// expose next/prev so other scripts can call them
//script.api.nextPage = function() {
//    showPage((current + 1) % script.pages.length);
//};
//script.api.prevPage = function() {
//    showPage((current - 1 + script.pages.length) % script.pages.length);
//};
//
//script.api.showPage = showPage;
//// initialize
//showPage(0);
//
//


// PageController.js
// @input SceneObject[] pages

var current = 0;

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
    current = idx;
    print(script.pages[0].enabled+ ' '+ script.pages[1].enabled);
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