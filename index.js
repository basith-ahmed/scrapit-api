const express = require("express");
const cheerio = require("cheerio");
const urlParser = require("url");
const html2md = require("html-to-md");
const path = require("path");
const {
  fetchWebpage,
  cleanHtml,
  extractMetadata,
} = require("./utils/webUtils");
const { MarkdownFormatter } = require("./components/MarkdownFormatter");
const { TextSimplifier, Config } = require("./components/TextSimplifier");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "views", "index.html");
  res.status(200).sendFile(filePath);
});

app.get("/context", async (req, res) => {
  try {
    const { url, compress } = req.query;

    if (!url) {
      return res.status(400).send("URL parameter is required");
    }

    const html = await fetchWebpage(url);
    const $ = cheerio.load(html);
    const cleanedHtml = cleanHtml($);

    const metadata = extractMetadata($);
    const title =
      $("title").text() || urlParser.parse(url).pathname.split("/").pop();

    const formatter = new MarkdownFormatter(url);
    const markdown = html2md(cleanedHtml.html());
    let formattedContent = formatter.formatMarkdown(markdown);

    if (compress === "true") {
      const simplifier = new TextSimplifier(new Config());
      formattedContent = simplifier.simplify(formattedContent);
    }

    const header = formatter.createHeader(
      title,
      metadata.author,
      metadata.date_published
    );
    const finalContent = header + formattedContent;

    formatter.metadata = {
      ...formatter.metadata,
      ...metadata,
      word_count: formatter.countWords(formattedContent),
      title: title,
    };

    res.type("text/plain").send(finalContent);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;

// http://localhost:3000/context?url=https://basithahmed.me&compress=true&level=4
// http://localhost:3000/context?url=https://basithahmed.me&compress=true
// http://localhost:3000/context?url=https://basithahmed.me
