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
            if (event.target.tagName == "BUTTON"){
                if(event.target.firstElementChild.className.includes("click")){
                    event.target.firstElementChild.classList.remove("click");
                    event.target.firstElementChild.classList.add("minusClick");
                }else{
                    // event.target.firstElementChild.className+=" click"
                    if(event.target.firstElementChild.className.includes("minusClick")){
                        event.target.firstElementChild.classList.remove("minusClick");  
                    }
                    event.target.firstElementChild.classList.add("click");
                    let row = event.target.parentNode.parentNode;
                }
                // createDiv
            }else if(event.target.tagName=="I") {
                if(event.target.className.includes("click")){
                    event.target.classList.remove("click");
                    event.target.classList.add("minusClick");

                }else{
                    if(event.target.className.includes("minusClick")){
                        event.target.classList.remove("minusClick");
                    }
                    // event.target.className+=" click"
                    event.target.classList.add("click");
                    // let row = event.target.parentNode.parentNode.parentNode;
                }
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