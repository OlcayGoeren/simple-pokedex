"use strict"

var presenterHelper = {
    changeContent: function(div){
        let main = document.getElementById("main");
        if(main.firstElementChild){
            main.firstElementChild.remove();
        }
        document.getElementById("main").appendChild(div);
    }
}

const presenter = {
    yoto: function(){
        let info = modal.reqYoto;
        info.then(defs => {
            let newDiv =createDexView.createRegion(defs,"yoto");
            presenterHelper.changeContent(newDiv);
        })
    },
    kanto: function(){
        let info = modal.reqKanto;
        info.then(defs => {
            let newDiv =createDexView.createRegion(defs,"kanto");
            presenterHelper.changeContent(newDiv);
        })
    },
    hoen: function(){
        let info = modal.reqHoen;
        info.then(defs => {
            let newDiv =createDexView.createRegion(defs, "hoen");
            presenterHelper.changeContent(newDiv);
        })
    },
    reBuild: function(div){
        presenterHelper.changeContent(div);
    },
    pokeSite: function(pokemon){
        console.log("eyyy")
        let info = modal.reqPokemon(pokemon);
        info.then(data => {
            let div =invPokemon.createPokemon(data);
            presenterHelper.changeContent(div);
            let species = modal.reqSpecies(data.species.url);
            species.then(data => {
                let infoText = data.flavor_text_entries;
                let eintraege =invPokemon.createInfo(infoText);
                div.appendChild(eintraege);
                let evoPromise =modal.reqSpecies(data.evolution_chain.url);
                evoPromise.then(data => {
                    invPokemon.createEvoChain(div, data)
                })
                
            })
        })
    }
}

document.getElementById("search").addEventListener("input", function(e){
    let current = e.target.value.replace(/\s/g, '').toLowerCase();
    let allPokes = document.getElementsByClassName("pokemon");
    for(let i=0; i<allPokes.length;i++){
        let h3= allPokes[i].getElementsByTagName("h3").item(0);
        let h3act = h3.innerHTML.toLowerCase();
        if(!h3act.startsWith(current)){
           allPokes[i].hidden= true;
        }
        if(current.length==0){
            allPokes[i].hidden= false;
        }
    }
    

})
