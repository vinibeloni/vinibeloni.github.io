export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/files");
  // draft: true → aparece no `npm start`, fica fora do `npm run build` (o que vai pro ar)
  eleventyConfig.addPreprocessor("drafts", "*", (data) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") return false;
  });
  // links para fora do site abrem em nova aba (vale para templates e para links escritos nos posts)
  eleventyConfig.addTransform("external-links", function (html) {
    if (!this.page.outputPath?.endsWith(".html")) return html;
    return html.replace(
      /<a\s([^>]*?)href="(https?:\/\/(?!vinibeloni\.github\.io)[^"]+)"/g,
      '<a $1href="$2" target="_blank" rel="noopener"'
    );
  });
  return { dir: { input: "src", output: "_site" } };
}
