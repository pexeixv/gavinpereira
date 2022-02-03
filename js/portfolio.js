var xhr = new XMLHttpRequest()
var url = '/_data/posts.json'
xhr.onload = e => {
    var data = JSON.parse(xhr.response)
    injectAll(data)
}
xhr.open("GET", url, true)
xhr.send()




var postSnippet = post => {
    var string = ''
    string += `<div class="post">
    <div class="post_image_flex">`
    if (post.image)
        string += `<img src="https://ik.imagekit.io/gavin/gavinpereira/tr:w-450,pr-true,q-70/${post.image}" loading="lazy" class="post_image" data-slug="${post.image}">`
    if (post.video)
        string += `<video class="post_image" loop autoplay muted data-slug="${post.video}">
                        <source  src="https://ik.imagekit.io/gavin/gavinpereira/tr:w-450/${post.video}">
                    </video>`
    string += `<div class="post_enlarge"><i class="fas fa-expand-arrows-alt"></i></div>`
    string += `</div>
    <h4 class="post_title">${post.name}</h4>
    <div class="post_tags">`

    if (post.tags)
        post.tags.forEach(tag => { string += `<div class="post_tag">${tag}</div>` })
    string += `</div>`
    if (post.desc)
        string += `<p class="post_desc">${post.desc}</p>`
    if (post.link)
        string += `<a class="post_link" href="http://${post.link}" target="_blank">${post.link}</a>`
    string += `</div>`
    return string
}

var injectAll = posts => {

    var categories = [
        posts.filter(post => post.category == 'frontend'),
        posts.filter(post => post.category == 'logo'),
        posts.filter(post => post.category == 'motion'),
        posts.filter(post => post.category == 'graphic')
    ]

    var inject = e => {
        var id = e.target.id.slice(-1)
        var button = $(`button#btn-${id}`)
        var grid = $(`div#grid-${id}`)
        var limit = 3
        var printed = +grid.dataset.printed || 0
        var total = +grid.dataset.total || categories[id - 1].length
        if (printed + limit < total) {
            for (var i = printed; i < printed + limit; i++)
                grid.innerHTML += postSnippet(categories[id - 1][i])
            printed += limit
            grid.dataset.total = +total
            grid.dataset.printed = +printed
        } else {
            for (var i = printed; i < total; i++)
                grid.innerHTML += postSnippet(categories[id - 1][i])
            button.style.display = 'none'
            grid.dataset.total = +total
            grid.dataset.printed = +total
        }
        grid.previousElementSibling.style.display = 'none'
        lightboxListener()
    }

    buttons = $$('.port_btn')
    buttons.forEach(button => {
        button.addEventListener('click', inject)
        button.click()
    })
}





