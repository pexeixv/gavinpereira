var toggle = document.getElementById('darkmode_toggle')
var ball = document.querySelector('.darkmode_label .ball')

toggle.addEventListener('change', () => {
    ball.classList.add('ball-trans')
    if (document.body.classList.contains('darkmode')) {
        document.body.classList.remove('darkmode')
        window.localStorage.setItem('mode', 'lite')
    } else {
        document.body.classList.add('darkmode')
        window.localStorage.setItem('mode', 'dark')
    }
    ball.classList.remove('ball-trans')
})

var mode = window.localStorage.getItem('mode')
if (mode == 'dark') {
    document.body.classList.add('darkmode')
    toggle.checked = true
} else {
    document.body.classList.remove('darkmode')
    toggle.checked = false
}


var burger = document.querySelector('.header_burger ')
var nav = document.querySelector('.header_nav')

burger.addEventListener('click', () => {
    burger.classList.toggle('header_burger-clicked')
    nav.classList.toggle('header_nav-expanded')
})
// document.querySelector('.darkmode_label .ball').classList.add('ball-trans')






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