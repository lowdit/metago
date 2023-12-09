const loader = require("./_config/utils/loader.util");
const fg = require("fast-glob")
const concat = require("concat")

module.exports = (eleventyConfig) => {
  // Load eleventy configurations from './_config' folder
  loader([__dirname, "_config"], eleventyConfig);

  eleventyConfig.addFilter('log', value => {
    console.log(value)
  })

  eleventyConfig.addShortcode("includeall", function (path) {
    const entries = concat(fg.sync(path));
    return entries
  });

  eleventyConfig.addPassthroughCopy("./../assets");
  return {
    pathPrefix: process.env.ELEVENTY_NOTES_PATH_PREFIX || undefined,
    dir: {
      input: "./../",
      output: "dist",
      data: ".app/_data",
      includes: ".app/_includes",
    },
    htmlTemplateEngine: 'liquid',
    markdownTemplateEngine: false

  };
};
