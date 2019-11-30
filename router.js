"use strict"

var routeMap = new Map();
// routeMap.set("kanto", presenter.kanto);
// routeMap.set("yoto", presenter.yoto);
// routeMap.set("hoen", presenter.hoen);
// routeMap.set("sinnoh", presenter.sinnoh);
routeMap.set("pokemon", presenter.pokeSite);
routeMap.set("region", presenter.region);

console.log("css von eintrag in mehere dateein auslagern")

var init = false;

var cache = [];

var router = {
    navigateTo: (url) => {
        window.history.pushState(null, null, url);
    },
    changeDex: function () {
        let options = document.getElementById("changer");
        let value = options.value;
        router.navigateTo(value);
        document.title = helperViews.makeFirstLetterCap(value);
    }
}


if (window.location.pathname == '/') {
    router.navigateTo("kanto");
    presenter.region("kanto");
    document.title = helperViews.makeFirstLetterCap(document.getElementById("changer").value);
}

window.onpopstate = function (event) {
    this.console.log("popp")
    let val = window.location.pathname.split("/")[1];
    this.console.log(val);
    this.router.navigateTo(val);
};


var pushState = history.pushState;
history.pushState = function () {
    pushState.apply(history, arguments);
    if (arguments[2] == "kanto" || arguments[2] == "yoto" || arguments[2] == "hoen" || arguments[2] == "sinnoh"|| arguments[2] == "einall"|| arguments[2] == "kalos") {
        let region = arguments[2];
        let currentDex = document.getElementById('main').firstElementChild;
        routerHelper.pushCache(currentDex);
        if (routerHelper.checkInCache(region)) {
            presenter.reBuild(routerHelper.checkInCache(region));
            return;
        } else {
            routeMap.get("region")(region);
            console.log("ich bin im else zweig von router")
            return;
        }
    }
    let pokemon = window.location.pathname.split("/")[1];
    routeMap.get("pokemon")(pokemon);
}

var routerHelper = {
    pushCache: function (divRegion) {
        if (cache.length == 0) cache.push(divRegion);
        for (let i = 0; i < cache.length; i++) {
            if (cache[i].className == divRegion.className) {
                return;
            }
        }
        cache.push(divRegion);
    },
    checkInCache: function (key) {
        for (let i = 0; i < cache.length; i++) {
            if (cache[i].className == key) {
                return cache[i];
            }
        }
    }
}