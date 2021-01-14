/*document.querySelector(".video-button")
.addEventListener('click', function(){
    let vid = document.querySelector(".header__video-background");
    if(vid.dataset.playing === ""){
        vid.play();
        vid.dataset.playing = "playing";
        console.log(123);
    } else {
        vid.pause();
        vid.dataset.playing = "";
        console.log(1234);
    }
});*/
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

