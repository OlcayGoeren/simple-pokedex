"use strict"

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