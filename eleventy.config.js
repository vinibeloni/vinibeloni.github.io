export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/files");
  // draft: true → aparece no `npm start`, fica fora do `npm run build` (o que vai pro ar)
  eleventyConfig.addPreprocessor("drafts", "*", (data) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") return false;
  });
  eleventyConfig.addFilter("date", (d, lang = "pt") =>
    d.toLocaleDateString(lang === "en" ? "en-US" : "pt-BR", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" })
  );
  return { dir: { input: "src", output: "_site" } };
}
