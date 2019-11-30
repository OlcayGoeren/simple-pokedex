"use strict"

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
        let table = document.createElement("div");
        entwicklungsstufen.appendChild(table);
        for (let i = 0; i < size; i++) {
            let row = document.createElement("div");
            row.className = "row";
            table.appendChild(row);
            let chain = evoChain["stage" + i];
            for (let j = 0; j < chain.length; j++) {
                if (screen.width < 480) {
                    if(j%2==0 && j!=0){
                        let newRow = document.createElement("div");
                        newRow.className="row check";
                        table.appendChild(newRow);
                        this.setObereChain(j, chain[j], chain.length, newRow,true);
                    }else{
                        this.setObereChain(j, chain[j], chain.length, row,true);
                    }
                    if (j!=0 ) {
                        this.setEvoText(chain[j - 1], chain[j], table);
                    }
                } else {
                    this.setObereChain(j, chain[j], chain.length, row);
                    if (j != 0) {
                        this.setEvoText(chain[j - 1], chain[j], table);
                    }
                }
            }
        }
        return entwicklungsstufen;
    },
    setObereChain: function (j, pokemon, length, row, mobile=false) {
        let td = document.createElement("div");
        td.className = "img";
        let img = document.createElement("img");
        let a = document.createElement("a");
        a.addEventListener("click", function (event) {
            router.navigateTo(pokemon.name);
            document.title = helperViews.makeFirstLetterCap(pokemon.name)
        })
        img.src = imgs_entwicklung + pokemon.name + ".png";
        a.appendChild(img);
        td.appendChild(a);
        row.appendChild(td);
        if(mobile==true){
            if(j==1&& length==3){
            }else if (j < length - 1) {
                let td2 = document.createElement("div");
                td2.className = "arrow";
                td2.innerHTML = '<i class="fas fa-long-arrow-alt-right"></i>'
                row.appendChild(td2);
            }
        }else{
            if (j < length - 1) {
                let td2 = document.createElement("div");
                td2.className = "arrow";
                td2.innerHTML = '<i class="fas fa-long-arrow-alt-right"></i>'
                row.appendChild(td2);
            }
        }
        
    },
    setEvoText: function (prePokemon, currentPokemon, table) {
        let trigger = currentPokemon.details[0].trigger.name;
        currentPokemon.details = helperViews.minimizeDetails(currentPokemon.details[0]);
        let row2 = document.createElement("div");
        row2.className = "row";
        let td2 = document.createElement("div");
        td2.className = "evoText";
        row2.appendChild(td2);
        let p = document.createElement("p");
        td2.appendChild(p);
        table.appendChild(row2);
        p.innerHTML = evolution_triggers.oneLiner(currentPokemon, prePokemon.name, trigger);

    },
}

const evolution_triggers = {
    triggerTranslation: {
        "level-up": " Levelaufstieg ",
        "trade": " Tausch ",
        "use-item": " Gegenstand nutzen ",
        "shed": " Platz im Team und ein Pokéball ",
    },
    evo_translator: {
        "gender": " benötigtes Geschlecht ",
        "held_item": " Getragenes Item ",
        "known_move": " Attacke die das Pokemon beherschen muss ",
        "known_move_type": " Attacke des Types muss bekannt sein ",
        "location": " Ort ",
        "min_affection": " Zuneigung ",
        "min_beauty": " Schönheit",
        "min_happiness": " Glücklich ",
        "min_level": " mindest Level ",
        "needs_overworld_rain": " Braucht Regen ",
        "party_species": " party_species ",
        "party_type": " party_type ",
        "relative_physical_stats": " relative_physical_stats ",
        "time_of_day": " Zeit des Tages ",
        "trade_species": " trade_species ",
        "turn_upside_down": " Konsole umdrehen ",
    },
    oneLiner: function (currentPokemon, prePokemonName, trigger) {
        let snippet = helperViews.makeFirstLetterCap(prePokemonName) + " Entwickelt sich zu " + helperViews.makeFirstLetterCap(currentPokemon.name) + " durch <b> " + evolution_triggers.triggerTranslation[trigger] + "</b>";
        let details = currentPokemon.details;
        for (let prop in details) {
            if (prop == "item") {
                snippet += details[prop].name
            } else if (typeof details[prop] === 'object') {
                snippet += this.evo_translator[prop] + details[prop].name
            } else {
                snippet += this.evo_translator[prop] + details[prop];
            }
        }
        return snippet;
    }

}