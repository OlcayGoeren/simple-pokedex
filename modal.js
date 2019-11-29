"use strict"

const requestsForRegion = {
    kanto: "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151",
    yoto: "https://pokeapi.co/api/v2/pokemon/?offset=151&limit=100",
    hoen: "https://pokeapi.co/api/v2/pokemon/?offset=251&limit=135",
    sinnoh: "https://pokeapi.co/api/v2/pokemon/?offset=386&limit=106",
    pokemon: "https://pokeapi.co/api/v2/pokemon/"
};
var imgs = "https://img.pokemondb.net/sprites/black-white/normal/";
var imgs_entwicklung= "https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/";

const animated = {
    front: "https://img.pokemondb.net/sprites/black-white/normal/",
    front_shiny: "https://img.pokemondb.net/sprites/black-white/shiny/",
    back: "https://img.pokemondb.net/sprites/black-white/back-normal/",
    back_shiny: "https://img.pokemondb.net/sprites/black-white/back-shiny/",
};


let modalHelper = {
    getPokemon: function (name) {
        let pokedata = fetch(requestsForRegion.pokemon+name)
            .then(result => result.json())
            .then(data => {
                return data
            })
        return pokedata;
    }

}

const modal = {
    reqKanto: fetch(requestsForRegion.kanto)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log(error);
        }),
    reqYoto: fetch(requestsForRegion.yoto)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log(error);
        }),
    reqHoen: fetch(requestsForRegion.hoen)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log(error);
        }),
    reqSinnoh: fetch(requestsForRegion.sinnoh)
    .then(response => {
        return response.json()
    })
    .catch(error => {
        console.log(error);
    }),
    reqPokemon: function (name) {
        let promiseA = modalHelper.getPokemon(name);
        let promiseB = Promise.resolve(promiseA);
        promiseB
          .then(function (value) {
              return value
        });
        return promiseB;
    },
    reqSpecies:function(url){
        let promiseA =fetch(url)
         .then(response => {
             return response.json();
         })
         .catch(error => {
            console.log(error);
        });
        return promiseA;
    },
    reqAttack: atk => {
        let url = "https://pokeapi.co/api/v2/move/"+atk;
        let promiseA = fetch(url)
         .then(res => {
             return res.json();
         })
         return promiseA;
    }

};