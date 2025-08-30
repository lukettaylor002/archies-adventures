module.exports = function(eleventyConfig) {
  // Static assets
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("src/css");

  // ✅ Posts collection (all markdown files in /src/posts)
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => a.date - b.date);
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md","njk","html"]
  };
};
