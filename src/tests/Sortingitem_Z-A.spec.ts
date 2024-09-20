const { chromium } = require('playwright');

(async () => {
  // Launch the browser
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to the Sauce Demo inventory page
  await page.goto('https://www.saucedemo.com/inventory.html');

  // Log in (if necessary, use appropriate credentials)
  await page.fill('#user-name', 'standard_user'); // Replace with your username
  await page.fill('#password', 'secret_sauce'); // Replace with your password
  await page.click('#login-button');

  // Wait for the inventory page to load
  await page.waitForSelector('.inventory_item');

  // Click on the sort dropdown and select "Name (Z to A)"
  await page.selectOption('.product_sort_container', 'za'); // This selects Z to A

  // Wait for items to be sorted
  await page.waitForTimeout(1000); // Optionally wait for a short time

  // Extract item names
  const items = await page.$$eval('.inventory_item_name', elements => 
    elements.map(el => el.textContent.trim())
  );

  // Check if the items are sorted from Z to A
  const isSortedZToA = items.every((item, index, arr) => 
    index === 0 || item.localeCompare(arr[index - 1]) <= 0
  );

  // Log the result
  if (isSortedZToA) {
    console.log('Items are sorted from Z to A.');
  } else {
    console.log('Items are NOT sorted from Z to A.');
  }

  // Close the browser
  await browser.close();
})();
