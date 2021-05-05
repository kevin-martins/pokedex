const pokemonContainerDoc = document.getElementById('pokemonContainer');

const typeColors = {
	normal: "#AAB09F",
	fire: "#eb7a3d",
	water: "#539AE2",
	grass: "#71C558",
	electric: "#E5C531",
	ice: "#70CBD4",
	fighting: "#CB5F48",
	poison: "#B468B7",
	ground: "#CC9F4F",
	flying: "#7DA6DE",
	psychic: "#E5709B",
	bug: "#94BC4A",
	rock: "#B2A061",
	ghost: "#846AB6",
	dragon: "#6A7BAF",
	dark: "#736C75",
	steel: "#89A1B0",
    fairy: "#E397D1",
};

var dataElem = {
    fire: false,
    water: false,
    grass: false,
    bug: false,
    flying: false,
    normal: false,
    poison: false,
    electric: false,
    ground: false,
    fairy: false,
    fighting: false,
    psychic: false,
    rock: false,
    ghost: false,
    ice: false,
    dragon: false,
    dark: false,
    steel: false
};

var input = "";
var pokemonId = [];
var pokemonData = [];

//Return all pokemon's type
const printPokemonTypes = (pokemon) => {
    const pokemonTypes = document.createElement('div');
    pokemonTypes.className = 'pokemonTypes';
    pokemon.types.forEach((elem) => {
        const pokemonType = document.createElement('p');
        const type = document.createTextNode(elem.type.name);
        pokemonType.style.background = typeColors[elem.type.name];
        pokemonType.appendChild(type)
        pokemonTypes.appendChild(pokemonType);
    });
    return pokemonTypes;
}

//Get the pokemon information and print everything we need on the screen
const printPokemon = (pokemon) => {
    const pokemonCard = document.createElement('div');
    pokemonCard.className = "pokemonCard";

    const pokemonName = document.createElement('h1');
    const name = document.createTextNode(`${pokemon.name} | ${pokemon.id}`);
    pokemonName.appendChild(name);

    const pokemonImage = document.createElement('img');
    pokemonImage.src = `${pokemon.sprites.other["official-artwork"]["front_default"]}`;

    // const pokemonStats = document.createElement('div');
    // pokemonStats.className = 'pokemonStats';
    // pokemon.stats.forEach((elem) => console.log(elem))

    pokemonCard.appendChild(pokemonName);
    pokemonCard.appendChild(pokemonImage);
    // pokemonCard.appendChild(pokemonStats);
    pokemonCard.appendChild(printPokemonTypes(pokemon));
    pokemonContainerDoc.appendChild(pokemonCard);
}

const printAllPokemon = () => {
    pokemonContainerDoc.innerHTML = "";
    pokemonData.forEach((pokemon) => {
        printPokemon(pokemon);
    });
}

const getPokemonTypeName = () => {
    pokemonContainerDoc.innerHTML = "";
    pokemonId = [];
    pokemonData.forEach((pokemon) => {
        if (pokemon.name.includes(input)) {
            pokemon.types.forEach((elem) => {
                if (dataElem[elem.type.name] && !pokemonId.includes(pokemon.id)) {
                    pokemonId.push(pokemon.id);
                    printPokemon(pokemon);
                }
            });
        }
    });
}

// Check both, button selection & input text
const checkBothTypeInput = () => {
    const elem = Object.entries(dataElem).map((value) => value[1]).every((value) => !value);

    if (!input && elem) {
        printAllPokemon();
    } else if (input && elem) {
        getPokemonName();
    } else if (!input && !elem) {
        getPokemonType();
    } else if (input && !elem) {
        getPokemonTypeName();
    }
}

//#region Manage input text

const getPokemonName = () => {
    pokemonContainerDoc.innerHTML = "";
    pokemonData.forEach((pokemon) => {
        if (pokemon.name.includes(input)) {
            printPokemon(pokemon);
        }
    });
}

const pokemonInputSearch = (event) => {
    if (event.key == "Backspace") {
        input = input.split('');
        input.pop();
        input = input.join('');
    } else if ("abcdefghijklmnopqrstuvwxyz".includes(event.key)) {
        input += event.key;
    }
    checkBothTypeInput();
};

//#endregion

//#region Manage button selection

const getPokemonType = () => {
    pokemonContainerDoc.innerHTML = "";
    pokemonId = [];
    pokemonData.forEach((pokemon) => {
        pokemon.types.forEach((elem) => {
            if (dataElem[elem.type.name] && !pokemonId.includes(pokemon.id)) {
                pokemonId.push(pokemon.id);
                printPokemon(pokemon);
            }
        });
    });
};

const elementFilter = (elem) => {
    const button = document.getElementById(`${elem}`).classList;
    dataElem[elem] = !dataElem[elem];
    if (dataElem[elem]) {
        button.add(`${elem}Focus`);
        button.remove(`${elem}Unfocus`);
    } else {
        button.remove(`${elem}Focus`);
        button.add(`${elem}Unfocus`);
    }
    checkBothTypeInput();
};

//#endregion

//#region Set screen while data is ready to be used

const preparingData = () => {
    const loadingContainerDoc = document.getElementById("loadingContainer");
    const interactiveContentDoc = document.getElementById('main');

    loadingContainerDoc.classList.add('loadingHidden');
    loadingContainerDoc.classList.remove('loadingContainer');
    interactiveContentDoc.classList.remove('mainHidden');
    printAllPokemon();
}

//#endregion

//#region Fetch data and stock into variable

async function getData() {
    const arrayOfPromise = [];
    for (let i = 1; i < 899; i++) {
        arrayOfPromise.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`));
    }

    Promise.allSettled(arrayOfPromise)
    .then(async (results) => {
        for (result of results) {
            if (result.status === "fulfilled") {
                const data = await result.value.json();
                pokemonData.push(data);
            }
        }
        preparingData();
    })
}

//#endregion

getData();