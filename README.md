# MDowner

A powerful web content to Markdown converter with text simplification capabilities.

## Features

- 🌐 Fetches web content from any URL
- 📝 Converts HTML to clean Markdown
- 🔄 Simplifies text content automatically
- 🗜️ Multiple compression levels
- 🧹 Removes unnecessary HTML elements
- 🔗 Preserves and fixes relative links
- 📊 Provides metadata about the converted content

## Installation

```bash
# Clone the repository
git clone https://github.com/basith-ahmed/scrapit-api.git

# Install dependencies
cd mdowner
npm install
```

## Usage

Start the server:

```bash
npm start
```

### API Endpoints

#### Convert URL to Markdown

```
GET /convert?url=<webpage_url>&compress=<true|false>
```

Parameters:
- `url`: The webpage URL to convert (required)
- `compress`: Enable text simplification (optional, default: false)

Example requests:
```bash
# Basic conversion
curl http://localhost:3000/convert?url=https://example.com

# With text simplification
curl http://localhost:3000/convert?url=https://example.com&compress=true
```

## Text Simplification Features

- Removes unnecessary adjectives and stop words
- Converts passive voice to active voice
- Simplifies complex phrases
- Converts written numbers to numerals
- Splits long sentences
- Removes redundant phrases
- Replaces verbose expressions with simpler alternatives
