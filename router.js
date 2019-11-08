"use strict"

var routeMap = new Map();
routeMap.set("kanto", presenter.kanto);
routeMap.set("yoto", presenter.yoto);
routeMap.set("hoen", presenter.hoen);
routeMap.set("pokemon", presenter.pokeSite);

console.log("css von eintrag in mehere dateein auslagern")

var init = false;

var cache = [];

var router = {
    navigateTo: (url) => {
        window.history.pushState(null, null, url);
        // window.location.href = url;
    },
    changeDex: function () {
        let options = document.getElementById("changer");
        let value = options.value;
        router.navigateTo(value);
    }
}


if (window.location.pathname == '/') {
    router.navigateTo("kanto");
    presenter.kanto();
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

    for (let [k, v] of routeMap) {
        if (arguments[2].startsWith("pokemon/")) {
           let actPokemon =window.location.href.split("/pokemon/")[1];
            routeMap.get("pokemon")(actPokemon);
            break;
        } else if (arguments[2] == k) {
            let currentDex = document.getElementById('main').firstElementChild;
            routerHelper.pushCache(currentDex);
            if (routerHelper.checkInCache(k)) {
                presenter.reBuild(routerHelper.checkInCache(k));
            } else {
                v();
            }
        }


    }
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