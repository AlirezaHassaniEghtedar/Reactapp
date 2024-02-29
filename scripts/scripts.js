const courses = document.getElementById('courses');
const subNav = document.querySelector('.sub-nav');
const popup = document.querySelector('.popup');
const signUpButton = document.querySelector('.header-button');
const popupCloseBtn = document.querySelector('.popup .header .fa-times');
const overlay = document.querySelector('.overlay');
const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const captcha = document.querySelector('.g-recaptcha')
const _open_mobileMenuIcon = document.getElementById('openMenu')
const _close_mobileMenuIcon = document.getElementById('closeMenu')
const hamburgerMenu = document.getElementById('nav')
const globalHeader = document.querySelector('.global-header')
const container = document.querySelector('.container')
const mobileMenuItemHasChildren = document.querySelector('.menu-item-has-children')
const signupUserCircelIcon = document.querySelector('.fa-user-circle')


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

form.addEventListener('submit' , function(e) {
    e.preventDefault();
    checkinputs();
})

_open_mobileMenuIcon.addEventListener('click' , openHamburgerMenu)
_close_mobileMenuIcon.addEventListener('click' , closeHamburgerMenu)

mobileMenuItemHasChildren.addEventListener('click' , toggleMobileDropDownMenu)
signupUserCircelIcon.addEventListener('click' , showPopup)
// Sticky Nav Start
window.addEventListener('scroll' , function() {
    console.log(globalHeader.offsetHeight);
    console.log(globalHeader.offsetTop);
    console.log(window.scrollY);
    if(window.scrollY >= globalHeader.offsetTop + globalHeader.offsetHeight ) {
        globalHeader.style.position = 'fixed'
    } else {
        globalHeader.style.position = 'relative'
    }
})
// Sticky Nav End

// Functions
function showPopup() {
    const signUpBtnSpan = signUpButton.parentElement.querySelector('span')
    if(signUpBtnSpan.innerText === 'ورود و ثبت نام') {    
        popup.classList.add('active');
        document.body.overflow = 'hidden';
        overlay.classList.add('active');
    }
}
function closePopup() {
    popup.classList.remove('active');
    document.body.overflow = 'visible';
    overlay.classList.remove('active');
}

function checkinputs() {
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();
    
    if(usernameValue === '') {
        setErrorFor(username , 'نام کاربری باید حتما وارد شود')
    } else if (!validateEmail(usernameValue)) {
        setErrorFor(username , 'ایمیل باید با فرمت صحیح وارد شود')
    } else {
        setSuccessFor(username)
    }

    if(passwordValue === '') {
        setErrorFor(password , 'رمز عبور باید حتما وارد شود')
    } else
    if(passwordValue.length < 6) {
        setErrorFor(password , 'رمز عبور باید بیشتر از 6 کارکتر باشد')
    } else if (!validatePass(passwordValue)) {
        setErrorFor(password , 'پسوور باید با فرمت صحیح وارد شود')
    } else {
        setSuccessFor(password)
    }

    checkRecaptcha()
}

function setErrorFor(input , message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = message;
    formControl.className = 'form-control error';
    return false;       
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.style.visibility = 'hidden';
    formControl.className = 'form-control success';
}

function validateEmail(email) {
    const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email);
}

function validatePass(password) {
    const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return re.test(password)
}

function checkRecaptcha() {
    const response = grecaptcha.getResponse()
    if(response.length === 0) {
        setErrorFor(captcha , 'من ربات نیستم را تیک بزنید')
    } else if(validateEmail(username.value.trim()) && validatePass(password.value.trim())) {
        closePopup()
        const signUpBtnSpan = signUpButton.parentElement.querySelector('span')
        signUpBtnSpan.innerText = 'حساب کاربری'
    }
}

function openHamburgerMenu() {
    hamburgerMenu.classList.add('active')
    const mobileNavWidth = window.getComputedStyle(hamburgerMenu).getPropertyValue('width')
    globalHeader.style.transform = `translate(${mobileNavWidth} , 0)`
    container.style.transform = `translate(${mobileNavWidth} , 0)`
    document.body.style.overflow = 'hidden'
    _close_mobileMenuIcon.style.display = 'block'
    _open_mobileMenuIcon.style.display = 'none'
}

function closeHamburgerMenu() {
    hamburgerMenu.classList.remove('active')
    globalHeader.style.transform = `translate(0 , 0)`
    container.style.transform = `translate(0 , 0)`
    document.body.style.overflow = 'visible'
    _close_mobileMenuIcon.style.display = 'none'
    _open_mobileMenuIcon.style.display = 'block'
}

function toggleMobileDropDownMenu() {
    const i_Element = this.querySelector('i')
    if (i_Element.className === 'fa fa-angle-left') {
        this.querySelector('i').className = 'fa fa-angle-down'
    } else {
        this.querySelector('i').classList = 'fa fa-angle-left'
    }
    const ul_Element = this.querySelector('ul')
    ul_Element.classList.toggle('active')
    i_Element.setAttribute('style' , 'position:absolute;left:0')
    this.classList.toggle('active')
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
    const {width , left , bottom} = itemCordinates;
    span.style.width = `${width}px`;
    span.style.transform = `translateX(${left}px)`
}

