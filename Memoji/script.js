/*no trash in global scope*/
(function(){
    const gameContainer = document.querySelector('.game-container');
    const cellNumber = 24;
    const emojiPack = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐽", "🐸", "🐵", "🙈", "🙉", "🙊", "🐒", "🐔", "🐧", "🐦", "🐤", "🐣", "🐥", "🦆", "🦅", "🦉", "🦇", "🐺", "🐗", "🐴", "🦄", "🐝", "🐛", "🦋", "🐌", "🐞", "🐜", "🦟", "🦗", "🕷", "🕸", "🦂", "🐢", "🐍", "🦎", "🦖", "🦕", "🐙", "🦑", "🦐", "🦞", "🦀", "🐡", "🐠", "🐟", "🐬", "🐳", "🐋", "🦈", "🐊", "🐅", "🐆", "🦓", "🦍", "🦧", "🐘", "🦛", "🦏", "🐪", "🐫", "🦒", "🦘", "🐃", "🐂", "🐄", "🐎", "🐖", "🐏", "🐑", "🦙", "🐐", "🦌", "🐕", "🐩", "🦮", "🐕‍","🦺", "🐈", "🐓", "🦃", "🦚", "🦜", "🦢", "🦩", "🕊", "🐇", "🦝", "🦨"];
    
    let symbols = emojiPack.slice(0,cellNumber/2);
    symbols = symbols.concat(symbols).sort(() => Math.random() - 0.5);

    class GameCard {
        constructor(){
            this.card;
            this.value;
            this.num;
            this.inProcess = false;
            this.fixed = false;
            this.invalid = false;
        }
    }

    let gameObj = {
        container: gameContainer,
        cardsArr: [],
        shuffleCards: function(arr){
            this.cardsArr.forEach(function(el, num){
                el.value = arr[num];
            });
        },
        createCard: function(container,obj){
            let cardElem = document.createElement('DIV');
            cardElem.classList.add('card');
            let cover = document.createElement('DIV');
            cover.classList.add('card-cover','gray');
            let face = document.createElement('DIV');
            face.classList.add('card-face','blue','rotY180');
            cardElem.append(face);
            cardElem.append(cover);
            container.append(cardElem);
            obj.card = cardElem;
            this.cardsArr.push(obj);
        },
    };

    createField();
    function createField(){
        for(let i = 0; i < cellNumber; i++){
            let x = new GameCard();
            x.num = i;
            gameObj.createCard(gameContainer,x);
            gameContainer.children[i].dataset.num = i;
        }
        gameObj.shuffleCards(symbols);
    }

    function gameLogic(event){
        /*check click on card*/
        let el = event.target;
        let parent = el.parentNode;
        if(!parent.classList.contains('card')){
            return;
        }
        /*check card status*/
        let num = parent.dataset.num;
        let cardObj = gameObj.cardsArr[num];
        if(cardObj.fixed || cardObj.inProcess || cardObj.invalid){
            return;
        }
        /*turn card*/
        let cardFace = parent.firstChild;
        parent.classList.add('rotY180');
        cardFace.innerHTML = cardObj.value;
        cardObj.inProcess = true;
        /*check cards*/
        let arr = [];
        gameObj.cardsArr.forEach(function(x){
            if(x.inProcess){
                arr.push(x);
            }
            if(x.invalid){
                x.invalid = false;
                x.card.classList.remove('rotY180');
                x.card.firstChild.classList.remove('red');
                x.card.firstChild.classList.add('blue');
                x.card.firstChild.innerHTML = "";
            }
        });
        if(arr.length == 2){
            arr[0].card.firstChild.classList.remove('blue');
            arr[1].card.firstChild.classList.remove('blue');
            if(arr[0].value == arr[1].value){
                arr[0].card.firstChild.classList.add('green');
                arr[1].card.firstChild.classList.add('green');
                arr[0].fixed = true;
                arr[1].fixed = true;
                arr[0].inProcess = false;
                arr[1].inProcess = false;
            } else {
                arr[0].card.firstChild.classList.add('red');
                arr[1].card.firstChild.classList.add('red');
                arr[0].inProcess = false;
                arr[1].inProcess = false;
                arr[0].invalid = true;
                arr[1].invalid = true;
            }
        }
    }
    gameContainer.addEventListener('click', function(){
        gameLogic(event);
    }
    ,false);
})();






















