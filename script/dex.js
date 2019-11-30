const createDexView = {
    createRegion: function (data, region) {
        document.querySelector(".header").style="display:flex"
        let div = document.createElement('div');
        div.classList.add(region);
        div.id = "allPokes";
        let counter = 1;
        div.addEventListener("click", function (event) {
            let path = event.path;
            path.forEach(ele => {
                if (ele.nodeName == "DIV") {
                    if (ele.className == "pokemon") {
                        let h3 = ele.querySelector("h3").innerHTML
                        let h3_lower = h3.toLowerCase();
                        router.navigateTo(h3_lower);
                        document.title = h3;
                    }
                }
            })
        })
        data.results.forEach(pokemon => {
            let div2 = helperViews.createPokeBox(pokemon, counter);
            div.appendChild(div2);
            counter++;
        });
        return div;

    }
}