module.exports = eleventyConfig => {
    eleventyConfig.addPassthroughCopy('./sass/styles.css')
    eleventyConfig.addPassthroughCopy('./img')
    eleventyConfig.addPassthroughCopy('./js')
    eleventyConfig.addPassthroughCopy('./font')
    eleventyConfig.addPassthroughCopy('./_data/posts.json')
    return {
        dir: {
            input: '.',
            output: '_site'
        }
    }
}