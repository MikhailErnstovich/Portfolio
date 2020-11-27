/*no trash in global scope*/
(function(){
    const gameContainer = document.querySelector('.game-container');
    const gameSection = document.querySelector('.game-section');
    const gameName = 'Memoji';
    const cellsQuantity = 24;
    const emojiPack = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐽", "🐸", "🐵", "🙈", "🙉", "🙊", "🐒", "🐔", "🐧", "🐦", "🐤", "🐣", "🐥", "🦆", "🦅", "🦉", "🦇", "🐺", "🐗", "🐴", "🦄", "🐝", "🐛", "🦋", "🐌", "🐞", "🐜", "🦟", "🦗", "🕷", "🕸", "🦂", "🐢", "🐍", "🦎", "🦖", "🦕", "🐙", "🦑", "🦐", "🦞", "🦀", "🐡", "🐠", "🐟", "🐬", "🐳", "🐋", "🦈", "🐊", "🐅", "🐆", "🦓", "🦍", "🦧", "🐘", "🦛", "🦏", "🐪", "🐫", "🦒", "🦘", "🐃", "🐂", "🐄", "🐎", "🐖", "🐏", "🐑", "🦙", "🐐", "🦌", "🐕", "🐩", "🦮", "🐕‍","🦺", "🐈", "🐓", "🦃", "🦚", "🦜", "🦢", "🦩", "🕊", "🐇", "🦝", "🦨"];
    

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
        section: gameSection,
        container: gameContainer,
        title: gameName,
        cardsArr: [],
        addCardsValues: function(arr){
            this.cardsArr.forEach(function(el, num){
                el.value = arr[num];
            });
        },
        /*add game title*/
        createTitle: function(){
            let title = document.createElement('H2');
            title.classList.add('game-title');
            title.innerHTML = this.title;
            this.section.append(title);
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
        createClock:function(){
            let clock = document.createElement('DIV');
            let min = document.createElement('SPAN');
            let divider = document.createElement('SPAN');
            let sec = document.createElement('SPAN');
            clock.classList.add('game-clock');
            clock.append(min);
            clock.append(divider);
            clock.append(sec);
            min.innerText = "00";
            sec.innerText = "00";
            divider.innerText =":";
            this.section.append(clock);
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
        },
        timer: function(){
            let x = 0;
            let minEl = this.section.querySelector('.game-clock').firstElementChild;
            let secEl = this.section.querySelector('.game-clock').childNodes[2];
            let metronome = setInterval(()=>{
                x++;
                let win = true;
                this.cardsArr.forEach(function(el){
                    if(!el.card.firstChild.classList.contains('green')){
                        win = false;
                    }
                });
                if(win){
                    console.log('win');
                    clearTimeout(timeout);
                    clearInterval(metronome);
                }
                let min = Math.floor(x/60);
                let sec = x%60;
                if(min < 60){
                    if(min < 10){
                        minEl.innerText = "0" + min;
                    } else {
                        minEl.innerText = min;
                    }
                }
                if(sec < 60){
                    if(sec < 10){
                        secEl.innerText = "0" + sec;
                    } else {
                        secEl.innerText = sec;
                    }
                }                
            }, 1000);
            let timeout = setTimeout(()=>{
                clearInterval(metronome);
                let result = true;
                this.cardsArr.forEach(function(el){
                    if(el.inProcess && el.invalid){
                        result = false;
                    }
                });
                if(result){
                    console.log('loose');
                }
            },120000);
        }
    };

    gameObj.createTitle();
    gameObj.createClock("00-00");
    gameObj.createField(cellsQuantity, symbols);
    gameObj.timer();
    gameContainer.addEventListener('click', function(){
        gameObj.gameLogic(event);
    });
})();





















