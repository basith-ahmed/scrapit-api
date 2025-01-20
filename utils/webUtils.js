const axios = require("axios");
const cheerio = require("cheerio");
const urlParser = require("url");

async function fetchWebpage(url) {
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
  };

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch webpage: ${error.message}`);
  }
}

function cleanHtml($) {
  $("script, style, noscript, iframe, canvas").remove();
  $(
    '[class*="advertisement"], [class*="cookie"], [class*="popup"], [class*="newsletter"]'
  ).remove();

  $("a").each((i, el) => {
    const $el = $(el);
    const href = $el.attr("href");
    if (href) {
      $el.attr("href", urlParser.resolve($el.baseURI || "", href));
    }
  });

  return $;
}

function extractMetadata($) {
  const metadata = {};

  const author = $('meta[name*="author" i]').attr("content");
  if (author) metadata.author = author;

  const datePublished = $(
    'meta[name*="published_time" i], meta[name*="publication_date" i], meta[name*="date" i]'
  ).attr("content");
  if (datePublished) metadata.date_published = datePublished;

  return metadata;
}

module.exports = { fetchWebpage, cleanHtml, extractMetadata };
