const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  
  await page.goto('http://localhost:3000');
  
  await page.waitForFunction('window.splineApp !== undefined', { timeout: 15000 });

  const result = await page.$eval('#spline-debug', el => el.innerText);
  
  console.log("=== SPLINE OBJECTS ===");
  console.log(result);
  
  await browser.close();
})();
