"use strict"

const createDexView = {
    createRegion: function (data, region) {
        let div = document.createElement('div');
        div.classList.add(region);
        div.id = "allPokes";
        let counter = 1;
        div.addEventListener("click", function (event) {
            let path = event.path;
            path.forEach(ele => {
                if (ele.nodeName == "DIV") {
                    if (ele.className == "pokemon") {
                        let h3 = ele.querySelector("h3").innerHTML.toLowerCase();
                        router.navigateTo("pokemon/" + h3);
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

const invPokemon = {
    createPokemon: function (data) {
        let main = document.createElement("div");
        main.id = "eintrag";
        let name = document.createElement("div");
        name.id = "name";
        name = this.createName(name, {
            index: data.game_indices[0].game_index,
            name: data.name
        });
        main.appendChild(name);
        let pokedexEintrag = document.createElement("div");
        pokedexEintrag.id = "pokedexeintrag";
        pokedexEintrag.className = "maxBreite"
        pokedexEintrag = this.createEintrag(pokedexEintrag, {
            types: data.types,
            name: data.name
        });
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

    createName: function (div, data) {
        div.innerHTML = `
        <button> <i class="fas fa-long-arrow-alt-left fa-2x"></i> </button>
            <h1>` + helperViews.makeFirstLetterCap(data.name) + " #" + data.index + `</h1>
            <span></span>
        `;
        let button = div.querySelector("button");
        button.addEventListener("click", function () {
            window.history.back();
        })
        return div;
    },
    createEintrag: function (div, data) {
        let sprites = document.createElement("div");
        sprites.id = "sprites";
        let frontback = document.createElement("div");
        frontback.id = "frontback";
        eintragHelper.setSprites(frontback, data.name);
        sprites.appendChild(frontback);

        let type = document.createElement("div");
        type.id = type;
        eintragHelper.setTypes(type, data.types);
        sprites.appendChild(type);
        div.appendChild(sprites);
        return div;
    },
    createInfo: function (info) {
        let komprimiert = helperViews.getRightLanguage(info, "de");
        let infoBoxen = document.createElement("div");
        infoBoxen.className = "informationseintrag maxBreite";
        let edition = document.createElement("div");
        edition.className = "edition";
        infoBoxen.appendChild(edition);
        let infotext = document.createElement("div");
        infotext.className = "infotext";
        infoBoxen.appendChild(infotext);
        edition.style.gridTemplateColumns = "repeat(" + komprimiert.length + ",1fr)";
        eintragHelper.setTexte(komprimiert, infotext, edition);
        eintragHelper.changeInfoEintrag(infoBoxen);
        return infoBoxen;
    },

    createEvoChain: function (div, data) {
        let entwicklungen = document.createElement("div");
        entwicklungen.id = "entwicklungen";
        div.appendChild(entwicklungen);
        let sectionHeader = document.createElement("div");
        sectionHeader.className = "sectionHeader";
        sectionHeader.innerHTML = "<h1>Entwicklungen</h1>"
        entwicklungen.appendChild(sectionHeader);
        let evoChain = evoChainHelper.getEvos(data);
        let element = evoChainHelper.visualizeChain(evoChain);
        entwicklungen.appendChild(element);
    }
}

/* bis hier */

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

const evoChainHelper = {
    getEvos: function (data) {
        let chains = data.chain;
        let allEvolution = {};
        let phase_1 = {
            name: chains.species.name,
            details: null
        };
        if (chains.evolves_to.length == 0) {
            let singlePhase = [];
            singlePhase.push(phase_1);
            allEvolution.phase_1 = phase_1;
        } else {
            let evolv = chains.evolves_to;
            for (let i = 0; i < evolv.length; i++) {
                let stage = [];
                stage.push(phase_1);
                let currentPokemon = evolv[i];
                while (currentPokemon != null && currentPokemon.hasOwnProperty("evolves_to")) {
                    let name = currentPokemon.species.name;
                    let details = currentPokemon.evolution_details;
                    let pokeobj = {
                        name: name,
                        details: details
                    };
                    stage.push(pokeobj);
                    currentPokemon = currentPokemon.evolves_to[0];
                }
                allEvolution["stage" + i] = stage;
            }
        }
        console.log(allEvolution);
        return allEvolution;
    },
    visualizeChain: function (evoChain) {
        let size = Object.keys(evoChain).length;
        if (evoChain.hasOwnProperty("phase_1")) {
            let h3 = document.createElement("h3");
            h3.innerHTML = "Dieses Pokemon enthält keine Entwicklungen";
            return h3;
        }
        let entwicklungsstufen = document.createElement("div");
        entwicklungsstufen.id = "entwicklungsstufen";
        let table = document.createElement("table");
        entwicklungsstufen.appendChild(table);
        for (let i = 0; i < size; i++) {
            let row = document.createElement("tr");
            table.appendChild(row);
            let chain = evoChain["stage" + i];
            for (let j = 0; j < chain.length; j++) {
                this.setObereChain(j, chain[j], chain.length, row);
                if (j != 0) {
                    this.setEvoText(chain[j - 1], chain[j], table);
                }
            }
        }
        return entwicklungsstufen;
    },
    setObereChain: function (j, pokemon, length, row) {
        let td = document.createElement("td");
        let img = document.createElement("img");
        let a = document.createElement("a");
        a.addEventListener("click", function(event){
            router.navigateTo(pokemon.name);
        })
        img.src = imgs_entwicklung + pokemon.name + ".png";
        a.appendChild(img);
        td.appendChild(a);
        row.appendChild(td);
        if (j < length - 1) {
            let td2 = document.createElement("td");
            td2.innerHTML = '<i class="fas fa-long-arrow-alt-right"></i>'
            row.appendChild(td2);
        }
    },
    setEvoText: function (prePokemon, currentPokemon, table) {
        let trigger = currentPokemon.details[0].trigger.name;
        currentPokemon.details = helperViews.minimizeDetails(currentPokemon.details[0]);
        let size = helperViews.getTakenSize(currentPokemon.details);
        let row2 = document.createElement("tr");
        let td2 = document.createElement("td");
        row2.appendChild(td2);
        let p = document.createElement("p");
        td2.appendChild(p);
        td2.colSpan = "10";
        table.appendChild(row2);
        p.innerHTML =evolution_triggers.oneLiner(currentPokemon, prePokemon.name, trigger);
      
    },
}

const evolution_triggers = {
    triggerTranslation:{
        "level-up": " Levelaufstieg ",
        "trade": " Tausch ",
        "use-item": " Gegenstand nutzen ",
        "shed": " Platz im Team und ein Pokéball ",
    },
    evo_translator:{
        "gender":" benötigtes Geschlecht ",
        "held_item": " Getragenes Item ",
        "known_move": " Attacke die das Pokemon beherschen muss ",
        "known_move_type": " Attacke des Types muss bekannt sein ",
        "location":" Ort ",
        "min_affection": " Zuneigung ",
        "min_beauty":" Schönheit",
        "min_happiness": " Glücklich ",
        "min_level" :" mindest Level ",
        "needs_overworld_rain": " Braucht Regen ",
        "party_species" : " party_species ",
        "party_type": " party_type ",
        "relative_physical_stats" : " relative_physical_stats ",
        "time_of_day" :" Zeit des Tages ",
        "trade_species" : " trade_species ",
        "turn_upside_down": " Konsole umdrehen ",
    },
    oneLiner: function(currentPokemon,prePokemonName, trigger){
        let snippet = helperViews.makeFirstLetterCap(prePokemonName)+" Entwickelt sich zu " +helperViews.makeFirstLetterCap(currentPokemon.name)+ " durch <b> "+ evolution_triggers.triggerTranslation[trigger] + "</b>";
        let details = currentPokemon.details;
        for(let prop in details){
            if(prop == "item"){
                snippet+= details[prop].name
            }
            else if( typeof details[prop] === 'object'){
                snippet+=this.evo_translator[prop]+details[prop].name
            }else{
                snippet+= this.evo_translator[prop]+details[prop];
            }
        }
        return snippet;
    }
    
}
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
    getRightLanguage: function (ary, language) {
        let newArray = [];
        for (let i = 0; i < ary.length; i++) {
            if (ary[i].language.name == language) {
                newArray.push({
                    text: ary[i].flavor_text,
                    edition: ary[i].version.name
                })
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
    minimizeDetails: function(details){
        let newDetails = {};
        for (let prop in details) {
            if (details[prop] != null && details[prop] != false && prop != "trigger"){
                newDetails[prop] = details[prop];
            }
        }
        return newDetails;
    },
    
}