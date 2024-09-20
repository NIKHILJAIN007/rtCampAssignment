const { chromium } = require('playwright');

(async () => {
  // Launch the browser
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to the Sauce Demo inventory page
  await page.goto('https://www.saucedemo.com/inventory.html');

  // Log in (using standard user credentials)
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Wait for the inventory page to load
  await page.waitForSelector('.inventory_item');

  // Click on the sort dropdown and select "Price (high to low)"
  await page.selectOption('.product_sort_container', 'hilo'); // This selects high to low

  // Wait for items to be sorted
  await page.waitForTimeout(1000); // Optionally wait for a short time

  // Extract item prices
  const prices = await page.$$eval('.inventory_item_price', elements => 
    elements.map(el => parseFloat(el.textContent.replace('$', '').trim()))
  );

  // Check if the prices are sorted from high to low
  const isSortedHighToLow = prices.every((price, index, arr) => 
    index === 0 || price <= arr[index - 1]
  );

  // Log the result
  if (isSortedHighToLow) {
    console.log('Prices are sorted from high to low.');
  } else {
    console.log('Prices are NOT sorted from high to low.');
  }

  // Close the browser
  await browser.close();
})();
