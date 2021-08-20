module.exports = eleventyConfig => {
    eleventyConfig.addPassthroughCopy('./sass/styles.css')
    eleventyConfig.addPassthroughCopy('./img')
    eleventyConfig.addPassthroughCopy('./js')
    return {
        dir: {
            input: 'src',
            output: '_site'
        }
    }
}