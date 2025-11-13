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

function clickEventHandler(elements, game, gameCard) {
    elements.forEach(event => {
        if (event.getAttribute("data-event") === "get-info") {
            event.addEventListener("click", function() {
                console.log(JSON.stringify(game, null, 2));
            });
        }
        if (event.getAttribute("data-event") === "delete-card") {
            event.addEventListener("click", function() {
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

    gameImg.setAttribute("src", "./images/placeholder-cover.png");
    gameImgWrap.setAttribute("data-event", "get-info");
    deleteButton.setAttribute("data-event", "delete-card");

    title.textContent = `${game.title}`;
    year.textContent = `${game.year}`;
    deleteButton.textContent = "X";
    
    shelf.append(gameCard);
    gameCard.append(gameImgWrap, gameInfo);
    gameImgWrap.append(gameImg, deleteButton);
    gameInfo.append(title, year);
    
    clickEventHandler([gameImgWrap, deleteButton], game, gameCard);
}

function gameForm() {
    return new Promise((resolve) => {
        const gameForm = document.querySelector("form");
        const title = document.querySelector("#title");
        const year = document.querySelector("#year");
        const genre = document.querySelector("#genre");
        const developer = document.querySelector("#developer");
        const publisher = document.querySelector("#publisher");
        const submitButton = document.querySelector("#submit");
        gameForm.classList.toggle("hidden");

        const handleClick = function(e) {
            e.preventDefault();

            gameForm.classList.toggle("hidden");

            const rating = document.querySelector("input[name='rating']:checked");
            const played = document.querySelector("input[name='played']:checked");

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