








// header nav menu border animation 

const menuItems = document.querySelectorAll('.nav-menu li');
const span = document.createElement('span');
span.classList.add('highlight')
document.body.appendChild(span);

menuItems.forEach((item) => {
    item.addEventListener('mouseenter' , hightlight)
})

function hightlight() {
    const itemCordinates = this.getBoundingClientRect();
}