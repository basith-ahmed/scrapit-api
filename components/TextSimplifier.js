class Config {
  constructor() {
     this.stopWords = new Set([
       "the",
       "is",
       "in",
       "at",
       "of",
       "and",
       "to",
       "for",
       "on",
       "with",
       "a",
       "an",
       "by",
       "as",
       "it",
       "be",
       "this",
       "that",
       "these",
       "those",
       "are",
       "was",
       "were",
       "will",
       "would",
       "can",
       "could",
       "should",
       "have",
       "has",
       "had",
       "not",
       "but",
       "or",
       "if",
       "so",
       "then",
       "than",
       "just",
       "about",
       "into",
       "over",
       "under",
       "out",
       "up",
       "down",
       "off",
       "too",
       "very",
       "some",
       "any",
     ]);

     this.synonyms = {
       utilize: "use",
       demonstrate: "show",
       accomplish: "do",
       "in order to": "to",
       "due to the fact that": "because",
       approximately: "approx.",
       "for example": "e.g.",
       "do not": "don't",
       cannot: "can't",
       "does not": "doesn't",
       implement: "use",
       facilitate: "help",
       leverage: "use",
       optimize: "improve",
       enhance: "improve",
       mitigate: "reduce",
       necessitate: "need",
       utilize: "use",
       commence: "start",
       terminate: "end",
       subsequent: "later",
       "prior to": "before",
       "in the event that": "if",
       "despite the fact that": "although",
       "at this point in time": "now",
       "in the near future": "soon",
       "with regard to": "about",
       "as a result of": "because",
       "in the vicinity of": "near",
       "a large number of": "many",
       "at that point in time": "then",
       "in conjunction with": "with",
       "take into consideration": "consider",
       "on behalf of": "for",
       "in order for": "for",
       "in an effort to": "to",
       "despite the fact": "although",
       "for the purpose of": "for",
       "owing to the fact that": "because",
       "in close proximity to": "near",
       "in light of the fact": "because",
       "has the ability to": "can",
       "it is necessary to": "must",
       "at all times": "always",
       "in the majority of cases": "usually",
       "until such time as": "until",
       "on a regular basis": "regularly",
       "with the exception of": "except",
       "to the extent that": "if",
       "by means of": "by",
       "in accordance with": "per",
       "during the course of": "during",
       "on the grounds that": "because",
       "as a means of": "to",
       "a number of": "some",
     };

     this.redundantPhrases = {
       "repeat again": "repeat",
       "added bonus": "bonus",
       "advance planning": "planning",
       "basic essentials": "essentials",
       "blend together": "blend",
       "collaborate together": "collaborate",
       "end result": "result",
       "future plans": "plans",
       "past history": "history",
       "revert back": "revert",
       "sum total": "total",
       "unexpected surprise": "surprise",
       "close proximity": "proximity",
       "final outcome": "outcome",
       "free gift": "gift",
       "general consensus": "consensus",
       "large in size": "large",
       "new innovation": "innovation",
       "temporary pause": "pause",
       "completely destroy": "destroy",
       "absolutely necessary": "necessary",
       "true fact": "fact",
       "actual experience": "experience",
       "each and every": "every",
       "completely finish": "finish",
       "personal opinion": "opinion",
       "return back": "return",
       "combine together": "combine",
       "mutual cooperation": "cooperation",
       "advance warning": "warning",
       "filled to capacity": "filled",
       "refer back": "refer",
     };

     this.numberMapping = {
       zero: "0",
       one: "1",
       two: "2",
       three: "3",
       four: "4",
       five: "5",
       six: "6",
       seven: "7",
       eight: "8",
       nine: "9",
       ten: "10",
       eleven: "11",
       twelve: "12",
       thirteen: "13",
       fourteen: "14",
       fifteen: "15",
       sixteen: "16",
       seventeen: "17",
       eighteen: "18",
       nineteen: "19",
       twenty: "20",
       thirty: "30",
       forty: "40",
       fifty: "50",
       sixty: "60",
       seventy: "70",
       eighty: "80",
       ninety: "90",
       hundred: "100",
       thousand: "1000",
       million: "1000000",
     };

     this.compressionLevels = {
       1: "minimal",
       2: "moderate",
       3: "aggressive",
       4: "maximum",
     };

     this.unnecessaryAdjectives = new Set([
       "very",
       "extremely",
       "really",
       "just",
       "simply",
       "quite",
       "rather",
       "somewhat",
       "fairly",
       "pretty",
       "totally",
       "absolutely",
       "completely",
       "utterly",
       "entirely",
       "fully",
       "thoroughly",
       "wholly",
       "perfectly",
       "seriously",
       "literally",
       "significantly",
       "unbelievably",
       "incredibly",
       "highly",
       "greatly",
       "deeply",
       "overly",
       "truly",
       "particularly",
       "notably",
       "amazingly",
       "awfully",
       "surprisingly",
       "remarkably",
       "exceptionally",
       "especially",
       "profoundly",
       "extraordinarily",
     ]);
  }
}

