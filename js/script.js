var burger = document.querySelector('.header_burger ')
var nav = document.querySelector('.header_nav')

burger.addEventListener('click', () => {
    burger.classList.toggle('header_burger-clicked')
    nav.classList.toggle('header_nav-expanded')
})
var body = document.body
let lastScroll = 0
window.addEventListener('scroll', () => {
    var currentScroll = window.pageYOffset

    if (currentScroll <= 0) {
        body.classList.remove('scroll-up')
    }
    if (currentScroll > lastScroll && !body.classList.contains('scroll-down')) {
        body.classList.remove('scroll-up')
        body.classList.add('scroll-down')
    }
    if (currentScroll < lastScroll && body.classList.contains('scroll-down')) {
        body.classList.remove('scroll-down')
        body.classList.add('scroll-up')
    }
    lastScroll = currentScroll
})



var mode = window.localStorage.getItem('mode')
if (mode == 'dark') {
    document.body.classList.add('darkmode')
    // toggle.checked = true
} else {
    document.body.classList.remove('darkmode')
    // toggle.checked = false
}




var themeToggle = document.querySelector('div.header_theme')
var themeToggleIcon = document.querySelector('span.header_theme_icon')

var liteMode = () => {
    themeToggleIcon.innerText = 'brightness_2'
    themeToggle.style.transform = 'rotateZ(+60deg)'
    document.body.classList.remove('darkmode')
    window.localStorage.setItem('mode', 'lite')
}

var darkMode = () => {
    themeToggleIcon.innerText = 'wb_sunny'
    themeToggle.style.transform = 'rotateZ(-60deg)'
    document.body.classList.add('darkmode')
    window.localStorage.setItem('mode', 'dark')
}

themeToggle.addEventListener('click', () => {
    document.body.classList.contains('darkmode') ? liteMode() : darkMode()
})

window.localStorage.getItem('mode') == 'dark' ? darkMode() : liteMode()