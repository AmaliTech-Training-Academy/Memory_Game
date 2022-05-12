export class GameMechanics {


    gameLogic(e, players) {

        if (!e.target.matches('.middle-grid-container')) { // targets round nodes when clicked
            const $potentialElement = document.querySelector('.sect--game__cont-game-btn--selected');
            if ($potentialElement && e.target !== $potentialElement) {

                e.target.classList.add('sect--game__cont-game-btn--selected');
                players[`player${players.activePlayer}`].moves += 1;

            } else e.target.classList.add('sect--game__cont-game-btn--selected');

        }


    }
























}