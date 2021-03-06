'use strict'
import { GameTheme } from './js/user_input.js';
import { GameMechanics } from './js/game_mechanics.js'

/*when the browser gets loaded, we need to set some default values to 
run  when the initial HTML document has been completely loaded*/



window.addEventListener('DOMContentLoaded', () => {


            const userMenuOption = {
                theme: null,
                players: null,
                grid: null
            }


            let players = {
                activePlayer: 1,
            }

            let referenceInterval = null;
            let minutes = 0;
            let seconds = 0;

            // This function sets the time for game, it only works when the player is set to one
            let started = false;

            const timer = () => {
                    const $periodOfTime = document.getElementById('time-span');
                    referenceInterval = setInterval(() => {
                                seconds += 1;
                                if (seconds > 60) {
                                    minutes += 1;
                                    seconds = 0;
                                }
                                $periodOfTime.textContent = `${`0${minutes}`.slice(-2)}:${`0${seconds}`.slice(-2)}`;
        }, 1000);
    };

    const reset = (start = true) => {
        clearInterval(referenceInterval);
        started = false;
        minutes = 0;
        seconds = 0;
        players.playerActive = 1;
        delete players.player1;
        delete players.player2;
        delete players.player3;

        document.querySelectorAll('.game-move__grid').forEach($element => $element.remove()); //reset to inital start
        document.querySelectorAll('.sect--game__info').forEach($element => $element.remove()); //removes the "time and moves" panel at the bottom
        document.querySelector('.modal').classList.remove('modal--show');
        try {
            document.querySelector('.modal__cont-bottom').remove();
            document.querySelector('.modal__ul').remove();
            document.querySelector('.modal__cont-top').remove();
        } catch (error) { }
        if (start) startGame();

    }
    function refreshPage() {
        window.location.reload();
    }

    const homePage = document.querySelector(".home");
    const btnStart = document.querySelector("#btn-start");
    const body = document.querySelector("body");

    //This function allows the user t0 reset game
    const newGame = () => {
        //const element_selector = [''].map(selector => document.querySelector(selector))
        reset(false)

        gamePlayContainer.classList.add("hidden");
        homePage.classList.remove("hidden");
        body.style.backgroundColor = "#152938";

        try {
            document.querySelector('.modal__cont-top').remove();
            document.querySelector('.modal__ul').remove();
            document.querySelector('.modal__cont-bottom').remove();
        } catch (error) { }
    }


    const startGame = () => {
        const element = ["user-game-template", "game-mode-template", "player1-moves"].map(id => document.getElementById(id));
        const gameMode = element[1].cloneNode(true).content
        const transform = ['.middle-grid-container', '.players-state-container'].map(selector => document.querySelector(selector))
        const gameTemplate = element[0].cloneNode(true).content;
        for (let i = 1; i <= 3; i++) {
            const game = new GameTheme();
            const inputs = [...document.getElementById(`select-num${i}`).querySelectorAll('input')];
            if (i === 1) {
                userMenuOption.theme = inputs.find(({ checked }) => checked).value;
                game.setTheme(userMenuOption.theme, gameTemplate)

            } else if (i === 2) {
                userMenuOption.players = +inputs.find(({ checked }) => checked).value;
                game.setNumberOfPlayers(userMenuOption.players, gameMode, players, screen)


            } else {
                userMenuOption.grid = +inputs.find(({ checked }) => checked).value.slice(0, 1);

                game.setGrid(userMenuOption.grid, gameTemplate)

            }
        }

        homePage.classList.add("hidden");
        gamePlayContainer.classList.remove("hidden");
        transform[0].append(gameTemplate)
        transform[1].append(gameMode)

        body.style.backgroundColor = "white";
        // if (userMenuOption.players === 1) timer();
        element[2].closest('div').classList.add('sect--game__info--active');

    };



    btnStart.addEventListener("click", startGame);



    const gamePlayContainer = document.querySelector(".game-play");
    const startNewGame = document.querySelector(".btn-new-game");
    //starts game
    startNewGame.addEventListener("click", newGame);

    //Mobile pop up menu screen
    const modal = document.querySelector(".mobile-modal"); //selects the modal for mobile
    const btnOpenModal = document.querySelector(".btn-menu"); //selects the button to show the modal
    const overlay = document.querySelector(".overlay"); //selects the overlay
    const menu = document.getElementById('btn-resume');
    const restart = document.getElementById('btn-menu-restart');
    const playNewGame = document.getElementById('btn-menu-game');


    const toggleModal = function () {
        clearInterval(referenceInterval);//pauses timer
        modal.classList.toggle("hidden");
        overlay.classList.toggle("hidden");
    };
    btnOpenModal.addEventListener("click", toggleModal);

    menu.addEventListener('click', function () {
        if (started === true) setTimeout(timer)
        toggleModal();

    })
    playNewGame.addEventListener('click', function () {
        refreshPage()
        newGame()
    })

    restart.addEventListener('click', function () {

        toggleModal()
        reset();

    })

    //controls all the logic behind the game
    document.querySelector('.middle-grid-container').addEventListener('click', e => {
        const gameMech = new GameMechanics()

        if ((userMenuOption.players === 1) && (started === false)) {//only executes timer when player clicks a node
            started = true;
            timer()
        };
        gameMech.gameLogic(e, players, userMenuOption, referenceInterval, minutes, seconds, reset, newGame, refreshPage);


    });

    //resets the game
    document.getElementById('sect--game__cont-sets').addEventListener('click', e => {
        if (e.target.matches('#reset')) reset();
        else if (e.target.matches('#new-game')) {
            refreshPage();
            newGame();
        }

    });


});