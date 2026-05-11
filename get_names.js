const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  
  // Wait for the Spline objects to load into the DOM
  await page.waitForFunction(() => {
      const el = document.getElementById('spline-debug');
      return el && el.innerText.trim().length > 10;
  }, { timeout: 15000 });

  const names = await page.$eval('#spline-debug', el => el.innerText);
  console.log("=== SPLINE OBJECT NAMES ===");
  console.log(names);
  
  await browser.close();
})();
