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
    themeToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12.43 2.3c-2.38-.59-4.68-.27-6.63.64-.35.16-.41.64-.1.86C8.3 5.6 10 8.6 10 12c0 3.4-1.7 6.4-4.3 8.2-.32.22-.26.7.09.86 1.28.6 2.71.94 4.21.94 6.05 0 10.85-5.38 9.87-11.6-.61-3.92-3.59-7.16-7.44-8.1z"/></svg>`
    themeToggle.style.transform = 'rotateZ(+60deg)'
    document.body.classList.remove('darkmode')
    window.localStorage.setItem('mode', 'lite')
}

var darkMode = () => {
    themeToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6.05 4.14l-.39-.39c-.39-.39-1.02-.38-1.4 0l-.01.01c-.39.39-.39 1.02 0 1.4l.39.39c.39.39 1.01.39 1.4 0l.01-.01c.39-.38.39-1.02 0-1.4zM3.01 10.5H1.99c-.55 0-.99.44-.99.99v.01c0 .55.44.99.99.99H3c.56.01 1-.43 1-.98v-.01c0-.56-.44-1-.99-1zm9-9.95H12c-.56 0-1 .44-1 .99v.96c0 .55.44.99.99.99H12c.56.01 1-.43 1-.98v-.97c0-.55-.44-.99-.99-.99zm7.74 3.21c-.39-.39-1.02-.39-1.41-.01l-.39.39c-.39.39-.39 1.02 0 1.4l.01.01c.39.39 1.02.39 1.4 0l.39-.39c.39-.39.39-1.01 0-1.4zm-1.81 15.1l.39.39c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41l-.39-.39c-.39-.39-1.02-.38-1.4 0-.4.4-.4 1.02-.01 1.41zM20 11.49v.01c0 .55.44.99.99.99H22c.55 0 .99-.44.99-.99v-.01c0-.55-.44-.99-.99-.99h-1.01c-.55 0-.99.44-.99.99zM12 5.5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-.01 16.95H12c.55 0 .99-.44.99-.99v-.96c0-.55-.44-.99-.99-.99h-.01c-.55 0-.99.44-.99.99v.96c0 .55.44.99.99.99zm-7.74-3.21c.39.39 1.02.39 1.41 0l.39-.39c.39-.39.38-1.02 0-1.4l-.01-.01c-.39-.39-1.02-.39-1.41 0l-.39.39c-.38.4-.38 1.02.01 1.41z"/></svg>`
    themeToggle.style.transform = 'rotateZ(-60deg)'
    document.body.classList.add('darkmode')
    window.localStorage.setItem('mode', 'dark')
}

themeToggle.addEventListener('click', () => {
    document.body.classList.contains('darkmode') ? liteMode() : darkMode()
})

window.localStorage.getItem('mode') == 'dark' ? darkMode() : liteMode()