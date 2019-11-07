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
        // let  entwicklungen = document.createElement("div");
        // entwicklungen.id="entwicklungen";
        // main.appendChild(entwicklungen);
        
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
        diashow.className="slideshow-container";
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

    }
}

