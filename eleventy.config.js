export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addFilter("date", (d) =>
    d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" })
  );
  return { dir: { input: "src", output: "_site" } };
}
