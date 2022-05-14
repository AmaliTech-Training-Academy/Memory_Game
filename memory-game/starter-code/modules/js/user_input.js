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
            for (let i = 17; i > 7; i--) this.userTemplate.removeChild(this.userTemplate.children[i]);
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
            $child.classList.replace('hidden', 'show');
        });



    }


    setNumberOfPlayers(num, gameResultInfo, players) {
        this.num = num;
        this.gameResultInfo = gameResultInfo;
        this.players = players
        const info = gameResultInfo.querySelector('.sect--game__info');
        this.players['player1'] = {
                id: 1,
                pairs: 0,
                moves: 0,
            }
            //if the number or player is one i.e solo player mode

        if (this.num === 1) {
            info.querySelector('span:first-child').textContent = 'Time';
            info.querySelector('span:last-child').textContent = '00: 00';
            info.querySelector('span:last-child').id = 'time-span';

            const newInfo = info.cloneNode(true);
            newInfo.querySelector('span:first-child').textContent = 'Moves';
            newInfo.querySelector('span:last-child').textContent = '0';
            newInfo.querySelector('span:last-child').id = 'player1-moves';
            this.gameResultInfo.append(newInfo);


        } else {
            for (let i = 2; i <= this.num; i++) {

                info.querySelector('span:first-child').textContent = 'Player 1';
                info.querySelector('span:last-child').textContent = '0';
                info.querySelector('span:last-child').id = 'player1-moves';

                const newInfo = info.cloneNode(true);
                newInfo.querySelector('span:first-child').textContent = `Player ${i}`;
                newInfo.querySelector('span:last-child').id = `player${i}-moves`;
                this.gameResultInfo.append(newInfo);
                this.players[`player${i}`] = {
                    id: i,
                    pairs: 0,
                    moves: 0,
                };

            }
        }



    }



}