function fadeIn() {
    const element = document.getElementById("transition");
    element.classList.remove("hidden");
    element.classList.add("visible");
}

function makeVisible() {
    const element = document.getElementById("transition");
    element.classList.remove("hidden");
    element.classList.add("visible_no_trans");
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    function replaceUrlParam(paramName, paramValue) {
        let url = window.location.href;
        var encodedValue = encodeURIComponent(paramValue);
        var regex = new RegExp('([?&])' + paramName + '=([^&#]*)', 'i');
        if (url.match(regex)) {
            url = url.replace(regex, '$1' + paramName + '=' + encodedValue);
        } else {
            var separator = url.indexOf('?') !== -1 ? '&' : '?';
            url += separator + paramName + '=' + encodedValue;
        }
        return url;
    }

    var animationParam = getParameterByName('animation');

    let nav_type = String(window.performance.getEntriesByType("navigation")[0].type);

    if (animationParam !== 'false' && (nav_type === "reload" || nav_type === "back_forward")) {
        window.history.replaceState({}, document.title, replaceUrlParam('animation', 'false'));
    } 
    else if (animationParam !== 'true' && nav_type === "navigate") {
        window.history.replaceState({}, document.title, replaceUrlParam('animation', 'true'));
    }

    animationParam = getParameterByName('animation');

    if (animationParam === 'true') {
        setTimeout(fadeIn, 500);
    } else if (animationParam === 'false') {
        setTimeout(makeVisible, 500);
    }
});