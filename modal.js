"use strict"

const requestsForRegion = {
    kanto: "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151",
    yoto: "https://pokeapi.co/api/v2/pokemon/?offset=151&limit=100",
    hoen: "https://pokeapi.co/api/v2/pokemon/?offset=251&limit=135"
};
var imgs = "https://img.pokemondb.net/sprites/ruby-sapphire/normal/";


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

};