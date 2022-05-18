export class GameMechanics {


    CurrentMoveInfo(players) {
        document.getElementById(`player${players.activePlayer}-moves`).textContent = players[`player${players.activePlayer}`].moves;
    }

    setActivePlayer(players) {
        let $ParentElement = document.getElementById(`player${players.activePlayer}-moves`).closest('div');
        [...document.querySelector('.players-state-container').children].forEach($child => $child.classList.toggle('sect--game__info--active', $child === $ParentElement));
    }



    disPlayResult(players, userMenuOption, referenceInterval, minutes, seconds, reset, newGame, refreshPage) {
            //filter the nodes which has not been resolved
            let checker = [...document.querySelector('.middle-grid-container').children].filter($child => !$child.classList.contains('game__choosen-btn-choice-btn-done'));

            if (checker.length === 1) { //if the length is equal to 1 that means all nodes have been resolved
                clearInterval(referenceInterval);
                //the results will be taken and displayed on the pop up modal screen

                document.querySelector('.modal').classList.add('modal--show');
                const $gameOverContainer = document.getElementById('modal-span').cloneNode(true).content;
                const $modaLi = $gameOverContainer.querySelector('.modal__li');
                const $modalLiElements = [...$modaLi.children];
                const $modalTopElements = [...$gameOverContainer.querySelector('.modal__cont-top').children];


                const setModal = (value1, value2) => {
                    const $newModalLi = $modaLi.cloneNode(true);
                    const $newModalLiElements = [...$newModalLi.children];
                    $newModalLiElements[0].textContent = value1;
                    $newModalLiElements[1].textContent = value2;
                    if (!value1.includes('(winner)')) $newModalLi.classList.remove('modal__li--winner');
                    $gameOverContainer.querySelector('.modal__ul').append($newModalLi);
                };

                if (userMenuOption.players === 1) {
                    $modalTopElements[0].textContent = 'You did it';
                    $modalTopElements[1].textContent = 'Game over! Here are the results';
                    $modalLiElements[0].textContent = 'Time Elapsed';
                    $modalLiElements[1].textContent = `${`0${minutes}`.slice(-2)}:${`0${seconds}`.slice(-2)}`;

                setModal('Moves Taken', players.player1.moves);
            } else {
                $modalTopElements[1].textContent = 'Game over! Here are the results';

                const allPlayers = [];
                let playersPairs = [];
                for (let i = 1; i <= userMenuOption.players; i++) {
                    allPlayers.push(players[`player${i}`]);
                    playersPairs.push(players[`player${i}`].pairs);
                }

                playersPairs = [...new Set([...playersPairs])].sort((a, b) => b - a);
                for (let i = 0; i < allPlayers.length; i++) {
                    const contPlayers = allPlayers.filter(({ pairs }) => pairs === playersPairs[i]);

                    if (i === 0) {
                        contPlayers.length === 1 ? ($modalTopElements[0].textContent = `Player ${contPlayers[0].id} Wins!`) : ($modalTopElements[0].textContent = 'it is a tie!');
                        $modalTopElements[1].textContent = 'Game over! Here are the results';

                        for (let j = 0; j < contPlayers.length; j++) {
                            if (j === 0) {
                                $modaLi.classList.add('modal__li--winner');
                                $modalLiElements[0].textContent = `Player ${contPlayers[0].id} (winner)`;
                                $modalLiElements[1].textContent = `Pairs ${contPlayers[0].pairs}`;
                            } else setModal(`Player ${contPlayers[j].id} (winner)`, `Pairs ${contPlayers[j].pairs}`);
                        }
                    } else {
                        for (const { id, pairs }
                            of contPlayers) setModal(`Player ${id}`, `Pairs ${pairs}`);
                    }
                }
            }
            document.querySelector('.modal__content').append($gameOverContainer);
            document.querySelector('.modal__cont-bottom').addEventListener('click', e => {
                if (e.target.matches('.modal__btn--reset')) reset();
                else if (e.target.matches('.modal__btn--new-game')) {
                    refreshPage()
                    newGame();
                }
            });






        }


    }






    gameLogic(e, players, userMenuOption, referenceInterval, minutes, seconds, reset, newGame, refreshPage) {

        if (!e.target.matches('.middle-grid-container')) { // targets round nodes when clicked
            const $potentialElement = document.querySelector('.game__choosen-btn-choice');
            //second node clicked will be compared to first...see else statement


            if ($potentialElement && e.target !== $potentialElement) {
                e.target.classList.add('game__choosen-btn-choice');
                players[`player${players.activePlayer}`].moves += 1;
                this.CurrentMoveInfo(players)
                if (e.target.dataset.value === $potentialElement.dataset.value) {
                    setTimeout(() => {

                        $potentialElement.classList.remove('game__choosen-btn-choice');
                        e.target.classList.remove('game__choosen-btn-choice');

                        $potentialElement.classList.add('game__choosen-btn-choice-btn-done');
                        e.target.classList.add('game__choosen-btn-choice-btn-done');
                        this.disPlayResult(players, userMenuOption, referenceInterval, minutes, seconds, reset, newGame, refreshPage)

                    }, 700);
                    players[`player${players.activePlayer}`].pairs += 1
                } else {
                    this.CurrentMoveInfo(players);
                    players.activePlayer === userMenuOption.players ? (players.activePlayer = 1) : players.activePlayer++;
                    if (userMenuOption.players != 1) {
                        this.setActivePlayer(players);
                    } //this will set the yellow indication for multiplayer but not for solo player

                    setTimeout(() => {
                        $potentialElement.classList.remove('game__choosen-btn-choice');
                        e.target.classList.remove('game__choosen-btn-choice');
                    }, 700);


                }





            } else {

                e.target.classList.add('game__choosen-btn-choice');

            } //this class will be added to first node clicked

        }


    }
























}