class TextSimplifier {
  constructor(config = new Config()) {
    this.config = config;
  }

  simplify(text) {
    let result = text;
    const tokens = this.tokenize(result);

    result = this.removeStopWords(tokens).join(" ");
    result = this.replaceSynonyms(result);

    result = this.removeUnnecessaryAdjectives(result);
    result = this.simplifyPhrases(result);

    result = this.convertPassiveToActive(result);
    result = this.removeRedundantPhrases(result);

    result = this.compressMax(result);

    result = this.splitLongSentences(result);
    result = this.convertNumbers(result);
    return result.trim();
  }

  tokenize(text) {
    return text.toLowerCase().match(/\b\w+\b/g) || [];
  }

  removeStopWords(tokens) {
    return tokens.filter((word) => !this.config.stopWords.has(word));
  }

  replaceSynonyms(text) {
    let result = text;
    Object.entries(this.config.synonyms).forEach(([long, short]) => {
      result = result.replace(new RegExp(`\\b${long}\\b`, "gi"), short);
    });
    return result;
  }

  removeUnnecessaryAdjectives(text) {
    return text
      .split(" ")
      .filter(
        (word) => !this.config.unnecessaryAdjectives.has(word.toLowerCase())
      )
      .join(" ");
  }

  simplifyPhrases(text) {
    let result = text;
    Object.entries(this.config.synonyms).forEach(([long, short]) => {
      result = result.replace(new RegExp(`\\b${long}\\b`, "gi"), short);
    });
    return result;
  }

  convertPassiveToActive(text) {
    const patterns = [
      [/\bis\b (being )?(done|used|shown|demonstrated) by\b/gi, "does"],
      [/\bare\b (being )?(done|used|shown|demonstrated) by\b/gi, "do"],
    ];
    return patterns.reduce(
      (result, [pattern, replacement]) => result.replace(pattern, replacement),
      text
    );
  }

  removeRedundantPhrases(text) {
    let result = text;
    Object.entries(this.config.redundantPhrases).forEach(
      ([redundant, simple]) => {
        result = result.replace(new RegExp(`\\b${redundant}\\b`, "gi"), simple);
      }
    );
    return result;
  }

  compressMax(text) {
    return text
      .replace(/\b(is|are|am|was|were)\b/gi, "")
      .replace(/\b(has|have|had)\b/gi, "")
      .replace(/\b(that|which|who)\b/gi, "")
      .trim();
  }

  splitLongSentences(text) {
    const sentences = text.split(/[.!?]+/);
    return sentences
      .map((sentence) => {
        if (sentence.split(" ").length > 20) {
          const parts = sentence.split(/[,;]/);
          if (parts.length > 1) {
            return parts
              .map((part) => part.trim())
              .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
              .join(". ");
          }
        }
        return sentence;
      })
      .join(". ");
  }

  convertNumbers(text) {
    let result = text;
    Object.entries(this.config.numberMapping).forEach(([word, num]) => {
      result = result.replace(new RegExp(`\\b${word}\\b`, "gi"), num);
    });
    return result;
  }
}

module.exports = { TextSimplifier, Config };
