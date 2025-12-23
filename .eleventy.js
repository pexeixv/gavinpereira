module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("src/sass/styles.css");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/font");
  eleventyConfig.addPassthroughCopy("src/_data/posts.json");
  eleventyConfig.addPassthroughCopy({ "src/public/*": "/" });
  eleventyConfig.addFilter("lowerAndHyphen", (string) =>
    string.toLowerCase().replace(/\s/g, "-")
  );
  return {
    dir: {
      input: "src",
      output: "_site",
    },
    templateFormats: ["njk", "html"],
  };
};
