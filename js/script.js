var toggle = document.getElementById('darkmode_toggle')

toggle.addEventListener('change', () => {
    if (document.body.classList.contains('darkmode')) {
        document.body.classList.remove('darkmode')
        window.localStorage.setItem('mode', 'lite')
    } else {
        document.body.classList.add('darkmode')
        window.localStorage.setItem('mode', 'dark')
    }
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