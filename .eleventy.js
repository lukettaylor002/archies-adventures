module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  eleventyConfig.addPassthroughCopy({ "src/images/favicon.png": "favicon.png" });
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("admin");

// Date filter (Luxon) — UK format dd/MM/yyyy
const { DateTime } = require("luxon");
eleventyConfig.addFilter("date", (dateObj, fmt = "dd/LL/yyyy") =>
  DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(fmt)
);

// Read time filter
eleventyConfig.addFilter("readTime", (content) => {
  const words = (content || "").toString().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.ceil(words / 220));
  return `${mins} min read`;
});
  
  // IMPORTANT: the posts collection
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/posts/*.md").sort((a, b) => a.date - b.date)
  );

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"]
  };
};
