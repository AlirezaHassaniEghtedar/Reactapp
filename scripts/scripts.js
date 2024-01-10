const courses = document.getElementById('courses');
const subNav = document.querySelector('.sub-nav');
const popup = document.querySelector('.popup');
const signUpButton = document.querySelector('.header-button');
const popupCloseBtn = document.querySelector('.popup .header .fa-times');
const overlay = document.querySelector('.overlay');





// event listeners

courses.addEventListener('mouseover' , function(){
    subNav.style.display = 'flex';
})

subNav.addEventListener('mouseleave' , function(){
    subNav.style.display = 'none';
})

signUpButton.addEventListener('click' , showPopup)

popupCloseBtn.addEventListener('click' , closePopup)

overlay.addEventListener('click' , closePopup)
// Functions
function showPopup() {
    popup.classList.add('active');
    document.body.overflow = 'hidden';
    overlay.classList.add('active');
}
function closePopup() {
    popup.classList.remove('active');
    document.body.overflow = 'visible';
    overlay.classList.remove('active');
}





// header nav menu border animation 

const menuItems = document.querySelectorAll('.nav-menu li');
const span = document.createElement('span');
span.classList.add('highlight')
document.querySelector('.global-header').appendChild(span);

menuItems.forEach((item) => {
    item.addEventListener('mouseenter' , hightlight)
})

function hightlight() {
    const itemCordinates = this.getBoundingClientRect();
    console.log(itemCordinates);
    const {width , left , bottom} = itemCordinates;
    console.log(width , left , bottom);
    span.style.width = `${width}px`;
    span.style.transform = `translateX(${left}px)`
}

