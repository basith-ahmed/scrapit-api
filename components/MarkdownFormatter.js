const urlParser = require("url");

class MarkdownFormatter {
  constructor(url) {
    this.url = url;
    this.domain = urlParser.parse(url).hostname;
    this.date = new Date().toISOString().split("T")[0];
    this.metadata = {
      url,
      domain: this.domain,
      capture_date: this.date,
      word_count: 0,
      sections: [],
    };
  }

  createHeader(title, author = null, datePublished = null) {
    return `${title}\n\n`;
  }

  formatMarkdown(content) {
    let formatted = content;
    const replacements = [
      [/^(#+)\s*/gm, "$1 "],
      [/\n(#+\s.*?)\n/g, "\n\n$1\n\n"],
      [/^\s*[-*+]\s/gm, "* "],
      [/^\s{2,}[-*+]\s/gm, "  * "],
      [/^\s*>\s*/gm, "> "],
      [/\n([^>\n])/g, "\n\n$1"],
      [/```(\w+)?\n/g, "\n```$1\n"],
      [/\n```\n/g, "\n\n```\n\n"],
      [/\n(\|[^|\n]+\|)\n/g, "\n\n$1\n"],
      [/\n{3,}/g, "\n\n"],
      [/\n---\n/g, "\n\n---\n\n"],
    ];

    replacements.forEach(([pattern, replacement]) => {
      formatted = formatted.replace(pattern, replacement);
    });

    return formatted;
  }

  countWords(content) {
    const textOnly = content.replace(/[#*_\[\](){}]/g, "");
    return textOnly.match(/\w+/g)?.length || 0;
  }
}

module.exports = { MarkdownFormatter };
