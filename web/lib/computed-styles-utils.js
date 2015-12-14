function getComputedHeight(theElt) {
    var browserName = navigator.appName;
    if (browserName == "Microsoft Internet Explorer") {
        var is_ie = true;
    } else {
        var is_ie = false;
    }
    if (is_ie) {
        tmphght = document.getElementById(theElt).offsetHeight;
    } else {
        docObj = document.getElementById(theElt);
        var tmphght1 = document.defaultView.getComputedStyle(docObj, "").getPropertyValue("height");
        tmphght = tmphght1.split('px');
        tmphght = tmphght[0];
    }
    return tmphght;
}

function getWindowHeight(){
    return "innerHeight" in window ?
        window.innerHeight :
        document.documentElement.offsetHeight; 
}