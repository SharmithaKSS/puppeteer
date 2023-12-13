const puppeteer = require('puppeteer');
const fs = require('fs');

async function getAmazonCookie(username, password) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    
    await page.goto('https://www.amazon.in/gp/sign-in.html', { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    console.log('Navigated to the Amazon login page');

    // email 
    await page.waitForSelector('input[name="email"]', { visible: true, timeout: 30000 });

    console.log('Found email input field');

    await page.$eval('input[name="email"]', input => input.value = '');

    //  username 
    
    await page.type('input[name="email"]', username, { delay: 100 });

    console.log('Typed username');

      // click 
      await Promise.all([
        page.click('input[type="submit"]', { delay: 100 }),
        page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 })
      ]);
  
      console.log('Clicked the continue button');

    // password
    await page.waitForSelector('input[name="password"]', { visible: true, timeout: 30000 });

    console.log('Found password input field');


    await page.$eval('input[name="password"]', input => input.value = '');

  
    await page.type('input[name="password"]', password, { delay: 100 });

    console.log('Typed password');

    // click 
    await Promise.all([
      page.click('input[type="submit"]', { delay: 100 }),
      page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 })
    ]);

    console.log('Clicked the Login button');

    // Check 
    const isLoggedIn = await page.evaluate(() => {
      return document.querySelector('.nav-line-1') !== null;
    });

    if (isLoggedIn) {
      console.log('Login successful!');

      // Get cookies 

      const cookies = await page.cookies();

      // Save 
      fs.writeFileSync('amazon_cookie.json', JSON.stringify(cookies, null, 2));

      console.log('Cookies saved');
    } else {
      console.log('Login failed.');
    }
  } catch (error) {
    console.error('Error:', error);
  } 
finally {
  
  await new Promise(resolve => setTimeout(resolve, 5000));

    await browser.close();
  }
}

module.exports = getAmazonCookie;