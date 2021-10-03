const pluginPWA = require("eleventy-plugin-pwa");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("./sass/styles.css");
  eleventyConfig.addPassthroughCopy("./img");
  eleventyConfig.addPassthroughCopy("./js");
  eleventyConfig.addPassthroughCopy("./font");
  eleventyConfig.addPassthroughCopy("./_redirects");
  eleventyConfig.addPassthroughCopy("./_data/posts.json");
  eleventyConfig.addPassthroughCopy("./sitemap.xml");
  eleventyConfig.addFilter("lowerAndHyphen", (string) =>
    string.toLowerCase().replace(/\s/g, "-")
  );
  eleventyConfig.addPlugin(pluginPWA, {
    swDest: "./_site/service-worker.js",
    globDirectory: "./_site",
    cacheId: "gavin-pereira",
    cleanupOutdatedCaches: true,
    clientsClaim: true,
    skipWaiting: true,
    runtimeCaching: [
      {
        urlPattern:
          /^.*\.(html|jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/,
        handler: "CacheFirst",
        options: {
          cacheName: "gavin-pereira-runtime",
          expiration: {
            maxEntries: 10,
          },
        },
      },
    ],
  });

  return {
    dir: {
      input: ".",
      output: "_site",
    },
  };
};
