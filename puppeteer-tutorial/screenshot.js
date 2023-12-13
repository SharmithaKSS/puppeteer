const puppeteer = require('puppeteer');

(async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // height and width set for scrreshot
  await page.setViewport({ width: 1280, height: 720 });

  //url
  const website_url = 'https://www.google.com/search?gs_ssp=eJzj4tVP1zc0TK9IN64ozEk3YLRSNagwTjQ1Mk1JMTcxTjY2tEg1tjKoMDI1tTQ3SDK1SE1LNDA1N_IST8pJTM4uLilKLFcoSU3OyMvPyU_PTC0GAI5EGHM&q=blackstraw+technologies&rlz=1C1GCEA_enIN1087IN1088&oq=blackst&gs_lcrp=EgZjaHJvbWUqDQgDEC4YrwEYxwEYgAQyBggAEEUYOTIWCAEQLhiDARjHARixAxjJAxjRAxiABDIHCAIQABiABDINCAMQLhivARjHARiABDIHCAQQABiABDIHCAUQABiABDIGCAYQRRg9MgYIBxBFGD3SAQkxNDczMWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8';
  await page.goto(website_url, { waitUntil: 'networkidle0' });

  // Capture screenshot
  await page.screenshot({
    path: 'screenshot.jpg',
  });

  await browser.close();
})();