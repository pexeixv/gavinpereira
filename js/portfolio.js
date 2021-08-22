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
    <img src="${post.image}" class="post_image">
    <h4 class="post_title">${post.name}</h4>
    <div class="post_tags">`

    if (post.tags)
        post.tags.forEach(tag => { string += `<div class="post_tag">${tag}</div>` })
    string += `</div>`
    if (post.desc)
        string += `<p class="post_desc">${post.desc}</p>`
    string += `</div>`
    return string
}

var injectAll = posts => {
    var types = {
        1: {
            "name": "frontend",
            "posts": posts.filter(post => post.category == 'frontend')
        },
        2: {
            "name": "logo",
            "posts": posts.filter(post => post.category == 'logo')
        },
        3: {
            "name": "motion",
            "posts": posts.filter(post => post.category == 'motion')
        },
        4: {
            "name": "graphic",
            "posts": posts.filter(post => post.category == 'graphic')
        }

    }

    var inject = e => {
        var id = e.target.id.slice(-1)
        var button = document.querySelector(`button#btn-${id}`)
        var grid = document.querySelector(`div#grid-${id}`)
        var limit = 3
        var printed = +grid.dataset.printed || 0
        var total = +grid.dataset.total || types[id].posts.length
        if (printed + limit < total) {
            for (var i = printed; i < printed + limit; i++)
                grid.innerHTML += postSnippet(types[id].posts[i])
            printed += limit
            grid.dataset.total = +total
            grid.dataset.printed = +printed
        } else {
            for (var i = printed; i < total; i++)
                grid.innerHTML += postSnippet(types[id].posts[i])
            button.style.display = 'none'
            grid.dataset.total = +total
            grid.dataset.printed = +total
        }
    }


    buttons = document.querySelectorAll('.port_btn')
    buttons.forEach(button => {
        button.addEventListener('click', inject)
        button.click()
    })
}




