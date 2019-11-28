"use strict"

const eintragHelper = {
    setSprites: function (div, name) {
        name = name + ".png";
        let front = document.createElement("img");
        front.className = "front";
        front.src = animated.front + name;
        let frontshiny = document.createElement("img");
        frontshiny.className = "frontshiny";
        frontshiny.src = animated.front_shiny + name;
        let back = document.createElement("img");
        back.className = "back";
        back.src = animated.back + name;
        let backshiny = document.createElement("img");
        backshiny.className = "backshiny";
        backshiny.src = animated.back_shiny + name
        div.append(front, frontshiny, back, backshiny);
    },

    setTypes: function (div, types) {
        types.forEach(data => {
            let span = document.createElement("span");
            span.innerHTML = helperViews.makeFirstLetterCap(data.type.name);
            span.className = data.type.name;
            div.append(span);
        })

    },
    setTexte: function (komprimiert, infotext, edition) {
        for (let i = 0; i < komprimiert.length; i++) {
            let p = document.createElement("p");
            p.className = "center";
            p.innerHTML = komprimiert[i].edition;
            p.dataset.num = i;
            if (i == 0) {
                p.classList.add("borderbottom0");
            }
            edition.appendChild(p);
            let info = document.createElement("p");
            info.className = "infotext";
            info.dataset.num = i;
            info.innerHTML = komprimiert[i].text;
            if (i != 0) {
                info.hidden = true;
            }
            infotext.appendChild(info);
        }
    },

    changeInfoEintrag: function (div) {
        div.addEventListener("click", function (event) {
            let path = event.path;
            if (path[0].nodeName == "P") {
                path[0].classList.add("borderbottom0")
                let version = path[0].dataset.num;
                let editions = div.querySelectorAll(".edition p");
                let infos = div.querySelectorAll(".infotext p");
                for (let i = 0; i < infos.length; i++) {
                    if (infos[i].dataset.num == version) {
                        infos[i].hidden = false;
                    } else {
                        infos[i].hidden = true;
                        if (editions[i].classList.contains("borderbottom0")) {
                            editions[i].classList.remove("borderbottom0")
                        }

                    }
                }
            }
        })
    }
}