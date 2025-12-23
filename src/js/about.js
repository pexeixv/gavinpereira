var namePlaceholder = document.querySelector('.know_name')
var logos = document.querySelectorAll('.know_img')
logos.forEach(logo => {
    logo.addEventListener('mouseenter', () => namePlaceholder.innerText = logo.dataset.name)
    logo.addEventListener('mouseleave', () => namePlaceholder.innerHTML = '&nbsp;')
})