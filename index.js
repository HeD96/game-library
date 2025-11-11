class Shelf {
    constructor(user) {
        this.user = user;
        this.userShelf = [];
    }

    async addGame() {
        const { titleValue : title, yearValue : year, genreValue : genre, devValue : developer, pubValue : publisher, ratingValue : rating, playedValue : played} = await gameForm();
        const newGame = new Gamecard(title, year, genre, developer, publisher, rating, played);
        this.userShelf.push(newGame);
        displayCard(newGame);
    }

    deleteGame(theBook, card) {
        const index = this.userLibrary.findIndex(element => element.id === theBook.id);
        this.userLibrary.splice(index, 1);
        card.remove();
    }
}

const eliasGames = new Shelf("Elias");
const header = document.querySelector("header p");
header.textContent = `${eliasGames.user} games`;

class Gamecard {
    constructor(title, year, genre, developer, publisher, rating, played) {
        this.title = title;
        this.year = year;
        this.genre = genre;
        this.developer = developer;
        this.publisher = publisher;
        this.rating = rating;
        this.played = played;
        this.id = this.generateID();
    }

    generateID() {
        return Math.random().toString(36).substring(2, 15);
    }
}

const addGameButton = document.querySelector(".add-button");
addGameButton.addEventListener("click", () => { eliasGames.addGame() });

function clickEventHandler(elements, game) {
    elements.forEach(event => {
        event.addEventListener("click", function() {
            console.log(JSON.stringify(game, null, 2));
        });
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

    gameImg.setAttribute("src", "./images/placeholder-cover.png");

    title.textContent = `${game.title}`;
    year.textContent = `${game.year}`;
    deleteButton.textContent = "X";
    
    shelf.append(gameCard);
    gameCard.append(gameImgWrap, gameInfo);
    gameImgWrap.append(gameImg, deleteButton);
    gameInfo.append(title, year);
    
    clickEventHandler([gameImgWrap], game);
}

function gameForm() {
    return new Promise((resolve) => {
        const gameForm = document.querySelector("form");
        gameForm.classList.toggle("hidden");

        const title = document.querySelector("#title");
        const year = document.querySelector("#year");
        const genre = document.querySelector("#genre");
        const developer = document.querySelector("#developer");
        const publisher = document.querySelector("#publisher");
        const rating = document.querySelector("#rating");
        const played = document.querySelector("#played");
        const submitButton = document.querySelector("#submit");

        const handleClick = function(e) {
            e.preventDefault();
            // console.log(title.value, year.value, genre.value, developer.value, publisher.value);

            gameForm.classList.toggle("hidden");

            const result = {
                titleValue : title.value, 
                yearValue: year.value, 
                genreValue : genre.value, 
                devValue : developer.value, 
                pubValue : publisher.value ,
                ratingValue : rating.value,
                playedValue : played.value
            }
            submitButton.removeEventListener("click", handleClick);

            resolve(result);
        }
        submitButton.addEventListener("click", handleClick);
    });
}