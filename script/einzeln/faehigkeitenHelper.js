const faehigkeitenHelper = {
    findRightText: function (language, data, i) {
        let text = helperViews.getRightLanguage(data.flavor_text_entries, language, false);
        let tr = document.querySelectorAll(".abbilities .row");
        let td = document.createElement("div");
        td.className="info";
        let spanForInfo = document.createElement("span");
        spanForInfo.innerHTML=text;
        td.appendChild(spanForInfo);
        tr[i].appendChild(td);
    }
}