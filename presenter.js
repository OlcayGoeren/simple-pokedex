"use strict"

var presenterHelper = {
    changeContent: function(div){
        let main = document.getElementById("main");
        if(main.firstElementChild){
            main.firstElementChild.remove();
        }
        document.getElementById("main").appendChild(div);
    },
    getFaURL : function(data){
        let newObj = [];
        for (let i=0; i< data.length;i++){
            newObj.push(data[i].ability.url)
        }
        return newObj;
    },
    eventAttack: function(atk,callback){
        modal.reqAttack(atk).then(res => {
            callback(res);
        })
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
    sinnoh:function(){
        let info = modal.reqSinnoh;
        info.then(defs => {
            let newDiv =createDexView.createRegion(defs, "sinnoh");
            presenterHelper.changeContent(newDiv);
        })
    },
    reBuild: function(div){
        presenterHelper.changeContent(div);
    },
    pokeSite: function(pokemon){
        let main = invPokemon.setMain();
        let info = modal.reqPokemon(pokemon);
        info.then(data => {
            invPokemon.createPokemon(data,main);
            presenterHelper.changeContent(main);
            window.scrollTo({ top: 300, behavior: 'smooth' });
            let species = modal.reqSpecies(data.species.url);
            species.then(data => {
                let infoText = data.flavor_text_entries;
                let eintraege =invPokemon.createInfo(infoText);
                main.querySelector("#pokedexeintrag").after(eintraege);

                let evoPromise =modal.reqSpecies(data.evolution_chain.url);
                evoPromise.then(data => {
                    invPokemon.createEvoChain(main, data)
                })                
            });
            let abilities = data.abilities;
            invPokemon.createFaehigkeit(abilities);
            for(let i=0; i<abilities.length;i++){
                let info =modal.reqSpecies(abilities[i].ability.url);
                info.then(texts => {
                    faehigkeitenHelper.findRightText("de",texts,i)
                })
            }
        });
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
