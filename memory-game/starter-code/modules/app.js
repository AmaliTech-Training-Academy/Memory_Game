'use strict'
import { GameTheme } from './js/user_input.js';
import { GameMechanics } from './js/game_mechanics.js'

/*when the browser gets loaded, we need to set some default values to 
run  when the initial HTML document has been completely loaded*/



window.addEventListener('DOMContentLoaded', () => {
            //This object will contain the game settings
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

        document.querySelectorAll('.game-move__grid').forEach($element => $element.remove()); //removes all the rounded nodes
        document.querySelectorAll('.sect--game__info').forEach($element => $element.remove()); //removes the "time and moves" panel at the bottom

        if (start) startGame();

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
                game.setNumberOfPlayers(userMenuOption.players, gameMode, players)


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
        if (userMenuOption.players === 1) timer();
        element[2].closest('div').classList.add('sect--game__info--active');

    };



    btnStart.addEventListener("click", startGame);




    const gamePlayContainer = document.querySelector(".game-play");
    const startNewGame = document.querySelector(".btn-new-game");

    startNewGame.addEventListener("click", newGame)



    document.querySelector('.middle-grid-container').addEventListener('click', e => new GameMechanics().gameLogic(e, players, userMenuOption, referenceInterval, minutes, seconds, reset, newGame));

});