const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  console.log("Starting Chrome...");
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // FORCE PRESERVE DRAWING BUFFER FOR WEBGL TO ALLOW SCREENSHOTS
  await page.evaluateOnNewDocument(() => {
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(type, options, ...args) {
      if (type === 'webgl' || type === 'webgl2' || type === 'experimental-webgl') {
        options = options || {};
        options.preserveDrawingBuffer = true;
      }
      return originalGetContext.call(this, type, options, ...args);
    };
  });

  console.log("Navigating to openarm.dev...");
  await page.goto('https://openarm.dev/', { waitUntil: 'networkidle0', timeout: 60000 });

  console.log("Waiting for canvas...");
  await page.waitForSelector('.Exploded canvas', { timeout: 15000 });
  
  const sectionPos = await page.evaluate(() => {
    const el = document.querySelector('.Exploded');
    return el ? el.getBoundingClientRect().top + window.scrollY : 2000;
  });

  console.log("Scrolling to Exploded section at Y:", sectionPos);
  await page.evaluate((y) => window.scrollTo(0, y - 400), sectionPos);
  await new Promise(r => setTimeout(r, 4000)); // wait for 3D engine to render fully

  const frames = 60;
  const startY = sectionPos - 100;
  const scrollDistance = 1500; 

  for (let i = 0; i <= frames; i++) {
    const currentY = startY + (scrollDistance * (i / frames));
    await page.evaluate((y) => window.scrollTo(0, y), currentY);
    await new Promise(r => setTimeout(r, 150)); // let frame render

    const base64 = await page.evaluate(() => {
        const cvs = document.querySelector('.Exploded canvas');
        if(!cvs) return null;
        return cvs.toDataURL('image/webp', 0.85);
    });

    if (base64) {
      const base64Data = base64.replace(/^data:image\/webp;base64,/, "");
      const fileName = `../public/images/sequence/frame_${String(i).padStart(3, '0')}.webp`;
      fs.writeFileSync(fileName, base64Data, 'base64');
      if (i % 10 === 0) console.log(`Saved ${fileName}`);
    }
  }

  await browser.close();
  console.log("Done extracting!");
})();
