const pokemonContainerDoc = document.getElementById('pokemonContainer');
const pokemonInfoContainerDoc = document.getElementById('pokemonInfoContainer');
const morePokemonInfoDoc = document.getElementById('morePokemonInfo');

const elementColors = {
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

var elementSelected = {
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
var searchOption = "selected";
// Store fetch response
var pokemonData = [];

//Return all pokemon's type
const printPokemonTypes = (pokemon) => {
    const pokemonTypes = document.createElement('div');
    pokemonTypes.className = 'pokemonTypes';
    pokemon.types.forEach((elem) => {
        const pokemonType = document.createElement('p');
        const type = document.createTextNode(elem.type.name);
        pokemonType.style.background = elementColors[elem.type.name];
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

const damageRelation = (damageRelations) => {
    
    
    
    // fragments.appendChild(printDoubleDamageTo(damageRelations['double_damage_to']));
    // fragments.appendChild(printHalfDamageFrom(damageRelations['half_damage_from']));
    // fragments.appendChild(printHalfDamageTo(damageRelations['half_damage_to']));
    // fragments.appendChild(printNoDamageFrom(damageRelations['no_damage_from']));
    // fragments.appendChild(printNoDamageTo(damageRelations['no_damage_to']));
    // container.appendChild(printDoubleDamageFrom(damageRelations['double_damage_from']));
};

const pokemonDamageRelations = (pokemon) => {
    const fragments = document.createDocumentFragment();

    const damageVariation = document.createElement('section');
    damageVariation.appendChild(printDoubleDamageFrom(damageRelations['double_damage_from']))
    fragments.appendChild(damageVariation);
    morePokemonInfoDoc.appendChild(fragments);
    return 
}

const displayPokemonStats = (stats, statContainerDoc) => {
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
        fragments.appendChild(displayPokemonStats(stats, statContainerDoc));
    });
    return fragments;
};

const pokemonGameApearence = (pokemon) => {
    const pokemonCardImage = document.createElement('div');
    const pokemonGameImageNormal = document.createElement('img');
    const pokemonGameImageShiny = document.createElement('img');

    // pokemonGameImageNormal.src = `${pokemon.sprites['front_default']}`;
    // pokemonGameImageShiny.src = `${pokemon.sprites['front_shiny']}`;

    pokemonCardImage.appendChild(pokemonGameImageNormal);
    pokemonCardImage.appendChild(pokemonGameImageShiny);
    pokemonCardImage.className = 'pokemonImageCard';
    
    return pokemonCardImage;
};

const pokemonDetail = async (pokemon) => {
    const pokemonName = document.createElement('h1');
    const name = document.createTextNode(pokemon.name);
    const fragments = document.createDocumentFragment();

    pokemonName.appendChild(name);
    pokemonInfoContainerDoc.classList.add('filter');
    pokemonInfoContainerDoc.classList.remove('filterHidden');
    morePokemonInfoDoc.innerHTML = "";
    fragments.appendChild(pokemonName);
    // fragments.appendChild(pokemonGameApearence(pokemon));
    fragments.appendChild(pokemonstats(pokemon));
    // fragments.appendChild(pokemonDamageRelations(pokemon));

    morePokemonInfoDoc.appendChild(fragments);
    pokemonInfoContainerDoc.appendChild(morePokemonInfoDoc);
};

//#region Display pokemon's card

const createPokemonCard = (pokemon) => {
    const pokemonCard = document.createElement('div');
    pokemonCard.className = "pokemonCard";

    const pokemonName = document.createElement('h1');
    const name = document.createTextNode(`${pokemon.name}`);
    pokemonName.appendChild(name);

    const pokemonImage = document.createElement('img');
    pokemonImage.src = `${pokemon.sprite}`;

    pokemonCard.onclick = () => { return pokemonDetail(pokemon) };

    pokemonCard.appendChild(pokemonName);
    pokemonCard.appendChild(pokemonImage);
    pokemonCard.appendChild(printPokemonTypes(pokemon));
    return pokemonCard;
};

const displayPokemons = (newPokemonData, reset = true) => {
    const fragments = document.createDocumentFragment();
    if (reset) resetPokemonsCards();
    newPokemonData.forEach((pokemon) => {
        fragments.appendChild(createPokemonCard(pokemon));
    });
    pokemonContainerDoc.appendChild(fragments);
};

//#endregion

//#region Search treatment

const getPokemonsByTypeAndName = () => {
    return pokemonData.reduce((acc, cur) => {
        if (cur.name.includes(input)) {
            cur.types.forEach((elem) => {
                if (elementSelected[elem.type.name]) {
                    acc.push(cur);
                }
            });
        }
        return acc;
    });
};

const getPokemonsByOption = (newPokemonData) => {
    if (searchOption === 'all') return getPokemonsByAllSelectedElements(newPokemonData);
    else if (searchOption === 'atleast') return getPokemonsByAtLeastSelectedElement(newPokemonData);
    return getPokemonsBySelectedElement(newPokemonData);
}

const getPokemonsBySelectedElement = (newPokemonData) => {
    const typeSelected = Object.entries(elementSelected).reduce((acc, cur) => {
        if (cur[1])
            acc.push(cur[0])
        return acc;
    }, []);

    return newPokemonData.reduce((acc, cur) => {
        cur.types.forEach((elem) => {
            if (typeSelected.includes(elem.type.name)) 
                acc.push(cur);
        })
        // console.log('here:', cur)
        return acc;
    }, []);
}

const getPokemonsByAtLeastSelectedElement = (newPokemonData) => {
    const typeSelected = Object.entries(elementSelected).reduce((acc, cur) => {
        if (cur[1])
            acc.push(cur[0]);
        return acc;
    }, []);

    return newPokemonData.reduce((acc, cur) => {
        const pokemonTypes = [];
        cur.types.forEach((elem) => {
            pokemonTypes.push(elem.type.name)
        })
        if (pokemonTypes.map(type => typeSelected.includes(type)).some(value => value === true))
            acc.push(cur);
        return acc;
    }, []);
}

const getPokemonsByAllSelectedElements = (newPokemonData) => {
    const pokemons = [];
    const typeSelected = Object.entries(elementSelected).reduce((acc, cur) => {
        if (cur[1])
            acc.push(cur[0])
        return acc;
    }, []);

    return newPokemonData.reduce((acc, cur) => {
        const pokemonTypes = []
        cur.types.forEach((elem) => {
            pokemonTypes.push(elem.type.name)
        })
        if (typeSelected.map(type => pokemonTypes.includes(type)).every(value => value === true)) {
            acc.push(cur);
        }
        return acc;
    }, []);
    // switch (typeSelected.length) {
    //     case 1:
    //         newPokemonData.forEach((pokemon) => {
    //             pokemon.types.forEach((elem) => {
    //                 if (typeSelected.includes(elem.type.name)) 
    //                     pokemons.push(pokemon);
    //             })
    //         });
    //         break;
    //     case 2:
    //         newPokemonData.forEach((pokemon) => {
    //             const pokemonTypes = []
    //             pokemon.types.forEach((elem) => {
    //                 pokemonTypes.push(elem.type.name)
    //             })
    //             if (typeSelected.map(type => pokemonTypes.includes(type)).every(value => value === true)) {
    //                 pokemons.push(pokemon);
    //             }
    //         });
    //         break;
    //     default:
    //         break;
    // }
    // return pokemons;
};

const getElementsByType = (newPokemonData) => {
    const typeSelected = Object.entries(elementSelected).reduce((acc, cur) => {
        if (cur[1])
            acc.push(cur[0])
        return acc;
    }, []);

    return newPokemonData.reduce((acc, cur) => {
        cur.types.forEach(pokemon => {
            if (typeSelected.includes(pokemon.type.name))
                acc.push(cur)
        })
        return acc;
    }, []);
}

const getPokemonsByName = (newPokemonData) => {
    return newPokemonData.reduce((acc, cur) => {
        if (cur.name.includes(input))
            acc.push(cur);
        return acc;
    }, []);
};

const hideCardsById = () => {
    pokemonContainerDoc.querySelector("#child")
}

const checkUserEntries = () => {
    const noTypeSelected = Object.entries(elementSelected).map((value) => value[1]).every((value) => value === false);
    resetPokemonsCards();
    var newPokemonData = pokemonData;

    if (input.length > 0) newPokemonData = getPokemonsByName(newPokemonData);
    if (!noTypeSelected) {
        newPokemonData = getElementsByType(newPokemonData);
        newPokemonData = getPokemonsByOption(newPokemonData);
    }
    hideCardsById()
    // checkOccur(pokemonData);
    // console.log(newPokemonData)
    // if (!input && elem) {
    //     displayAllPokemons();
    // } else if (input && elem) {
    //     getPokemonsByName();
    // } else if (!input && !elem) {
    //     getPokemonsByAllSelectedElements();
    // } else if (input && !elem) {
    //     getPokemonsByTypeAndName();
    // }
    displayPokemons(newPokemonData);
};

//#endregion

//#region User search

const inputSearch = (event) => {
    if (event.key == "Backspace") {
        input = input.split('');
        input.pop();
        input = input.join('');
    } else if ("abcdefghijklmnopqrstuvwxyz".includes(event.key)) {
        input += event.key;
    }
    checkUserEntries();
};

const switchButton = (event) => {
    if (event.target.value != searchOption)
        searchOption = event.target.value;
    checkUserEntries();
}

const filterType = (elem) => {
    const button = document.getElementById(`${elem}`).classList;
    elementSelected[elem] = !elementSelected[elem];
    if (elementSelected[elem]) {
        button.add(`${elem}Focus`);
        button.remove(`${elem}Unfocus`);
    } else {
        button.remove(`${elem}Focus`);
        button.add(`${elem}Unfocus`);
    }
    checkUserEntries();
};

//#endregion

//#region Fetch, stock and display data

async function main() {
    const arrayOfPromise = [];
    for (let i = 1; i < 899; i++) {
        arrayOfPromise.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`));
    }

    Promise.allSettled(arrayOfPromise)
    .then(async (results) => {
        for (result of results) {
            if (result.status === "fulfilled") {
                const data = await result.value.json();
                // console.log(data.types.forEach(async (type) => {
                //     fetch(type.type.url).then(res => res.json())
                // }))
                
                pokemonData.push({
                    id: data.id,
                    name: data.name,
                    stats: data.stats,
                    types: data.types,
                    sprite: data.sprites.other["official-artwork"]["front_default"],
                    names: fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.id}/`)
                        .then(res => res.json())
                        .then(res => res.names),
                    ['damage-relation']: data.types.map(async (type) => {
                        fetch(type.type.url)
                            .then(res => res.json())
                            .then(res => res["damage-relations"])
                    })
                });
            }
        }
    })
    .then(() => {
        checkOccur(pokemonData);
        addClassById('loading', 'loadingHidden');
        removeClassById('loading', 'loading');
        removeClassById('main', 'mainHidden');
        displayPokemons(pokemonData, false);
    });
};

