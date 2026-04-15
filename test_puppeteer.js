const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  page.on('request', request => {
    const url = request.url();
    if (url.includes('.webp') || url.includes('.png') || url.includes('.jpg')) {
      if (url.includes('sequence') || url.includes('explode') || url.match(/\d{3,4}\.webp/)) {
        console.log("IMG:", url);
      }
    }
  });
  await page.goto('https://openarm.dev', { waitUntil: 'networkidle0' });
  await browser.close();
})();
