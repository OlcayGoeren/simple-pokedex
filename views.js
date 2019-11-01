"use strict"

var helperViews = {
    createPokeBox: function(data,counter){
        let div = document.createElement("div");
        div.classList.add("pokemon");
        div.innerHTML= 
        '<a href="#"><h3>'+this.makeFirstLetterCap(data.name)+'</h3><img src="'+imgs+data.name.toLowerCase()+'.png'+'" alt="'+data.name+'"><p> #'+counter+'</p></a>';
        div.dataset.moreInfo = data.url;
        return div
    },
    makeFirstLetterCap: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
}

const createDexView = {
    createRegion : function(data,region){
        let div= document.createElement('div');
        div.classList.add(region);
        div.id="allPokes";
        let counter=1;
        data.results.forEach(pokemon => {
            let div2 = helperViews.createPokeBox(pokemon,counter);
            div.appendChild(div2);
            counter++;
        });
        return div;
        
    }
}

