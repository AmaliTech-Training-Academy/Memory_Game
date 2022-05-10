'use strict'

export class GameTheme {

    constructor(theme = null, userTemplate = null, num = null, gameResultInfo = null, players = null) {
        this.theme = theme;
        this.userTemplate = userTemplate;
        this.num = num;
        this.gameResultInfo = gameResultInfo;
        this.players = players;
    }


    setGrid(num, userTemplate) {
        // method sets the grid based on the input either 4 or 6



    }


    setTheme(theme, userTemplate) {
        //method set theme of user
        this.theme = theme;
        this.userTemplate = userTemplate;

        [...this.userTemplate.children].forEach($element => {
            const $child = $element.querySelector(`[data-${this.theme}]`);
            $element.dataset.value = $child.dataset.icon || $child.dataset.number; //short circuit...if theme value is data-icon show icons else hide and show numbber
            $child.classList.replace('hide', 'show');
        });



    }


    setNumberOfPlayers(num, gameResultInfo, players) {

        //creates number of players

    }



}