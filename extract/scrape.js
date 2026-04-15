const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  console.log("Starting Chrome...");
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log("Navigating to openarm.dev...");
  await page.goto('https://openarm.dev/', { waitUntil: 'networkidle0', timeout: 60000 });

  console.log("Waiting for canvas...");
  // Wait for the PIXI/Three canvas to load
  await page.waitForSelector('canvas', { timeout: 15000 });
  
  // Find the exact canvas in the Exploded section
  // Sometimes it's the first canvas, sometimes specific. Let's get the canvas container.
  const sectionPos = await page.evaluate(() => {
    const el = document.querySelector('.Exploded');
    return el ? el.getBoundingClientRect().top + window.scrollY : 2000;
  });

  console.log("Scrolling to Exploded section at Y:", sectionPos);
  // Scroll right above it
  await page.evaluate((y) => window.scrollTo(0, y - 500), sectionPos);
  await new Promise(r => setTimeout(r, 2000)); // wait for 3D engine to render

  const frames = 60;
  const startY = sectionPos - 300;
  // The explosion usually happens over a scroll distance of maybe 1000 pixels.
  const scrollDistance = 1500; 

  if (!fs.existsSync('../public/images/sequence')) fs.mkdirSync('../public/images/sequence', { recursive: true });

  for (let i = 0; i <= frames; i++) {
    const currentY = startY + (scrollDistance * (i / frames));
    await page.evaluate((y) => window.scrollTo(0, y), currentY);
    await new Promise(r => setTimeout(r, 100)); // wait for GSAP to tick

    // find the canvas and take a screenshot of just the robot
    // The robot canvas might be the only canvas, or a specific one
    const base64 = await page.evaluate(() => {
        const cvs = document.querySelector('.Exploded canvas') || document.querySelector('canvas');
        if(!cvs) return null;
        return cvs.toDataURL('image/webp', 0.8);
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
