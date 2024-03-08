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
const topBar = document.querySelector('.top-bar')
const container = document.querySelector('.container')
const mobileMenuItemHasChildren = document.querySelector('.menu-item-has-children')
const signupUserCircelIcon = document.querySelector('.fa-user-circle')
const toggleSearch = document.getElementById('toggleSearch')
const headerRow = document.querySelector('.header-row')
const searchRow = document.querySelector('.search-row')
const searchInput = document.querySelector('.search-input')
const featuredCourse = document.querySelector('.featured-course')
const back_to_top = document.querySelector('.back-to-top')
const shoppingCartTotal = document.querySelector('.shopping-cart-total')
const shoppingCartIcon = document.querySelector('.fa-shopping-bag')
const shoppingCartBox = document.querySelector('.shopping-cart-box')
const shoppingBagItemsNumber = document.querySelector('.mini-cart-opener .reactapp-cart-number')
const mobileMenuShoppingCartNumber = document.querySelector('.studiare-cart-number')
const mobileShoppingCartItemsNumber = document.querySelector('.top-bar-items-mobile .reactapp-cart-number')
const shoppingCartItems = document.querySelector('.shopping-cart-items')
let shoppingCartTimesIcons = shoppingCartBox.querySelectorAll('.fa.fa-times')

// Back To Top Progress
let scrollHeight , scrollTop , clientHeight , position_percentage;

// CountDown Selectors
const _days_ = document.getElementById('days')
const _hours_ = document.getElementById('hours')
const _minutes_ = document.getElementById('minutes')
const _seconds_ = document.getElementById('seconds')


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

document.addEventListener('keyup' , (e) => {
    if(e.code === 'Escape') closePopup()
})

toggleSearch.addEventListener('click' , toggleSearchHandler)


// Sticky Nav Start
window.addEventListener('scroll' , function() {
    if(window.scrollY >= globalHeader.offsetTop + globalHeader.offsetHeight ) {
        globalHeader.style.position = 'fixed'
    } else {
        globalHeader.style.position = 'relative'
    }
    // show back to top btn
    if(scrollY > 100) {
        back_to_top.classList.add('active')
    } else {
        back_to_top.classList.remove('active')
    }
    // back to top progress
    scrollTop = document.documentElement.scrollTop
    scrollHeight = document.documentElement.scrollHeight
    clientHeight = this.document.documentElement.clientHeight

    position_percentage = Math.round((scrollTop * 100) / (scrollHeight - clientHeight))

    back_to_top.style.setProperty('background-image' , `conic-gradient(#ffd738 ${position_percentage}% , #455A64 ${position_percentage}%)`)
})

// Sticky Nav End

// Featured Course Anmation
window.addEventListener('load' , () => {
    window.addEventListener('scroll' , () => {
        featuredCourse.classList.add('active')
    })
})

// Back To Top
back_to_top.addEventListener('click' , () => {
    window.scrollTo({top:0 , behavior:"smooth"})
})

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
    topBar.style.transform = `translate(${mobileNavWidth} , 0)`
    document.body.style.overflow = 'hidden'
    _close_mobileMenuIcon.style.display = 'block'
    _open_mobileMenuIcon.style.display = 'none'
}

