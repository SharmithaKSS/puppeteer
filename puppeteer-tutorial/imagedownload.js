const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let counter = 0;
  page.on('response', async (response) => {
    const matches = /.*\.(jpg|png|svg|gif)$/.exec(response.url());
    if (matches && matches.length === 2) {
      const extension = matches[1];
      const buffer = await response.buffer();
      
     
      if (!fs.existsSync('images')) {
        fs.mkdirSync('images');
      }

      fs.writeFileSync(`images/image-${counter}.${extension}`, buffer, 'base64');
      counter += 1;
    }
  });

  // url and timeout set
  await page.goto('https://www.google.com/search?q=blackstraw+technologies', { waitUntil: 'networkidle2', timeout: 60000 });


  // Wait for the network 
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  // Extract the image 
  const images = await page.evaluate(() => {
    const imgElements = document.querySelectorAll('img');
    return Array.from(imgElements).map(img => img.src);
  });

  await browser.close();
})();
