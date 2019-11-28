"use strict"

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