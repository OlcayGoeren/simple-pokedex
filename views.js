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
                        let h3 = ele.querySelector("h3").innerHTML
                        let h3_lower = h3.toLowerCase();
                        router.navigateTo(h3_lower);
                        document.title = h3;
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

    setMain: function () {
        let main = document.createElement("div");
        main.id = "eintrag";
        let name = document.createElement("div");
        name.id = "name";
        let pokedexEintrag = document.createElement("div");
        pokedexEintrag.id = "pokedexeintrag";
        pokedexEintrag.className = "maxBreite"
        let entwicklungen = document.createElement("div");
        entwicklungen.id = "entwicklungen";
        let faehigkeiten = document.createElement("div");
        faehigkeiten.id = "faehigkeiten";
        let baseStats = document.createElement("div");
        baseStats.id = "baseStats";
        let schwaeche = document.createElement("div");
        schwaeche.id = "schwaeche";
        let attacken = document.createElement("div");
        attacken.id = "attacken";
        main.appendChild(name);
        main.appendChild(pokedexEintrag);
        main.appendChild(entwicklungen);
        main.appendChild(faehigkeiten);
        main.appendChild(baseStats);
        main.appendChild(schwaeche);
        main.appendChild(attacken);
        return main;
    },
    createSectionHeader: function (title) {
        let sectionHeader = document.createElement("div");
        sectionHeader.className = "sectionHeader";
        sectionHeader.innerHTML = "<h1>" + title + "</h1>"
        return sectionHeader;
    },

    createPokemon: function (data, main) {
        let name = main.querySelector("#name");
        this.createName(name, {
            index: data.game_indices[0].game_index,
            name: data.name
        });
        let pokedexEintrag = main.querySelector("#pokedexeintrag");
        this.createEintrag(pokedexEintrag, {
            types: data.types,
            name: data.name
        });
        let baseStats = main.querySelector("#baseStats");
        this.createStats(data.stats, baseStats);

        let schwaeche = main.querySelector("#schwaeche");
        this.createSchwaeche(schwaeche, data.types);

        let atks = main.querySelector("#attacken");
        this.createAttackList(atks, data);
    },

    createName: function (div, data) {
        div.innerHTML = `
        <button> <i class="fas fa-long-arrow-alt-left fa-2x"></i> </button>
            <h1>` + helperViews.makeFirstLetterCap(data.name) + " #" + data.index + `</h1>
            <span></span>
        `;
        let button = div.querySelector("button");
        button.addEventListener("click", function () {
            let value = document.getElementById("changer").value
            router.navigateTo(value);
            document.title = helperViews.makeFirstLetterCap(document.getElementById("changer").value);
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
        type.id = "type";
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
        let entwicklungen = div.querySelector("#entwicklungen");
        let sectionHeader = this.createSectionHeader("Entwicklungen")
        entwicklungen.appendChild(sectionHeader);
        let evoChain = evoChainHelper.getEvos(data);
        let element = evoChainHelper.visualizeChain(evoChain);
        entwicklungen.appendChild(element);
    },
    createFaehigkeit: function (abbilities) {
        let faehigkeiten = document.getElementById("faehigkeiten");
        let header = this.createSectionHeader("Fähigkeiten");
        faehigkeiten.appendChild(header);
        let abilitiesDiv = document.createElement("div");
        abilitiesDiv.className = "abbilities maxBreite";
        faehigkeiten.appendChild(abilitiesDiv);
        let table = document.createElement("table");
        for (let i = 0; i < abbilities.length; i++) {
            let tr = document.createElement("tr");
            table.appendChild(tr);
            let name = document.createElement("td");
            name.innerHTML = helperViews.makeFirstLetterCap(abbilities[i].ability.name);
            tr.appendChild(name);
            let versteckt = document.createElement("td");
            if (abbilities[i].is_hidden) versteckt.innerHTML = "Versteckte Fähigkeit"
            else versteckt.innerHTML = "Normale Fähigkeit";
            tr.appendChild(versteckt);
        }
        abilitiesDiv.appendChild(table);
    },
    createStats: function (basestats, baseStats) {

        let header = this.createSectionHeader("Statuswerte");
        baseStats.appendChild(header);
        let stats = document.createElement("div");
        stats.className = "stats maxBreite";
        baseStats.appendChild(stats);
        let table = document.createElement("table");
        stats.appendChild(table);
        for (let i = 0; i < basestats.length; i++) {
            let tr = document.createElement("tr");
            let statname = document.createElement("td");
            table.appendChild(tr);
            tr.appendChild(statname);
            statname.innerHTML = helperViews.makeFirstLetterCap(basestats[i].stat.name);
            let statbar = document.createElement("td");
            tr.appendChild(statbar);
            let stat = document.createElement("div")
            stat.className = "stat";
            statbar.appendChild(stat);
            let progress = document.createElement("div");
            progress.className = "progress";
            stat.appendChild(progress);
            let num = basestats[i].base_stat;
            let percent = (num * 100) / 150;

            progress.innerHTML += num;
            progress.style = "width: " + percent + "%";

        }



    },
    createSchwaeche: function (div, data) {
        let header = this.createSectionHeader("Schwächen");
        div.appendChild(header);
        let schwaeche = types.calculateWeakness(data);
        let table = document.createElement("table");
        for (let prop in schwaeche) {
            let tr = document.createElement("tr");
            table.appendChild(tr);
            let factor = document.createElement("td");
            factor.innerHTML = prop;
            tr.appendChild(factor);
            let obj = schwaeche[prop];
            for (let prop2 in obj) {
                let type = document.createElement("span");
                type.innerHTML = prop2;
                type.className = prop2;
                tr.appendChild(type);
            }
        }
        div.appendChild(table);
    },
    createAttackList: function (div, data) {
        // attacken organisieren
        let moves = data.moves;
        let org = attackenHelper.getOrganized(moves);
        let level_up = org.level_up;
        let tutor = org.tutor;
        let machine = org.machine;
        //
        // dom setten
        div.appendChild(this.createSectionHeader("Attacken"));
        let allAttacks = document.createElement("div");
        allAttacks.classList = "alleAttacken maxBreite";
        div.appendChild(allAttacks);
        let erlernbar = attackenHelper.getHeader("Erlernbare ");
        let perTutor = attackenHelper.getHeader("Durch Tutor");
        let perMachine = attackenHelper.getHeader("Durch TM");
        allAttacks.appendChild(erlernbar);
        allAttacks.appendChild(perTutor);
        allAttacks.appendChild(perMachine);
        let erlernbar_table = attackenHelper.getTable(level_up, "erlernbare");
        erlernbar.after(erlernbar_table);
        let machine_table = attackenHelper.getTable(machine, "durch_tm");
        machine_table.hidden = true;
        perMachine.after(machine_table);
        let tutor_table = attackenHelper.getTable(tutor, "durch_tutor");
        tutor_table.hidden = true;
        perTutor.after(tutor_table);
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
        a.addEventListener("click", function (event) {
            router.navigateTo(pokemon.name);
            document.title = helperViews.makeFirstLetterCap(pokemon.name)
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

const faehigkeitenHelper = {
    findRightText: function (language, data, i) {
        let text = helperViews.getRightLanguage(data.flavor_text_entries, language, false);
        let tr = document.querySelectorAll(".abbilities tr");
        let td = document.createElement("td");
        td.innerHTML = text;
        tr[i].appendChild(td);
    }
}

const types = {
    normal: function () {
        let obj = {};
        obj.zero = this.getWeakness(["ghost"], 0);
        obj.half = this.getWeakness(["rock", "steel"], 1 / 2);
        return obj;
    },
    fire: function () {
        let obj = {};
        obj.double = this.getWeakness(["grass", "ice", "bug", "steel"], 2);
        obj.half = this.getWeakness(["fire", "water", "rock", "dragon"], 1 / 2);
        return obj;
    },
    water: function () {
        let obj = {};
        obj.double = this.getWeakness(["fire", "rock", "ground"], 2);
        obj.half = this.getWeakness(["water", "grass", "dragon"], 1 / 2);
        return obj;
    },
    electric: function () {
        let obj = {};
        obj.double = this.getWeakness(["water", "flying"], 2);
        obj.half = this.getWeakness(["electric", "grass", "dragon"], 1 / 2);
        obj.zero = this.getWeakness(["ground"], 0);
        return obj;
    },
    grass: function () {
        let obj = {};
        obj.double = this.getWeakness(["water", "ground", "rock"], 2);
        obj.half = this.getWeakness(["fire", "grass", "poison", "flying", "bug", "dragon", "steel"], 1 / 2);
        return obj;
    },
    ice: function () {
        let obj = {};
        obj.double = this.getWeakness(["grass", "ground", "flying", "dragon"], 2);
        obj.half = this.getWeakness(["fire", "water", "ice", "steel"], 1 / 2);
        return obj;
    },
    fighting: function () {
        let obj = {};
        obj.double = this.getWeakness(["normal", "rock", "steel", "ice", "dark"], 2);
        obj.half = this.getWeakness(["flying", "bug", "poison", "psychic", "fairy"], 1 / 2);
        obj.zero = this.getWeakness(["ghost"], 0);
        return obj
    },
    poison: function () {
        let obj = {};
        obj.double = this.getWeakness(["grass", "fairy", "rock"], 2);
        obj.half = this.getWeakness(["poison", "ground", "rock", "ghost"], 1 / 2);
        obj.zero = this.getWeakness(["steel"], 0);
        return obj;
    },
    ground: function () {
        let obj = {};
        obj.double = this.getWeakness(["poison", "rock", "steel", "fire", "electric"], 2);
        obj.half = this.getWeakness(["bug", "grass"], 1 / 2);
        obj.zero = this.getWeakness(["flying"], 0);
        return obj;
    },
    flying: function () {
        let obj = {};
        obj.double = this.getWeakness(["fight", "bug", "grass", "fairy"], 2);
        obj.half = this.getWeakness(["rock", "steel", "electric"], 1 / 2);
        return obj;
    },
    psychic: function () {
        let obj = {};
        obj.double = this.getWeakness(["fight", "poison"], 2);
        obj.half = this.getWeakness(["psychic", "steel"], 1 / 2);
        obj.zero = this.getWeakness(["dark"], 0);
        return obj;
    },
    bug: function () {
        let obj = {};
        obj.double = this.getWeakness(["grass", "psychic", "dark"], 2);
        obj.half = this.getWeakness(["fire", "fight", "poison", "flying", "ghost", "steel", "fairy"], 1 / 2);
        return obj;
    },
    rock: function () {
        let obj = {};
        obj.double = this.getWeakness(["fire", "grass", "flying", "bug"], 2);
        obj.half = this.getWeakness(["fight", "ground", "steel"], 1 / 2);
        return obj;
    },
    ghost: function () {
        let obj = {};
        obj.double = this.getWeakness(["psychic", "ghost"], 2);
        obj.half = this.getWeakness(["dark"], 1 / 2);
        obj.zero = this.getWeakness(["normal"], 0);
        return obj;
    },
    dragon: function () {
        let obj = {};
        obj.double = this.getWeakness(["dragon"], 2);
        obj.half = this.getWeakness(["steel"], 1 / 2);
        obj.zero = this.getWeakness(["fairy"], 0);
        return obj;
    },
    dark: function () {
        let obj = {};
        obj.double = this.getWeakness(["psychic", "ghost"], 2);
        obj.half = this.getWeakness(["flying", "dark", "fairy"], 1 / 2);
        return obj;
    },
    steel: function () {
        let obj = {};
        obj.double = this.getWeakness(["ice", "rock", "fairy"], 2);
        obj.half = this.getWeakness(["fire", "water", "electric", "steel"], 1 / 2);
        return obj;
    },
    fairy: function () {
        let obj = {};
        obj.double = this.getWeakness(["fight", "dragon", "dark"], 2);
        obj.half = this.getWeakness(["fire", "poison", "steel"], 1 / 2);
        return obj;
    },
    getWeakness: function (types, weak) {
        let obj = {};
        types.forEach(x => {
            obj[x] = weak;
        })
        return obj;
    },
    calculateWeakness: function (typen) {
        let ary = [];
        let newtype = {};
        for (let i = 0; i < typen.length; i++) {
            if (typen.length > 1) {
                ary.push(types[typen[i].type.name]());
            } else {
                let x = types[typen[i].type.name]();
                newtype = x;
            }
        }
        if (typen.length > 1) {
            if (ary[0].hasOwnProperty("double") && ary[1].hasOwnProperty("double")) {
                for (let prop in ary[0].double) {
                    if (ary[1].double.hasOwnProperty(prop)) {
                        let fourfold = {};
                        fourfold[prop] = 4;
                        newtype.fourfold = fourfold;
                        delete ary[0].double[prop];
                        delete ary[1].double[prop];
                    }
                }
                newtype.double = Object.assign(ary[0].double, ary[1].double);
            };
            if (ary[0].hasOwnProperty("half") && ary[1].hasOwnProperty("half")) {
                for (let prop in ary[0].half) {
                    if (ary[1].half.hasOwnProperty(prop)) {
                        let quarter = {};
                        quarter[prop] = 1 / 4
                        newtype.quarter = quarter;
                        delete ary[0].half[prop];
                        delete ary[1].half[prop];
                    }
                }
                newtype.half = Object.assign(ary[0].half, ary[1].half);
            };
            if (ary[0].hasOwnProperty("zero") && ary[1].hasOwnProperty("zero")) {
                newtype.zero = Object.assign(ary[0].zero, ary[1].zero);
            }
        }
        return newtype;
    }
}

const attackenHelper = {
    getOrganized: function (moves) {
        let machine = [];
        let tutor = [];
        let level_up = [];
        for (let i = 0; i < moves.length; i++) {
            let version_group_details = moves[i].version_group_details;
            for (let j = 0; j < version_group_details.length; j++) {
                if (version_group_details[j].version_group.name = "ultra-sun-ultra-moon") {
                    if (version_group_details[j].move_learn_method.name == "tutor") {
                        moves[i].version_group_details = version_group_details.filter(x => {
                            if (x.version_group.name == "ultra-sun-ultra-moon") return true
                        })
                        tutor.push(moves[i]);
                    }
                    if (version_group_details[j].move_learn_method.name == "machine") {
                        moves[i].version_group_details = version_group_details.filter(x => {
                            if (x.version_group.name == "ultra-sun-ultra-moon") return true

                        })
                        machine.push(moves[i]);
                    }
                    if (version_group_details[j].move_learn_method.name == "level-up") {

                        moves[i].version_group_details = version_group_details.filter(x => {
                            if (x.version_group.name == "ultra-sun-ultra-moon") return true
                        })
                        level_up.push(moves[i]);
                    }
                    break;
                }
            }
        }
        return {
            machine: machine,
            tutor: tutor,
            level_up: level_up
        };
    },
    getHeader: function (string) {
        let div = document.createElement("div");
        div.className = "wieErlernbar";
        div.innerHTML = "<h1>" + string + "</h1> <i class='fas fa-chevron-down fa-2x'></i>";
        let i = div.querySelector("i");
        i.addEventListener("click", function (event) {
            let section = event.target.parentNode.innerText.toLowerCase();
            console.log(section)
            let table;
            if (section == "erlernbare") table = document.querySelector(".erlernbare");
            if (section == "durch tutor") table = document.querySelector(".durch_tutor")
            if (section == "durch tm") table = document.querySelector(".durch_tm");
            table.hidden = !table.hidden;
            console.log(table);
        })
        return div;
    },
    getTable: function(type,string){
        let table = document.createElement("div");
        table.className=string+" table";
        let row = document.createElement("div");
        row.className="row";

        let td2= document.createElement("span");
        let td3 = document.createElement("span");
        table.appendChild(row);

        if(string =="erlernbare"){
            let td1 = document.createElement("span");
            td1.innerHTML = "Level";
            row.appendChild(td1);
        }
        row.appendChild(td2);
        row.appendChild(td3);
        td2.innerHTML = "Name";
        td3.innerHTML="Mehr Info"
        this.setTable(type, table);

        return table;
    },
    setTable: function (type, table) {
        if (table.className == "erlernbare table") {
            type = type.sort((a, b) => {
                return a.version_group_details[0].level_learned_at - b.version_group_details[0].level_learned_at;
            })
        }
        for (let i = 0; i < type.length; i++) {
            let name = type[i].move.name;
            let row = document.createElement("div");
            if(i%2==0) row.className="row first"
            else row.className="row second"
            
            let tdName = document.createElement("span");
            let tdLvl;
            if (table.className == "erlernbare table") {
                tdLvl = document.createElement("span");
                row.appendChild(tdLvl)
            }

            let tdButton = document.createElement("span");
            if (table.className == "erlernbare table") {
                let level = type[i].version_group_details[0].level_learned_at;
                tdLvl.innerHTML = level;
            }
            tdName.innerHTML = helperViews.makeFirstLetterCap(name);
            tdButton.innerHTML = "<button> <i class='fas fa-angle-right'></i>  </button>"

            table.appendChild(row);
            row.appendChild(tdName);
            row.appendChild(tdButton);
        }

        table.addEventListener("click", function (event) {
            console.log("CREATE DIVVV")
            if (event.target.tagName == "BUTTON"){
                event.target.firstElementChild.className+=" click"
                let row = event.target.parentNode.parentNode;
                // createDiv
            }else if(event.target.tagName=="I") {
                event.target.className+=" click"
                let row = event.target.parentNode.parentNode.parentNode;
                // createDiv
            }

        })
                // for (let i = 0; i < event.path.length; i++) {
                //     if (event.path[i].tagName == "TR") {
                //         let atk = event.path[i].querySelector(".styleName").innerHTML.toLowerCase();
                //         presenterHelper.eventAttack(atk, data => {
                //             console.log("aus den daten das wichtigste herrausgewinnen und neues div erstellen und einfügen")
                //             console.log(data.damage_class)
                //             // console.log(data.accuracy);
                //             // console.log(data.pp)
                //             // console.log(data.power);
                //             // console.log(data.type.name);
                //             // console.log(data.machines)
                //             // console.log(data.target)
                //             // console.log(data.damage_class)
                //             // console.log(helperViews.getRightLanguage(data.flavor_text_entries, "de", "ultra-sun-ultra-moon"));
                //             // console.log(data)
                //             let div = attackenHelper.createDiv(data);
                //             event.path[i].after(div);
                //             console.log(div)
                //         });


                //     }
                // }
            // }
        // })
    },

    createDiv: function (data) {
        let div = document.createElement("div");
        div.className="test123";
        let info = []
        for(let i=0;i<4;i++){
            let span =document.createElement("span") 
            info.push(span);
            div.appendChild(span);
        }
        info[0].innerHTML= data.type.name;
        info[1].innerHTML= data.damage_class.name;
        info[2].innerHTML= data.target.name;
        info[3].innerHTML = data.machines;
        return div;
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