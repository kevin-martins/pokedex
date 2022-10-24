const pokemonContainerDoc = document.getElementById('pokemonContainer');
const pokemonInfoContainerDoc = document.getElementById('pokemonInfoContainer');
const morePokemonInfoDoc = document.getElementById('morePokemonInfo');

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

//Get the value input
var input = "";
//Used to check if pokemon is already print (not get pokemon occurences)
var pokemonId = [];
//Get pokemon API
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
};

const printNoDamageTo = (damage) => {
    
};

const printNoDamageFrom = (damage) => {
    const list = document.createElement('ul');
    return list.appendChild(damage.map(e => {
        const element = document.createElement('li');
        const name = document.createTextNode(e.name);
        return element.appendChild(name)
    }))
};

const printHalfDamageTo = (damage) => {
    
};

const printHalfDamageFrom = (damage) => {
    //damage.forEach((type) => console.log(type.name));
};

const printDoubleDamageTo = (damage) => {
    
};

const printDoubleDamageFrom = (damage) => {
    const list = document.createElement('ul');
    const element = document.createElement('li');
    const name = document.createTextNode('double_damage_from');
    element.appendChild(name)
    list.appendChild(element)
    damage.forEach(e => {
        console.log(e)
        const element = document.createElement('li');
        const name = document.createTextNode(e.name);
        element.appendChild(name)
        list.appendChild(element)
    })
    return list
};

const printDamageRelations = (damageRelations) => {
    // const fragments = document.createDocumentFragment();
    // const damageVariation = document.createElement('section');
    // console.log(damageRelations)
    // console.log(damageRelations['double_damage_from'])
    // damageVariation.appendChild(printDoubleDamageFrom(damageRelations['double_damage_from']))
    // fragments.appendChild(damageVariation);
    // morePokemonInfoDoc.appendChild(fragments);
    
    // fragments.appendChild(printDoubleDamageTo(damageRelations['double_damage_to']));
    // fragments.appendChild(printHalfDamageFrom(damageRelations['half_damage_from']));
    // fragments.appendChild(printHalfDamageTo(damageRelations['half_damage_to']));
    // fragments.appendChild(printNoDamageFrom(damageRelations['no_damage_from']));
    // fragments.appendChild(printNoDamageTo(damageRelations['no_damage_to']));
    // container.appendChild(printDoubleDamageFrom(damageRelations['double_damage_from']));
};

const printPokemonStats = (stats, statContainerDoc) => {
    const container = document.createElement('div');
    const statRangeDoc = document.createElement('div');
    const statFilledRangeDoc = document.createElement('div');
    const statTypeText = document.createElement('p');
    const statValueText = document.createElement('p');
    const textNode = document.createTextNode(stats.stat.name);
    const statValue = Math.round(stats.base_stat);
    const valueNode = document.createTextNode(statValue);

    container.className = 'statBlock';
    statRangeDoc.className = 'stats';
    statFilledRangeDoc.className = 'wave'
    statValueText.style['margin-top'] = `${(-83 + stats.base_stat * .55)}px`;
    statFilledRangeDoc.style.top = `${(-38 + stats.base_stat * .7)}px`;

    statRangeDoc.appendChild(statFilledRangeDoc);
    statValueText.appendChild(valueNode);
    statRangeDoc.appendChild(statValueText);
    container.appendChild(statRangeDoc);
    statTypeText.appendChild(textNode);
    container.appendChild(statTypeText);
    statContainerDoc.appendChild(container);
    
    return statContainerDoc;
};

const pokemonstats = (pokemon) => {
    const fragments = document.createDocumentFragment();
    const statContainerDoc = document.createElement('section');
    statContainerDoc.className = 'statContainer';
    pokemon.stats.forEach((stats) => {
        fragments.appendChild(printPokemonStats(stats, statContainerDoc));
    });
    return fragments;
};

const printPokemonGameImage = (pokemon) => {
    const pokemonCardImage = document.createElement('div');
    const pokemonGameImageNormal = document.createElement('img');
    const pokemonGameImageShiny = document.createElement('img');

    pokemonGameImageNormal.src = `${pokemon.sprites['front_default']}`;
    pokemonGameImageShiny.src = `${pokemon.sprites['front_shiny']}`;

    pokemonCardImage.appendChild(pokemonGameImageNormal);
    pokemonCardImage.appendChild(pokemonGameImageShiny);
    pokemonCardImage.className = 'pokemonImageCard';
    
    return pokemonCardImage;
};

const pokemonInfo = async (pokemon) => {
    const data = await fetch(`https://pokeapi.co/api/v2/type`);
    const dataTypes = await data.json();
    const pokemonName = document.createElement('h1');
    const name = document.createTextNode(pokemon.name);
    const fragments = document.createDocumentFragment();

    pokemonName.appendChild(name);
    pokemonInfoContainerDoc.classList.add('filter');
    pokemonInfoContainerDoc.classList.remove('filterHidden');
    morePokemonInfoDoc.innerHTML = "";
    fragments.appendChild(pokemonName);
    fragments.appendChild(printPokemonGameImage(pokemon));
    fragments.appendChild(pokemonstats(pokemon));
    await pokemon.types.forEach((elem) => {
        dataTypes.results.forEach(async (type) => {
            if (elem.type.name === type.name) {
                const dataDamageRelation = await fetch(type.url);
                const pokemonDamageRelation = await dataDamageRelation.json();
                // fragments.appendChild(printDamageRelations(pokemonDamageRelation['damage_relations']));
                printDamageRelations(pokemonDamageRelation['damage_relations'])
            }
        })
    });
    morePokemonInfoDoc.appendChild(fragments);
    pokemonInfoContainerDoc.appendChild(morePokemonInfoDoc);
};

