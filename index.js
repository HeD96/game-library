class Shelf {
    constructor(user) {
        this.user = user;
        this.userShelf = [];
    }

    addGame() {
        const title = prompt("Название");
        const year = prompt("Год");
        const genre = prompt("Жанр");
        const developer = prompt("Разработчик");
        const publisher = prompt("Издатель");
        const rating = prompt("Оценка");
        const played = prompt("играл / не играл") === "играл" ? true : false;

        const newGame = new Gamecard(title, year, genre, developer, publisher, rating, played);
        this.userShelf.push(newGame);
        // displayBook(newBook);
    }

    deleteGame(theBook, card) {
        const index = this.userLibrary.findIndex(element => element.id === theBook.id);
        this.userLibrary.splice(index, 1);
        card.remove();
    }
}

const eliasGames = new Shelf("Elias");

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

function clickEventHandler(elements) {
    element.forEach(event => {

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
    gameImg.classList.add("game-image");
    deleteButton.classList.add("game-delete");

    title.textContent = `${game.title}`;
    year.textContent = `${game.year}`;
    deleteButton.textContent = "X";
    
    shelf.append(gameCard);
    gameCard.append(gameImgWrap, gameInfo, deleteButton);
    gameImgWrap.append(gameImg);
    gameInfo.append(title, year);
    

    
}