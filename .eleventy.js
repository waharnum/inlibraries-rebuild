module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy('json');
    eleventyConfig.addPassthroughCopy('css');
    eleventyConfig.addPassthroughCopy('js');
  }