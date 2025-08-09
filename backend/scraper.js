// scraping using playwright
const { chromium } = require('playwright');
// fs is Node.js's File System module, used here to save files like screenshots or error HTML.
const fs = require('fs');
const path = require('path');

async function scrape_meesho_prices(productName) {
    const userDataDir = path.join(__dirname, 'user-data'); // Browser profile folder jahan store hoga (user-data)

    const browser = await chromium.launchPersistentContext(userDataDir, {
        // opens a visible browser window to show its scraping process
        headless: false,
        slowMo: 200, // Mimic human speed
        args: [
            '--start-maximized',    // full screen mode
            '--disable-blink-features=AutomationControlled',    //helps avoid detection as a bot.
            '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
            // fakes the browser identity (looks like real user browser).
        ]
    });
// opens new tab in the browser
    const page = await browser.newPage();

    try {
        console.log('🔍 Navigating to Meesho search page...');
        await page.goto(`https://www.meesho.com/search?q=${encodeURIComponent(productName)}`, { // idhar se url se product name lega 
            waitUntil: 'domcontentloaded',
            timeout: 30000  // 30 seconds timeout for page load
        });
        console.log('✅ Search page loaded');

        // Optional: Wait for product grid to appear
        try {
            await page.waitForSelector('div[class*="ProductList"]', { timeout: 10000 });    // 10 seconds timeout for product grid
            console.log("📦 Product list detected.");
        } catch (e) {
            console.warn("⚠️ Product list not detected. Continuing anyway.");
        }

        // 💰 Extract prices
        console.log('💰 Extracting prices...');
        const prices = await page.$$eval('div, span', elements =>
            // scraped all div and span elements and filtered them to find prices
            elements.map(el => {
                const text = el.textContent || '';
                // Uses Regex to find prices like ₹299 or ₹ 2,499.
                const match = text.match(/₹\s?(\d[\d,]*)/);
                if (match) {
                    return parseInt(match[1].replace(/,/g, ''));
                }
                return 0;
            }).filter(price => price > 0)
        );

        await browser.close();
        // close the browser after scraping

        // of no prices found return error message
        if (!prices.length) {
            return { error: "No prices found" };
        }

        return {
            min: Math.min(...prices),
            max: Math.max(...prices),
            avg: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
            count: prices.length
        };

    } catch (error) {

//         If anything goes wrong:

// Logs the error.

// Takes a screenshot and saves current HTML to meesho_error.html for debugging.


        console.error('❌ Scraping failed:', error);
        try {
            await page.screenshot({ path: 'meesho_error.png' });
            const html = await page.content();
            fs.writeFileSync('meesho_error.html', html);
        } catch (_) {
            console.warn("Could not capture debug output.");
        }

        await browser.close();
        return {
            error: "Failed to scrape prices. Meesho may have blocked the request.",
            details: error.message
        };
    }
}

module.exports = { scrape_meesho_prices };