function closeHamburgerMenu() {
    hamburgerMenu.classList.remove('active')
    globalHeader.style.transform = `translate(0 , 0)`
    container.style.transform = `translate(0 , 0)`
    topBar.style.transform = `translate(0 , 0)`
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

function toggleSearchHandler() {
    if(this.className === 'fa fa-search') {
        document.querySelector('.highlight').style.visibility = 'hidden'
        headerRow.classList.add('disabled')
        searchRow.classList.add('active')
        this.className = 'fa fa-times'
        addSpeechRecognition()
    } else {
        document.querySelector('.highlight').style.visibility = 'visible'
        headerRow.classList.remove('disabled')
        searchRow.classList.remove('active')
        this.className = 'fa fa-search'
    }
}

function addSpeechRecognition() {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = 'fa-IR'
    recognition.interimResults = true
    recognition.addEventListener('result' , e => {
        // searchInput.value = e.results[0][0].transcript
        if(e.results[0].isFinal) {
            searchInput.value = e.results[0][0].transcript
        }
    })
    recognition.addEventListener('end' , recognition.start)
    recognition.start()
}

function deleteProduct(e) {
    e.target.parentElement.remove()
    updateShoppingCartItems()
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

// CountDown start
const _publishDate_ = 'Dec 10 2024'
let days , hours , minutes , seconds;
function countDown() {
    const currentDate = new Date()
    const publishDate = new Date(_publishDate_)
    remainingTime = publishDate - currentDate;

    days = Math.floor(remainingTime / 1000 / 3600 / 24)
    hours = Math.floor(remainingTime / 1000 / 3600) % 24
    minutes = Math.floor(remainingTime / 1000 / 60) % 60
    seconds = Math.floor(remainingTime / 1000) % 60

    _days_.innerText = days
    _hours_.innerText = hours
    _minutes_.innerText = minutes
    _seconds_.innerText = seconds
}
setInterval(countDown , 1000)
// CountDown end

// Shopping cart start
shoppingCartIcon.addEventListener('click' , toggleShoppingCartBox)

function toggleShoppingCartBox() {
    shoppingCartBox.classList.toggle('active')
}

function updateShoppingCartItems() {   
    let sum = 0;
    const coursesPrice = shoppingCartBox.querySelectorAll('.item-price')
    coursesPrice.forEach(course => {
        sum += Number(course.innerText.match(/\d+/))
    })
    shoppingCartTotal.innerText = `${sum} تومان`
    shoppingBagItemsNumber.innerText = coursesPrice.length
    mobileShoppingCartItemsNumber.innerText = coursesPrice.length
    mobileMenuShoppingCartNumber.innerText = coursesPrice.length
}

updateShoppingCartItems()

// Add item to shopping cart start
const pruductsAddToCartBtns = document.querySelectorAll('.featured-course-container .course .add-to-cart')
pruductsAddToCartBtns.forEach(item => {
    item.addEventListener('click' , detectCourseDetails)
})

function detectCourseDetails(e) {
    e.preventDefault()
    if(e.target.className === 'add-to-cart') {
        const course = e.target.parentElement.parentElement
        addToCartCourse(course)
    } else if(e.target.className === 'fas fa-user-plus') {
        const course = e.target.parentElement.parentElement.parentElement
        addToCartCourse(course)
    }
}

function addToCartCourse(course) {
    let courseImageSource = course.querySelector('.thumnail-course-holder img').src
    let courseTitle = course.querySelector('.course-content-holder .course-title').innerText
    let coursePrice = course.querySelector('.course-price .amount').innerText.match(/\d+/)
    console.log(course.querySelector('.course-price .amount').innerText.match(/\d+/));
    coursePrice = (coursePrice === 'رایگان!') ? 0 : Number(coursePrice)
    // console.log(courseImageSource , courseTitle , coursePrice);
    const newCartItem = document.createElement('div')
    newCartItem.classList.add('shopping-cart-item')
    newCartItem.innerHTML = `
    <i class="fa fa-times"></i>
    <img src="${courseImageSource}" alt="${courseTitle}">
    <div class="cart-item-content">
        <span class="list-name">${courseTitle}</span>
        <span class="item-price">${coursePrice} تومان</span>
    </div>
    `
    newCartItem.querySelector('.fa.fa-times').addEventListener('click' , deleteProduct)
    shoppingCartItems.appendChild(newCartItem)
    updateShoppingCartItems()
}
// delete shopping cart items
shoppingCartTimesIcons.forEach(item => {
    item.addEventListener('click' , deleteProduct)
})
// Add item to shopping cart end

// Shopping cart end