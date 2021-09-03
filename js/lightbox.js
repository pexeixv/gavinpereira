
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
                img.src = image.src
                img.srcset = ` https://ik.imagekit.io/gavin/gavinpereira/tr:w-450,pr-true/${slug} 500w,
                https://ik.imagekit.io/gavin/gavinpereira/tr:w-500,pr-true/${slug} 700w,
                https://ik.imagekit.io/gavin/gavinpereira/tr:w-800,pr-true/${slug} 1000w,
                `
                lightbox.innerHTML = ''
                lightbox.appendChild(img)
            }
            if (videoTag) {
                var img = document.createElement('video')
                img.setAttribute('controls', 'true')
                img.src = `https://ik.imagekit.io/gavin/gavinpereira/tr:w-800/${slug}`
                // img.srcset = ` https://ik.imagekit.io/gavin/gavinpereira/tr:w-450,pr-true/${slug} 500w,
                //             https://ik.imagekit.io/gavin/gavinpereira/tr:w-500,pr-true/${slug} 700w,
                //             https://ik.imagekit.io/gavin/gavinpereira/tr:w-800,pr-true/${slug} 1000w,
                //             `
                lightbox.innerHTML = ''
                lightbox.appendChild(img)
            }

        })
    })
}

lightbox.addEventListener('click', e => {
    if (e.target !== e.currentTarget) return
    lightbox.classList.remove('active')
})

