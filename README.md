# zdenekdi.github.io

This is a personal portfolio website hosted on GitHub Pages.

## Structure

- `index.html` - Main landing page
- `css/` - Stylesheets directory
  - `style.css` - Main stylesheet
- `js/` - JavaScript files directory
  - `script.js` - Main JavaScript file with smooth scrolling and animations
- `assets/` - Assets directory
  - `images/` - Images and media files

## Setup

This site is automatically deployed via GitHub Pages. Any changes pushed to the main branch will be reflected on the live site.

## Local Development

To view locally, simply open `index.html` in a web browser, or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server
```

Then navigate to `http://localhost:8000` in your browser.

## Moving Files from Another Repository

If you're moving files from another repository (e.g., qa-portfolio) to this one:

1. Clone both repositories locally
2. Copy the files you want to move from the source repository
3. Paste them into the appropriate directories in this repository
4. Commit and push the changes
5. The site will automatically update on GitHub Pages

Example:
```bash
# Clone source repository
git clone https://github.com/username/source-repo.git

# Copy files to this repository
cp -r source-repo/files/* zdenekdi.github.io/

# Commit changes
cd zdenekdi.github.io
git add .
git commit -m "Move files from source-repo"
git push
```