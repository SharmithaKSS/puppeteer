const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
//folder
  const outputFolder = 'output';
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
  }

  const browser = await puppeteer.launch();

 //new page with browser content
  const page = await browser.newPage();

  //website
  await page.goto('https://www.google.com/search?q=blackstraw+technologies');

  // Get pages HTML 
  const content = await page.content();

  // o/p file path
  const outputPath = path.join(outputFolder, 'htmlFromWebsite.html');

  // Write the HTML content to a file
  fs.writeFileSync(outputPath, content);

 
  await browser.close();
})();
