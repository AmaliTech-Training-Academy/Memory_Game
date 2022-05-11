'use strict'
import { GameTheme } from './js/user_input.js';


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

    const timer = () => {


    }




    const homePage = document.querySelector(".home");
    const btnStart = document.querySelector("#btn-start");
    const body = document.querySelector("body");


    btnStart.addEventListener("click", () => {

        const element = ["user-game-template"].map(id => document.getElementById(id));

        const transform = ['.middle-grid-container'].map(selector => document.querySelector(selector))
        const gameTemplate = element[0].cloneNode(true).content;
        for (let i = 1; i <= 3; i++) {
            const game = new GameTheme();
            const inputs = [...document.getElementById(`select-num${i}`).querySelectorAll('input')];
            if (i === 1) {
                userMenuOption.theme = inputs.find(({ checked }) => checked).value;
                game.setTheme(userMenuOption.theme, gameTemplate)

            } else if (i === 2) {
                userMenuOption.players = +inputs.find(({ checked }) => checked).value;

            } else {
                userMenuOption.grid = +inputs.find(({ checked }) => checked).value.slice(0, 1);

                game.setGrid(userMenuOption.grid, gameTemplate)

            }
        }

        homePage.classList.add("hidden");
        gamePlayContainer.classList.remove("hidden");
        transform[0].append(gameTemplate)
        body.style.backgroundColor = "white";
    });




    const gamePlayContainer = document.querySelector(".game-play");
    const startNewGame = document.querySelector(".btn-new-game");

    startNewGame.addEventListener("click", function() {
        gamePlayContainer.classList.add("hidden");
        homePage.classList.remove("hidden");
        body.style.backgroundColor = "#152938";
    });





});