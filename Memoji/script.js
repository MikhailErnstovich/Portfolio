/*no trash in global scope*/
(function(){
    const gameContainer = document.querySelector('.game-container');
    const gameName = 'Memoji';
    const cellsQuantity = 24;
    const emojiPack = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐽", "🐸", "🐵", "🙈", "🙉", "🙊", "🐒", "🐔", "🐧", "🐦", "🐤", "🐣", "🐥", "🦆", "🦅", "🦉", "🦇", "🐺", "🐗", "🐴", "🦄", "🐝", "🐛", "🦋", "🐌", "🐞", "🐜", "🦟", "🦗", "🕷", "🕸", "🦂", "🐢", "🐍", "🦎", "🦖", "🦕", "🐙", "🦑", "🦐", "🦞", "🦀", "🐡", "🐠", "🐟", "🐬", "🐳", "🐋", "🦈", "🐊", "🐅", "🐆", "🦓", "🦍", "🦧", "🐘", "🦛", "🦏", "🐪", "🐫", "🦒", "🦘", "🐃", "🐂", "🐄", "🐎", "🐖", "🐏", "🐑", "🦙", "🐐", "🦌", "🐕", "🐩", "🦮", "🐕‍","🦺", "🐈", "🐓", "🦃", "🦚", "🦜", "🦢", "🦩", "🕊", "🐇", "🦝", "🦨"];
    /*add game title*/
    gameContainer.previousElementSibling.innerText = gameName;

    /*create emoji array according to field size*/
    let symbols = emojiPack.slice(0,cellsQuantity/2);
    symbols = symbols.concat(symbols).sort(() => Math.random() - 0.5);

    /*constructor of cards*/
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
    /*game data and methods*/
    let gameObj = {
        container: gameContainer,
        cardsArr: [],
        addCardsValues: function(arr){
            this.cardsArr.forEach(function(el, num){
                el.value = arr[num];
            });
        },
        createCard: function(container,obj){
            let cardElem = document.createElement('DIV');
            cardElem.classList.add('card');
            let cover = document.createElement('DIV');
            cover.classList.add('card-cover','gradient');
            let face = document.createElement('DIV');
            face.classList.add('card-face','faceColor','rotY180');
            cardElem.append(face);
            cardElem.append(cover);
            container.append(cardElem);
            obj.card = cardElem;
            this.cardsArr.push(obj);
        },
        createField: function(size, arr){
            for(let i = 0; i < size; i++){
                let x = new GameCard();
                x.num = i;
                this.createCard(this.container,x);
                this.container.children[i].dataset.num = i;
            }
            this.addCardsValues(arr);
        },
        createOverlay:function(){
            
        },
        gameLogic: function(event){
            /*check click on card*/
            let el = event.target;
            let parent = el.parentNode;
            if(!parent.classList.contains('card')){
                return;
            }
            /*prevent click on opened cards*/
            let num = parent.dataset.num;
            let cardObj = gameObj.cardsArr[num];
            if(cardObj.fixed || cardObj.inProcess || cardObj.invalid){
                return;
            }
            /*turn card*/
            let cardFace = parent.firstChild;
            parent.classList.add('rotY180');
            cardFace.innerText = cardObj.value;
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
                    x.card.firstChild.classList.add('faceColor');
                    /*user cant see answers in html*/
                    //x.card.firstChild.innerText = "";
                }
            });
            if(arr.length == 2){
                arr[0].card.firstChild.classList.remove('faceColor');
                arr[1].card.firstChild.classList.remove('faceColor');
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
    };
    gameObj.createField(cellsQuantity, symbols);

    gameContainer.addEventListener('click', function(){
        gameObj.gameLogic(event);
    });
})();





















