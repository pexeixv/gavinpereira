module.exports = eleventyConfig => {
    eleventyConfig.addPassthroughCopy('./sass/styles.css')
    eleventyConfig.addPassthroughCopy('./img')
    eleventyConfig.addPassthroughCopy('./js')
    eleventyConfig.addPassthroughCopy('./font')
    eleventyConfig.addPassthroughCopy('./_redirects')
    eleventyConfig.addPassthroughCopy('./_headers')
    eleventyConfig.addPassthroughCopy('./_data/posts.json')
    eleventyConfig.addPassthroughCopy('./sitemap.xml')
    eleventyConfig.addPassthroughCopy('./gavin-pereira-resume.pdf')
    eleventyConfig.addFilter('lowerAndHyphen', string => string.toLowerCase().replace(/\s/g, "-"))
    return {
        dir: {
            input: '.',
            output: '_site'
        }
    }
}
