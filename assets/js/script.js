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

var pokemonId = []

var pokemonData = [];

// async function getPokemonData(index) {
//     const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
//     const pokemon = await res.json();

//     pokemonData.push({
//         name: pokemon.name,
//         id: pokemon.id,
//         image: pokemon.sprites.other["official-artwork"]["front_default"],
//         stats: pokemon.stats,
//         types: pokemon.types
//     });
// }

async function getData(url) {
    const response = await fetch(url);
    return await response.json();
}

const getPokemon = () => {
    for (let i = 1; i < 200; i++) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(res => {
            return res.json()
        }).then((data) => {
            printPokemon(data)
        });
    }
}

// for (let i = 1; i < 2/*data - 219*/; i++) {
//     fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(res => {
//         return res.json()
//     }).then((data) => {
//         pokemonData.push({
//             name: data.name,
//             id: data.id,
//             image: data.sprites.other["official-artwork"]["front_default"],
//             stats: data.stats,
//             types: data.types
//         })
//     }).then(() => console.log(pokemonData[i]));
// }


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

const printPokemon = (pokemon) => {
    const pokemonCard = document.createElement('div');
    pokemonCard.className = "pokemonCard";

    const pokemonName = document.createElement('h1');
    const name = document.createTextNode(`${pokemon.name} n°${pokemon.id}`);
    pokemonName.appendChild(name);

    const pokemonImage = document.createElement('img');
    pokemonImage.src = `${pokemon.sprites.other["official-artwork"]["front_default"]}`;

    const pokemonStats = document.createElement('div');
    pokemonStats.className = 'pokemonStats';
    // pokemon.stats.forEach((elem) => console.log(elem))

    pokemonCard.appendChild(pokemonName);
    pokemonCard.appendChild(pokemonImage);
    pokemonCard.appendChild(pokemonStats);
    pokemonCard.appendChild(printPokemonTypes(pokemon));
    pokemonContainerDoc.appendChild(pokemonCard);

    // pokemonDoc.innerHTML += `<div class="pokemonCard">
    //                             <h2 id="pokemonName">${pokemon.name}</h2>
    //                             <img src="${pokemon.sprites.other["official-artwork"]["front_default"]}" alt="">
    //                             <div class="pokemonStats">
    //                                 <p></p>
    //                             </div>
    //                             <div class="pokemonTypes">
    //                                 <p></p>
    //                             </div>
    //                         </div>`;
}

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
    pokemonSearch();
};

const pokemonSearch = () => {
    console.log('searching');
    pokemonContainerDoc.innerHTML = "";
    pokemonId = [];
    getPokemonType();
};

const getPokemonType = () => {
    for (let i = 1; i < 200; i++) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(res => {
            return res.json()
        }).then((data) => {
            data.types.forEach((elem) => {
                if (dataElem[elem.type.name] && !pokemonId.includes(data.id)) {
                    pokemonId.push(data.id);
                    printPokemon(data);
                }
            })
        });
    }
}

getPokemon();