const checkOccur = (data) => {
    const id = []
    data.forEach((pokemon) => {
        if (!id.includes(pokemon.id)) {
            id.push(pokemon.id);
        } else
            console.log('occurence found on: ', pokemon.name);
    });
}

//#endregion

const resetPokemonsCards = () => { return pokemonContainerDoc.innerHTML = ""; }

const addClassById = (id, className) => document.getElementById(id).classList.add(className);

const removeClassById = (id, className) => document.getElementById(id).classList.remove(className);

const exitModal = (event) => {
    pokemonInfoContainerDoc.classList.remove('filter');
    pokemonInfoContainerDoc.classList.add('filterHidden');
    addClassById('morePokemonInfo', 'animate__fadeInRight')
    removeClassById('morePokemonInfo', 'animate__fadeOutRight')
};

// Exit animation of the Pokemon Card
document.addEventListener('click', (event) => {
    if (event.target.id === "pokemonInfoContainer") {
        removeClassById('morePokemonInfo', 'animate__fadeInRight')
        addClassById('morePokemonInfo', 'animate__fadeOutRight')
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
        addClassById('morePokemonInfo', 'closePokemonInfoCard')
        removeClassById('morePokemonInfo', 'openPokemonInfoCard')
    } else {
        removeClassById('morePokemonInfo', 'closePokemonInfoCard')
        addClassById('morePokemonInfo', 'openPokemonInfoCard')
    }
});

main();