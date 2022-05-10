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
        this.num = num;
        this.userTemplate = userTemplate;
        if (this.num === 4) {
            for (let i = 17; i > 7; i--) this.gameTemplate.removeChild(this.gameTemplate.children[i]);
        }
        [...this.userTemplate.children].forEach($element => this.userTemplate.append($element.cloneNode(true)));
        document.querySelector('.middle-grid-container').classList.add(`middle-grid-container--${this.num}-columns`);
        const elements = [...this.userTemplate.children];
        for (let i = elements.length - 1; i > 0; i--) {
            const randNumber = Math.floor(Math.random() * (i + 1));
            [elements[i], elements[randNumber]] = [elements[randNumber], elements[i]];
        }
        this.userTemplate.replaceChildren(...elements);


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