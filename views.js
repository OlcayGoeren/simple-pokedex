"use strict"

var helperViews = {
    createPokeBox: function(data,counter){
        let div = document.createElement("div");
        div.classList.add("pokemon");
        div.innerHTML= 
        '<a><h3>'+this.makeFirstLetterCap(data.name)+'</h3><img src="'+imgs+data.name.toLowerCase()+'.png'+'" alt="'+data.name+'"><p> #'+counter+'</p></a>';
        div.dataset.moreInfo = data.url;
        return div
    },
    makeFirstLetterCap: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    getRightLanguage: function(ary,language){
        let newArray= [];
        for ( let i=0; i<ary.length; i++){
            if(ary[i].language.name == language){
                newArray.push({text:ary[i].flavor_text, edition:ary[i].version.name })
            }
        }
        return newArray;
    }
}

const createDexView = {
    createRegion : function(data,region){
        let div= document.createElement('div');
        div.classList.add(region);
        div.id="allPokes";
        let counter=1;
        div.addEventListener("click", function(event){
           let path= event.path;
           path.forEach(ele => {
               if(ele.nodeName=="DIV"){
                   if(ele.className== "pokemon"){
                       let h3 =ele.querySelector("h3").innerHTML.toLowerCase();
                       router.navigateTo("pokemon/"+h3);
                   }
               }
           })
        })
        data.results.forEach(pokemon => {
            let div2 = helperViews.createPokeBox(pokemon,counter);
            div.appendChild(div2);
            counter++;
        });
        return div;
        
    }
}

const invPokemon = {
    createPokemon: function(data){
        let main = document.createElement("div");
        main.id = "eintrag";
        let name = document.createElement("div");
        name.id= "name";
        name =this.createName(name,{index:data.game_indices[0].game_index, name: data.name});
        main.appendChild(name);
        let pokedexEintrag = document.createElement("div");
        pokedexEintrag.id="pokedexeintrag";
        pokedexEintrag.className="maxBreite"
        pokedexEintrag= this.createEintrag(pokedexEintrag, {types:data.types,name:data.name});
        main.appendChild(pokedexEintrag);
        return main;
        
        // let faehigkeiten = document.createElement("div");
        // faehigkeiten.id="faehigkeiten";
        // let baseStats = document.createElement("div");
        // baseStats.id = "baseStats";
        // let schwaeche = document.createElement("div");
        // schwaeche.id = "schwaeche";
        // let attacken = document.createElement("div");
        // attacken.id ="attacken";
    },

    createName: function(div,data){
        div.innerHTML= `
        <button> <i class="fas fa-long-arrow-alt-left fa-2x"></i> </button>
            <h1>`+helperViews.makeFirstLetterCap(data.name)+ " #"+data.index+ `</h1>
            <span></span>
        `;
        let button = div.querySelector("button");
        button.addEventListener("click", function(){
            window.history.back();
        })
        return div;
    },
    createEintrag: function(div, data){
        let sprites = document.createElement("div");
        sprites.id="sprites";
        let frontback = document.createElement("div");
        frontback.id ="frontback";
        frontback= eintragHelper.setSprites(frontback,data.name);
        sprites.appendChild(frontback);

        let type = document.createElement("div");
        type.id=type;
        eintragHelper.setTypes(type,data.types);
        sprites.appendChild(type);
        div.appendChild(sprites);
        return div;
    },
    createInfo: function(div,info){
        let komprimiert =helperViews.getRightLanguage(info,"de");
        let diashow = document.createElement("div");
        diashow.className="informationseintrag maxBreite";
        let edition = document.createElement("div");
        edition.className="edition";
        diashow.appendChild(edition);
        let infotext = document.createElement("div");
        infotext.className="infotext";
        diashow.appendChild(infotext);
        edition.style.gridTemplateColumns ="repeat("+komprimiert.length+",1fr)";
        for(let i=0; i<komprimiert.length; i++){
            let p = document.createElement("p");
            p.className="center";
            p.innerHTML=komprimiert[i].edition;
            p.dataset.num=i;
            if(i==0){
                p.classList.add("borderbottom0");
            }
            edition.appendChild(p);
            let info= document.createElement("p");
            info.className="infotext";
            info.dataset.num=i;
            info.innerHTML=komprimiert[i].text;
            if(i!=0) {
                info.hidden=true;                
            }
            infotext.appendChild(info);
        }
        eintragHelper.changeInfoEintrag(div);
        div.appendChild(diashow);
    },

    createEvoChain: function(div,data){
        let  entwicklungen = document.createElement("div");
        entwicklungen.id="entwicklungen";
        div.appendChild(entwicklungen);
        let sectionHeader = document.createElement("div");
        sectionHeader.className="sectionHeader";
        sectionHeader.innerHTML="<h1>Entwicklungen</h1>"
        entwicklungen.appendChild(sectionHeader);
        let entwicklungsstufen= document.createElement("div");
        entwicklungsstufen.id="entwicklungsstufen";
        entwicklungen.appendChild(entwicklungsstufen);
        let evoChain = evoChainHelper.getEvos(data);
        console.log(evoChain);
        if(evoChain.length==1){
            let h3 = document.createElement("h3");
            h3.innerHTML="Dieses Pokemon verfügt über keinen Entwicklungen";
            entwicklungsstufen.appendChild(h3);
        }else{
            let table = document.createElement("table");
            let row = document.createElement("tr");
            entwicklungsstufen.appendChild(table);
            table.appendChild(row);
            for(let i=0; i<evoChain.length; i++){
                let td = document.createElement("td");
                let img = document.createElement("img");
                img.src=imgs_entwicklung+evoChain[i].name+".png";
                td.appendChild(img);
                row.appendChild(td);
                if(i<evoChain.length-1){
                    let td2 = document.createElement("td");
                    td2.innerHTML='<i class="fas fa-long-arrow-alt-right"></i>'
                    row.appendChild(td2);
                }
                console.log(evoChain[i].detail)
                // for(const prop in evoChain[i].detail){
                //     if(evoChain[i].detail[prop] != null && evoChain[i].detail[prop] != false  ){
                //         let p= document.createElement("p");
                //         console.log( prop +": " +evoChain[i].detail[prop])
                //     }
                // }
            }
        }
       
    }
}

