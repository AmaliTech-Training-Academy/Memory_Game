'use strict'

/*when the browser gets loaded, we need to set some default values to 
run  when the initial HTML document has been completely loaded*/

window.addEvenlistener('DOMContentLoaded', () => {
    //This object will contain the game settings
    const user_menu_option = {
        theme: null,
        players: null,
        grid: null
    }


    let players = {

    }

    const timer = () => {


    }







    const btns = [''].map(id => getElementById(id)); //get the id of start button 


    startGame = () => {
        const element = [].map(id => getElementById(id)); //gets the id of elements listed in the array
        const transform = [].map(selector => document.querySelector(selector)); //gets the class of elements listed in the array


        for (let i = 1; i <= 3; i++) {
            // iterate through loop to get users input based on users choice

            if (i === 1) {


                //set users theme template

            } else if (i === 2) {

                //set number of players
            } else {

                //set Grid users grid
            }



        }





    }

    btns[0].addEventListener('clicks', startGame) //click to start game






});