var helperViews = {
    createPokeBox: function (data, counter) {
        let div = document.createElement("div");
        div.classList.add("pokemon");
        div.innerHTML =
            '<a><h3>' + this.makeFirstLetterCap(data.name) + '</h3><img src="' + imgs + data.name.toLowerCase() + '.png' + '" alt="' + data.name + '"><p> #' + counter + '</p></a>';
        div.dataset.moreInfo = data.url;
        return div
    },
    makeFirstLetterCap: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    getRightLanguage: function (ary, language, edition = true) {
        let newArray = [];
        for (let i = 0; i < ary.length; i++) {
            if (ary[i].language.name == language) {
                if (edition == true) {
                    newArray.push({
                        text: ary[i].flavor_text,
                        edition: ary[i].version.name
                    })
                } else {
                    return ary[i].flavor_text
                }

            }
        }
        return newArray;
    },
    getTakenSize: function (details) {
        let i = 0;
        for (let prop in details) {
            if (details[prop] != null && details[prop] != false && prop != "trigger") i++;
        }
        return i;
    },
    minimizeDetails: function (details) {
        let newDetails = {};
        for (let prop in details) {
            if (details[prop] != null && details[prop] != false && prop != "trigger") {
                newDetails[prop] = details[prop];
            }
        }
        return newDetails;
    },

}