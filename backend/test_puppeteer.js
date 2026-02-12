
const puppeteer = require('puppeteer');

async function test() {
  console.log('Launching browser...');
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      timeout: 30000
    });
    console.log('Browser launched!');
    const page = await browser.newPage();
    await page.setContent('<h1>Test</h1>');
    console.log('Content set!');
    const pdf = await page.pdf({ format: 'A4' });
    console.log('PDF generated! Size:', pdf.length);
    await browser.close();
    console.log('Browser closed!');
  } catch (err) {
    console.error('ERROR:', err);
  }
}

test();
