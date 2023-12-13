const puppeteer = require('puppeteer');
const fs = require('fs');

async function getOrderDetailsWithCookie() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // Read cookies 
    const amazonCookies = JSON.parse(fs.readFileSync('amazon_cookie.json'));


    await page.setCookie(...amazonCookies);

   
    await page.goto('https://www.amazon.in/gp/css/order-history', { waitUntil: 'domcontentloaded', timeout: 30000 });

  
    await getOrderDetails(page);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await new Promise(resolve => setTimeout(resolve, 5000));
    await browser.close();
  }
}

async function getOrderDetails(page) {
  try {

    const yourOrdersLinkSelector = '#nav-orders';
    await Promise.all([
      page.click(yourOrdersLinkSelector),
      page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 30000 })
    ]);

    console.log('Navigated to Your Orders page.');

  
    const orderElements = await page.$$('.order');

    if (orderElements.length > 0) {
      const ordersArray = [];

      for (const orderElement of orderElements) {
        const orderDetails = {
          orderNumber: await orderElement.$eval('.order-number', el => el.innerText),
          orderDate: await orderElement.$eval('.order-date', el => el.innerText),

        };

        ordersArray.push(orderDetails);
      }

      //  file
      fs.writeFileSync('orders.json', JSON.stringify(ordersArray, null, 2));

      console.log('Order details saved to orders.json');
    } else {
      console.log('No order details found.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

getOrderDetailsWithCookie();