//#region Get specific pokemon information and print everything we need from it to the screen

const printPokemon = (pokemon) => {
    const pokemonCard = document.createElement('div');
    pokemonCard.className = "pokemonCard";

    const pokemonName = document.createElement('h1');
    const name = document.createTextNode(`${pokemon.name}`);
    pokemonName.appendChild(name);

    const pokemonImage = document.createElement('img');
    pokemonImage.src = `${pokemon.sprites.other["official-artwork"]["front_default"]}`;
    pokemonImage.onclick = function() { return pokemonInfo(pokemon) };

    pokemonCard.appendChild(pokemonName);
    pokemonCard.appendChild(pokemonImage);
    pokemonCard.appendChild(printPokemonTypes(pokemon));
    return pokemonCard;
};

//#endregion

//#region Loop to print every pokemon

const printAllPokemon = () => {
    const fragments = document.createDocumentFragment();
    pokemonContainerDoc.innerHTML = "";
    pokemonData.forEach((pokemon) => {
        fragments.appendChild(printPokemon(pokemon));
    });
    pokemonContainerDoc.appendChild(fragments);
};

//#endregion

//#region Manage both Type & Name for search

const getPokemonTypeName = () => {
    const fragments = document.createDocumentFragment();
    pokemonContainerDoc.innerHTML = "";
    pokemonId = [];
    pokemonData.forEach((pokemon) => {
        if (pokemon.name.includes(input)) {
            pokemon.types.forEach((elem) => {
                if (dataElem[elem.type.name] && !pokemonId.includes(pokemon.id)) {
                    pokemonId.push(pokemon.id);
                    fragments.appendChild(printPokemon(pokemon));
                }
            });
        }
    });
    pokemonContainerDoc.appendChild(fragments);
};

//#endregion

//#region Check both, button selection & input text

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
};

//#endregion

//#region Manage & Result of input text

const getPokemonName = () => {
    const fragments = document.createDocumentFragment();
    pokemonContainerDoc.innerHTML = "";
    pokemonData.forEach((pokemon) => {
        if (pokemon.name.includes(input)) {
            fragments.appendChild(printPokemon(pokemon));
        }
    });
    pokemonContainerDoc.appendChild(fragments);
};

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

//#region Manage & Result of button selection

const getPokemonType = () => {
    const fragments = document.createDocumentFragment();
    pokemonContainerDoc.innerHTML = "";
    pokemonId = [];
    pokemonData.forEach((pokemon) => {
        pokemon.types.forEach((elem) => {
            if (dataElem[elem.type.name] && !pokemonId.includes(pokemon.id)) {
                pokemonId.push(pokemon.id);
                fragments.appendChild(printPokemon(pokemon));
            }
        });
    });
    pokemonContainerDoc.appendChild(fragments);
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
    const loadingContainerDoc = document.getElementById("loading");
    const interactiveContentDoc = document.getElementById('main');

    loadingContainerDoc.classList.add('loadingHidden');
    loadingContainerDoc.classList.remove('loading');
    interactiveContentDoc.classList.remove('mainHidden');
    printAllPokemon();
};

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
};

//#endregion

const exitModal = (event) => {
    pokemonInfoContainerDoc.classList.remove('filter');
    pokemonInfoContainerDoc.classList.add('filterHidden');
    document.getElementById('morePokemonInfo').classList.add('animate__fadeInRight')
    document.getElementById('morePokemonInfo').classList.remove('animate__fadeOutRight')
};

// Exit animation of the Pokemon Card
document.addEventListener('click', (event) => {
    if (event.target.id === "pokemonInfoContainer") {
        document.getElementById('morePokemonInfo').classList.remove('animate__fadeInRight')
        document.getElementById('morePokemonInfo').classList.add('animate__fadeOutRight')
    }
});

// Call exit Modal when close Modal animation ends
document.getElementById('morePokemonInfo').addEventListener(
    "animationend",
    function(event) {
        const animationOpen = (state) => { return event.target.classList.value.split(' ').includes(state) }
        if (animationOpen("animate__fadeOutRight")) {
            exitModal()
        }
    },
    false
)

// border Pokemon Card whe out of card
document.addEventListener('mouseover', (event) => {
    if (event.target.id === "pokemonInfoContainer") {
        document.getElementById('morePokemonInfo').classList.add('closePokemonInfoCard')
        document.getElementById('morePokemonInfo').classList.remove('openPokemonInfoCard')
    } else {
        document.getElementById('morePokemonInfo').classList.remove('closePokemonInfoCard')
        document.getElementById('morePokemonInfo').classList.add('openPokemonInfoCard')
    }
});

getData();