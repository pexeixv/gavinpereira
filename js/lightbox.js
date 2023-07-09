
var lightbox = document.createElement('div')
lightbox.id = 'lightbox'
document.body.append(lightbox)

var lightboxListener = () => {
    var images = $$('.post_image')
    images.forEach(image => {
        image.addEventListener('click', e => {
            lightbox.classList.add('active')
            var slug = image.dataset.slug
            var videoTag = $('video', e.target.parentElement.parentElement)
            var imgTag = $('img', e.target.parentElement.parentElement)


            if (imgTag) {
                var img = document.createElement('img')
                img.classList.add('lightbox_image')
                img.src = image.src
                img.srcset = `https://ik.imagekit.io/gavin/gavinpereira/tr:w-450,pr-true/${slug} 450w,
              https://ik.imagekit.io/gavin/gavinpereira/tr:w-500,pr-true/${slug} 500w,
              https://ik.imagekit.io/gavin/gavinpereira/tr:w-800,pr-true/${slug} 800w,
              https://ik.imagekit.io/gavin/gavinpereira/tr:w-1000,pr-true/${slug} 1000w
              `

            }
            if (videoTag) {
                var img = document.createElement('video')
                img.classList.add('lightbox_image')
                img.setAttribute('controls', 'true')
                img.setAttribute('autoplay', 'true')
                img.setAttribute('loop', 'true')
                img.dataset.setup = `{}`
                img.innerHTML = `<source src="https://ik.imagekit.io/gavin/gavinpereira/tr:w-800/${slug}">`
            }
            lightbox.innerHTML = '<div class="lightbox_load"><i class="fas fa-spinner fa-pulse fa-3x"></i></div>'
            lightbox.appendChild(img)
        })
    })
}



lightbox.addEventListener('click', e => {
    if (e.target !== e.currentTarget) return
    lightbox.classList.remove('active')
})



window.addEventListener('keydown', e => {
    if (e.keyCode == '27') {
        lightbox.classList.remove('active')
    }
})

