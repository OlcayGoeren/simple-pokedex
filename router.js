"use strict"

var routeMap = new Map();
routeMap.set("kanto", presenter.kanto);
routeMap.set("yoto", presenter.yoto);
routeMap.set("hoen", presenter.hoen);

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
    }
}


if (window.location.pathname == '/') {
    router.navigateTo("kanto");
    presenter.kanto();
}

window.onpopstate = function (event) {
    let val = window.location.pathname.split("/")[1];
    presenter[path]();
    //TODO select updaten
};


var pushState = history.pushState;
history.pushState = function () {
    pushState.apply(history, arguments);
    routeMap.forEach((val, key, map) => {
        if (arguments[2] == key) {
            let currentDex = document.getElementById('main').firstElementChild;
            routerHelper.pushCache(currentDex);
            if (routerHelper.checkInCache(key)) {
                presenter.reBuild(routerHelper.checkInCache(key));
            } else {
                val();
            }
        }
    });
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