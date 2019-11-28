const faehigkeitenHelper = {
    findRightText: function (language, data, i) {
        let text = helperViews.getRightLanguage(data.flavor_text_entries, language, false);
        let tr = document.querySelectorAll(".abbilities tr");
        let td = document.createElement("td");
        td.innerHTML = text;
        tr[i].appendChild(td);
    }
}