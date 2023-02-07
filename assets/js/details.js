const urlParams = new URLSearchParams(window.location.search);
const pokemonNumber = urlParams.get("number");
const nameNumber = document.getElementById("name-number");
const images = document.getElementById("img");
const type = document.getElementById("typeList");
const ability = document.getElementById("abilityList");
const height = document.getElementById("heightValue");
const weight = document.getElementById("weightValue");

function loadPokemon() {
    pokeApi.getSinglePokemon(pokemonNumber)
        .then((pokemon) => {
            nameNumber.innerHTML = pokemon.name + "&nbsp&nbsp&nbsp#" + ("0000" + pokemon.id).slice(-4);
            const {["official-artwork"]: imgUrl} = pokemon.sprites.other;
            images.innerHTML = `
                <img src="${imgUrl.front_default}">
                <img src="${imgUrl.front_shiny}">
            `;
            const types = pokemon.types.map((typeSlot) => typeSlot.type.name);
            type.innerHTML = types.map((type) => `<li class="type ${type}">${type}</li>`).join('');
            const abilities = pokemon.abilities.map((abilitySlot) => abilitySlot.ability.name);
            ability.innerHTML = abilities.map((ability) => `<li>${ability}</li>`).join('');
            height.innerHTML = (pokemon.height / 10) + " m";
            weight.innerHTML = (pokemon.weight / 10) + " kg";
        });
}

loadPokemon();