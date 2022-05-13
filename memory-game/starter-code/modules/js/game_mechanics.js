export class GameMechanics {







    CurrentMoveInfo(players) {
        document.getElementById(`player${players.activePlayer}-moves`).textContent = players[`player${players.activePlayer}`].moves;
    }

    gameLogic(e, players, userMenuOption) {

        if (!e.target.matches('.middle-grid-container')) { // targets round nodes when clicked
            const $potentialElement = document.querySelector('.sect--game__cont-game-btn--selected');
            //second node clicked will be compared to first...see else statement
            if ($potentialElement && e.target !== $potentialElement) {
                e.target.classList.add('sect--game__cont-game-btn--selected');
                players[`player${players.activePlayer}`].moves += 1;
                this.CurrentMoveInfo(players)
                if (e.target.dataset.value === $potentialElement.dataset.value) {
                    setTimeout(() => {

                        $potentialElement.classList.remove('sect--game__cont-game-btn--selected');
                        e.target.classList.remove('sect--game__cont-game-btn--selected');
                        console.log("removed");
                        $potentialElement.classList.add('sect--game__cont-game-btn--done');
                        e.target.classList.add('sect--game__cont-game-btn--done');
                    }, 700);
                    players[`player${players.activePlayer}`].pairs += 1
                } else {
                    this.CurrentMoveInfo(players);
                    players.activePlayer === userMenuOption.players ? (players.activePlayer = 1) : players.activePlayer++;
                    setTimeout(() => {
                        $potentialElement.classList.remove('sect--game__cont-game-btn--selected');
                        e.target.classList.remove('sect--game__cont-game-btn--selected');
                    }, 700);


                }





            } else e.target.classList.add('sect--game__cont-game-btn--selected'); //this class will be added to first node clicked
        }


    }
























}