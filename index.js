class Shelf {
    constructor(user) {
        this.user = user;
        this.userShelf = [];
    }

    addGame(gameInfo) {
        const { title, year, genre, developer, publisher, rating, played, logo} = gameInfo;
        const newGame = new Gamecard(title, year, genre, developer, publisher, rating, played, logo);
        this.userShelf.push(newGame);
        displayCard(newGame);
    }

    deleteGame(game, card) {
        const index = this.userShelf.findIndex(element => element.id === game.id);
        this.userShelf.splice(index, 1);
        card.remove();
    }
}

const eliasGames = new Shelf("Elias");
const header = document.querySelector("header p");
header.textContent = `${eliasGames.user} games`;

class Gamecard {
    constructor(title, year, genre, developer, publisher, rating, played, logo) {
        this.title = title;
        this.year = year;
        this.genre = genre;
        this.developer = developer;
        this.publisher = publisher;
        this.rating = rating;
        this.played = played;
        this.logo = logo;
        this.id = this.generateID();
    }

    generateID() {
        return Math.random().toString(36).substring(2, 15);
    }
}

const addGameButton = document.querySelector(".add-button");
addGameButton.addEventListener("click", gameForm);

function cardEventHandler(elements, game, gameCard) {
    elements.forEach(element => {
        if (element.getAttribute("data-event") === "get-info") {
            element.addEventListener("click", function() {
                console.log(JSON.stringify(game, null, 2));
            });
        }
        if (element.getAttribute("data-event") === "delete-card") {
            element.addEventListener("click", function() {
                eliasGames.deleteGame(game, gameCard);
            });
        }
    });
}

function displayCard(game) {
    const shelf = document.querySelector(".shelf");
    const gameCard = document.createElement("div");
    const gameImg = document.createElement("img");
    const gameImgWrap = document.createElement("div");
    const gameInfo = document.createElement("div");
    const title = document.createElement("p");
    const year = document.createElement("p");
    const deleteButton = document.createElement("button");

    gameCard.classList.add("game-card");
    gameInfo.classList.add("game-info");
    title.classList.add("title");
    year.classList.add("year");
    gameImg.classList.add("game-image");
    gameImgWrap.classList.add("image-wrapper");
    deleteButton.classList.add("game-delete");

    gameImg.setAttribute("src", game.logo);
    gameImgWrap.setAttribute("data-event", "get-info");
    deleteButton.setAttribute("data-event", "delete-card");

    title.textContent = `${game.title}`;
    year.textContent = `${game.year}`;
    deleteButton.textContent = "X";
    
    shelf.append(gameCard);
    gameCard.append(gameImgWrap, gameInfo);
    gameImgWrap.append(gameImg, deleteButton);
    gameInfo.append(title, year);
    
    cardEventHandler([gameImgWrap, deleteButton], game, gameCard);
}

function displaySearch(gameList) {
    const searchedItems = document.querySelectorAll(".game-list li");
    const searchList = document.querySelector(".game-list");
    const searchInput = document.querySelector("#title");
    searchList.classList.remove("hidden");

    searchedItems.forEach((gameName, index) => {
        gameName.textContent = gameList[index];
    })

    const selectGame = function() {

    }

    console.log(searchList);
}


function gameForm() {
    const gameForm = document.querySelector(".game-form");
    const searchName = document.querySelector("#title");
    const searchedItems = document.querySelectorAll(".game-list li");
    const searchList = document.querySelector(".game-list");
    const submitButton = document.querySelector("#submit");
    gameForm.classList.remove("hidden");

    const gameInfo = {
            title : "",
            year : "",
            genre : "",
            developer : "",
            publisher : "",
            rating : 0,
            played : false,
            logo : ""
        }

    

    const searchByName = function() {
        const name = encodeURI(searchName.value);
        const apiKey = "c051b2e756ca434ca210fbaaaa5e5c22";
        fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=${name}`)
            .then(response => response.json())
            .then(data => data.results.map(game => game.name).slice(0, 10))
            .then(gameList => displaySearch(gameList))
        // fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=${name}`)
        //     .then(response => response.json())
        //     .then(response => response.results[0].id)
        //     .then(gameID => fetch(`https://api.rawg.io/api/games/${gameID}?key=${apiKey}`))
        //     .then(response => response.json())
        //     .then((gameOfChoice) => {
        //         gameInfo.title = gameOfChoice.name;
        //         gameInfo.year = new Date(gameOfChoice.released).getFullYear();
        //         gameInfo.genre = gameOfChoice.genres.map((genre) => genre.name)
        //         gameInfo.developer = gameOfChoice.developers[0].name;
        //         gameInfo.publisher = gameOfChoice.publishers[0].name;
        //         gameInfo.logo = gameOfChoice.background_image;

        //         console.log(gameOfChoice);
        //     })


    }

    const submitByClick = function(e) {
        e.preventDefault();

        const rating = document.querySelector("input[name='rating']:checked");
        const played = document.querySelector("input[name='played']:checked");

        gameInfo.rating = rating.value;
        gameInfo.played = played.value;
        eliasGames.addGame(gameInfo);
    }

    const selectGame = function(item) {
        searchName.value = item.textContent;
        searchList.classList.add("hidden");
    }

    searchName.addEventListener("keyup", searchByName);
    searchedItems.forEach(item => item.addEventListener("click", selectGame.bind(item, item)));
    submitButton.addEventListener("click", submitByClick);
}

