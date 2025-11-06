const newGame1 = new Gamecard("Hollow Knight", 2017, "Metroidvania", "Team Cherry", "Team Cherry", 5, "играл");
const newGame2 = new Gamecard("Max Payne", 2012, "Action/TPS", "Rockstar Studios", "Rockstar Games", 5, "играл");

eliasGames.userShelf.push(newGame1, newGame2);

displayCard(newGame1);
displayCard(newGame2);