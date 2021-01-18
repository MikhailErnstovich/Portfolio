document.querySelector(".video-button")
.addEventListener('click', playVideo);

document.addEventListener('DOMContentLoaded', playVideo);

function playVideo(){
    const toggle = window.matchMedia('(max-width: 666px)').matches;
    const vid = document.querySelector(".header__video-background");
    if(!toggle && vid.dataset.playing === ""){
        vid.play();
        vid.dataset.playing = "playing";
        return;
    } else {
        vid.pause();
        vid.dataset.playing = "";
    }
}

document.querySelector('.reviews-left-button')
.addEventListener('click', function(){
    let reviewsGallery = document.querySelector('.reviews-section__reviews');
    slideLeft(reviewsGallery);
});

document.querySelector('.reviews-right-button')
.addEventListener('click', function(){
    let reviewsGallery = document.querySelector('.reviews-section__reviews');
    slideRight(reviewsGallery);
});

document.querySelector('.partners-left-button')
.addEventListener('click', function(){
    let partnersGallery = document.querySelector('.reviews-section__partners');
    slideLeft(partnersGallery);
});

document.querySelector('.partners-right-button')
.addEventListener('click', function(){
    let partnersGallery = document.querySelector('.reviews-section__partners');
    slideRight(partnersGallery);
});

function slideLeft(gallery){
    let col = gallery.getElementsByTagName('FIGURE');
    let i = 0;   
    while(i < col.length - 1){
        if(!col[i].classList.contains('hidden-figure')){
            col[i].classList.add('hidden-figure');
            break;
        }
        i++;
    }
}

function slideRight(gallery){
    let col = gallery.getElementsByTagName('FIGURE');
    let i = col.length - 1;
    while(i >= 0){
        if(col[i].classList.contains('hidden-figure')){
            col[i].classList.remove('hidden-figure');
            break;
        }
        i--;
    }
}

document.addEventListener('DOMContentLoaded',adjustScreen);
window.onresize = adjustScreen;

function adjustScreen(){
    let parent1 = document.querySelector('.reviews-section__partners');
    let col1 = parent1.getElementsByTagName('FIGURE');
    let parent2 = document.querySelector('.reviews-section__reviews');
    let col2 = parent2.getElementsByTagName('FIGURE');
    Array.prototype.forEach.call(col1, el => {el.classList.remove('hidden-figure');});
    const mediaIndicator = {
        phone: () => window.matchMedia('(max-width: 666px)').matches,
        tablet: () => window.matchMedia('(min-width: 667px) and (max-width: 1024px)').matches,
        desktop: () => window.matchMedia('(min-width: 1025px)').matches,
    };
    if(mediaIndicator.phone()){
        for(let i = 0; i < col1.length - 1; i++){
            col1[i].classList.add('hidden-figure');
        }
        for(let i = 0; i < col2.length - 1; i++){
            col2[i].classList.add('hidden-figure');
        }
        return;
    }
    if(mediaIndicator.tablet()){
        for(let i = 0; i < col1.length - 2; i++){
            col1[i].classList.add('hidden-figure');
        }
        for(let i = 0; i < col2.length - 2; i++){
            col2[i].classList.add('hidden-figure');
        }
        return;
    }
    if(mediaIndicator.desktop()){
        for(let i = 0; i < col1.length - 5; i++){
            col1[i].classList.add('hidden-figure');
        }
        for(let i = 0; i < col2.length - 3; i++){
            col2[i].classList.add('hidden-figure');
        }
        return;
    }
}