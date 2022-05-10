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

    }

    const timer = () => {


    }




    const homePage = document.querySelector(".home");
    const btnStart = document.querySelector("#btn-start");
    const body = document.querySelector("body");


    btnStart.addEventListener("click", () => {

        const element = ["user-game-template"].map(id => document.getElementById);

        for (let i = 1; i <= 3; i++) {
            const choice = [...document.getElementById(`select-num${i}`).querySelectorAll('input')];
            if (i === 1) {
                userMenuOption.theme = choice.find(({ checked }) => checked).value;

            } else if (i === 2) {
                userMenuOption.players = +choice.find(({ checked }) => checked).value;

            } else {
                userMenuOption.grid = +choice.find(({ checked }) => checked).value.slice(0, 1);

            }
        }



        homePage.classList.add("hidden");
        gamePlayContainer.classList.remove("hidden");
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