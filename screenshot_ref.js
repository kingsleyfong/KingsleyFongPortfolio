const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('https://adambenaissa.com/', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'C:\\Users\\Kingsley\\.gemini\\antigravity\\brain\\37a35ccc-c1e5-43f7-8a7a-f6e37a247fd2\\adam_ref.png', fullPage: true });
  await browser.close();
  console.log("Screenshot saved.");
})();
