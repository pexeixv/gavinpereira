const dateFilter = date => {
    const dateArray = date.toString().split(' ')
    return `${dateArray[2]} ${dateArray[1]} ${dateArray[3]}`
}

module.exports = eleventyConfig => {
    eleventyConfig.addPassthroughCopy('./sass/styles.css')
    eleventyConfig.addPassthroughCopy('./img')
    eleventyConfig.addPassthroughCopy('./js')
    eleventyConfig.addPassthroughCopy('./font')
    eleventyConfig.addPassthroughCopy('./_redirects')
    eleventyConfig.addPassthroughCopy('./_headers')
    eleventyConfig.addPassthroughCopy('./_data/posts.json')
    eleventyConfig.addPassthroughCopy('./sitemap.xml')
    eleventyConfig.addFilter('lowerAndHyphen', string => string.toLowerCase().replace(/\s/g, "-"))
    eleventyConfig.addFilter('dateFilter', dateFilter)
    return {
        dir: {
            input: '.',
            output: '_site'
        }
    }
}
