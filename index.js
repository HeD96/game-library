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

        const newBook = new BookCreator(title, author, year, pages, rating, isRead);
        console.log(newBook);
        this.userLibrary.push(newBook);

        displayBook(newBook);
    }

    deleteGame(theBook, card) {
        const index = this.userLibrary.findIndex(element => element.id === theBook.id);
        this.userLibrary.splice(index, 1);
        card.remove();
    }
}

class GamecardCreator {
    constructor(title, year, rating, played) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.pages = pages;
        this.rating = rating;
        this.isRead = isRead;
        this.id = this.generateID();
    }

    generateID() {
        return Math.random().toString(36).substring(2, 15);
    }
}