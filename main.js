const puppeteer = require('puppeteer');
require('dotenv').config();
(async () => {
  const browser = await puppeteer.launch({headless: true});
  
  const page = await browser.newPage();
  await page.goto(`https://ondeestameupedido.com.br/${process.env.trackcode}`);
  await page.waitForSelector('.tracking-content');
  //await page.screenshot({path: 'track.png'});
  let status = await page.evaluate(() =>{
    let step = document.querySelectorAll('.tracking-item');
    let stepArray = Array.from(step);
    return stepArray.map(now => now.textContent)
  });
  console.log(status);
  await browser.close();
})();