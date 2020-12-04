/*no trash in global scope*/
(function(){
    const gameContainer = document.querySelector('.game-container');
    const gameSection = document.querySelector('.game-section');
    const gameName = 'Memoji';
    const cellsQuantity = 24;
    const emojiPack = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐽", "🐸", "🐵", "🙈", "🙉", "🙊", "🐒", "🐔", "🐧", "🐦", "🐤", "🐣", "🐥", "🦆", "🦅", "🦉", "🦇", "🐺", "🐗", "🐴", "🦄", "🐝", "🐛", "🦋", "🐌", "🐞", "🐜", "🦟", "🦗", "🕷", "🕸", "🦂", "🐢", "🐍", "🦎", "🦖", "🦕", "🐙", "🦑", "🦐", "🦞", "🦀", "🐡", "🐠", "🐟", "🐬", "🐳", "🐋", "🦈", "🐊", "🐅", "🐆", "🦓", "🦍", "🦧", "🐘", "🦛", "🦏", "🐪", "🐫", "🦒", "🦘", "🐃", "🐂", "🐄", "🐎", "🐖", "🐏", "🐑", "🦙", "🐐", "🦌", "🐕", "🐩", "🦮", "🐕‍","🦺", "🐈", "🐓", "🦃", "🦚", "🦜", "🦢", "🦩", "🕊", "🐇", "🦝", "🦨"];
    
    /*create emoji array according to field size*/
    let symbols = emojiPack.slice(0,cellsQuantity/2);

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
            let str = "";
            for(let i = 0; i < this.title.length; i++){
                str += "<span><em>" + this.title.charAt(i) + "</em></span>";
            }
            title.innerHTML = str;
            this.section.append(title);
        },
        /*add overlay*/
        createOverlay: function(){
            let overlay = document.createElement('DIV');
            overlay.classList.add('game-overlay','transparent');
            overlay.classList.add('flex');
            let messageBox = document.createElement('DIV');
            messageBox.classList.add('message-box');
            let messageText = document.createElement('H2');
            messageText.innerText = "START!";
            let restartButton = document.createElement('BUTTON');
            restartButton.innerHTML = '&#8635;';
            restartButton.classList.add('restart-button');
            messageBox.append(messageText);
            messageBox.append(restartButton);
            overlay.append(messageBox);
            this.section.append(overlay);
        },
        /*create single card*/
        createCard: function(obj){
            let cardElem = document.createElement('DIV');
            cardElem.classList.add('card');
            let cover = document.createElement('DIV');
            cover.classList.add('card-cover','gradient');
            let face = document.createElement('DIV');
            face.classList.add('card-face','faceColor','rotY180');
            cardElem.append(face);
            cardElem.append(cover);
            this.container.append(cardElem);
            obj.card = cardElem;
            this.cardsArr.push(obj);
        },
        /*create all cards*/
        createField: function(size, arr){
            for(let i = 0; i < size; i++){
                let x = new GameCard();
                x.num = i;
                this.createCard(x);
                this.container.children[i].dataset.num = i;
            }
            this.createOverlay();
            //this.start(arr);
        },
        /*create clock box*/
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
        /*start or restart*/
        start: function(arr){
            arr = arr.concat(arr).sort(() => Math.random() - 0.5);
            this.addCardsValues(arr);
            this.cardsArr.forEach(function(el){
                el.inProcess = false;
                el.fixed = false;
                el.invalid = false;
                el.card.className = "";
                el.card.classList.add('card');
                el.card.firstChild.className = "";
                el.card.firstChild.classList.add("card-face","faceColor","rotY180");
            });
            this.section.querySelector('.game-overlay').classList.toggle('hidden');
            this.section.querySelector('.game-overlay').classList.toggle('flex');
            this.timer();
        },
        /*set game timer*/
        timer: function(){
            let x = 0;
            let minEl = this.section.querySelector('.game-clock').firstElementChild;
            let secEl = this.section.querySelector('.game-clock').childNodes[2];
            minEl.innerText = "00";
            secEl.innerText = "00";
            let metronome = setInterval(()=>{
                x++;
                let win = true;
                this.cardsArr.forEach(function(el){
                    if(!el.card.firstChild.classList.contains('green')){
                        win = false;
                    }
                });
                if(win){
                    clearTimeout(timeout);
                    clearInterval(metronome);
                    this.section.querySelector('.game-overlay').classList.toggle('hidden');
                    this.section.querySelector('.game-overlay').classList.toggle('flex');
                    this.section.querySelector('.message-box')
                    .getElementsByTagName('H2')[0].innerText = 'WIN';
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
                    this.section.querySelector('.game-overlay').classList.toggle('hidden');
                    this.section.querySelector('.game-overlay').classList.toggle('flex');
                    this.section.querySelector('.message-box')
                    .getElementsByTagName('H2')[0].innerText = 'LOOSE!';
                }
                clearTimeout(timeout);
            },120000);
        }

    };

    gameObj.createTitle();
    gameObj.createClock();
    gameObj.createField(cellsQuantity, symbols);
    gameContainer.addEventListener('click', function(){
        gameObj.gameLogic(event);
    });
    gameSection.querySelector(".restart-button").addEventListener('click',function(){
        gameObj.start(symbols);
        gameSection.querySelector('.game-overlay').classList.remove('transparent');
        gameSection.querySelector('.game-overlay').classList.add('semitransparent');
    }); 
})();





