const eintragHelper = {
    setSprites: function(div, name){
        name= name+".png";
        let front = document.createElement("img");
        front.className="front";
        front.src= animated.front+name;
        let frontshiny = document.createElement("img");
        frontshiny.className="frontshiny";
        frontshiny.src=animated.front_shiny+name;
        let back = document.createElement("img");
        back.className="back";
        back.src=animated.back+name;
        let backshiny = document.createElement("img");
        backshiny.className="backshiny";
        backshiny.src=animated.back_shiny+name
        div.append(front,frontshiny,back,backshiny);
        return div;
    },

    setTypes: function(div, types){
        types.forEach(data => {
            let span = document.createElement("span");
            span.innerHTML=helperViews.makeFirstLetterCap(data.type.name);
            span.className=data.type.name;
            div.append(span);
        })

    },
    changeInfoEintrag: function(div){
        div.addEventListener("click", function(event){
            let path= event.path;
            if(path[0].nodeName =="P"){
                path[0].classList.add("borderbottom0")
                let version =path[0].dataset.num;
                let editions = div.querySelectorAll(".edition p");
                let infos = div.querySelectorAll(".infotext p");
                for(let i=0; i<infos.length;i++){
                    if(infos[i].dataset.num == version){
                        infos[i].hidden=false;
                    }else{
                        infos[i].hidden=true;
                        if(editions[i].classList.contains("borderbottom0")){
                            editions[i].classList.remove("borderbottom0")
                        }
                        
                    }
                }
            }
        })
    }
}

const evoChainHelper = {
    getEvos: function(data){
        let chains = data.chain;
        let pokemonChain= [];
        let firstStage = {name: chains.species.name}
        pokemonChain.push(firstStage);
        while(chains.hasOwnProperty("evolves_to")){
            if(chains.evolves_to[0]!=null){
                chains= chains.evolves_to[0];
                let pokemonname= chains.species.name;
                if(chains.evolution_details[0].length!=0){
                    let evolutiondetail= chains.evolution_details[0];
                    let newPoke= {name:pokemonname, detail:evolutiondetail};
                    pokemonChain.push(newPoke);
                }else{
                    let newPoke = {name:pokemonname, detail:null};
                    pokemonChain.push(newPoke);
                }
            }else{
                break;
            }
        }
        return pokemonChain;
    }
}