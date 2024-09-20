const { chromium } = require('playwright');

(async () => {
  // Launch the browser
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to the Sauce Demo inventory page
  await page.goto('https://www.saucedemo.com/inventory.html');

  // Log in with standard user credentials
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Wait for the inventory page to load
  await page.waitForSelector('.inventory_item');

  // Add multiple items to the cart (for example, first three items)
  const itemsToAdd = await page.$$('.inventory_item');
  for (let i = 0; i < 3; i++) {
    const addToCartButton = await itemsToAdd[i].$('button');
    await addToCartButton.click();
  }

  // Go to the cart
  await page.click('.shopping_cart_link');

  // Validate that the correct number of items is in the cart
  const cartItems = await page.$$('.cart_item');
  if (cartItems.length === 3) {
    console.log('Correct number of items in the cart.');
  } else {
    console.log(`Expected 3 items in the cart, but found ${cartItems.length}.`);
  }

  // Proceed to checkout
  await page.click('.checkout_button');

  // Fill out the checkout information
  await page.fill('#first-name', 'John');
  await page.fill('#last-name', 'Doe');
  await page.fill('#postal-code', '12345');
  await page.click('.submit-button');

  // Wait for the checkout overview page to load
  await page.waitForSelector('.checkout_summary_container');

  // Validate the items in the checkout overview
  const checkoutItems = await page.$$('.checkout_summary_item');
  if (checkoutItems.length === 3) {
    console.log('Correct number of items in the checkout overview.');
  } else {
    console.log(`Expected 3 items in the checkout overview, but found ${checkoutItems.length}.`);
  }

  // Finish the checkout process
  await page.click('.finish_button');

  // Wait for the confirmation page to load
  await page.waitForSelector('.complete-header');

  // Validate the order completion
  const completeHeader = await page.textContent('.complete-header');
  if (completeHeader.includes('THANK YOU FOR YOUR ORDER')) {
    console.log('Checkout journey completed successfully.');
  } else {
    console.log('Checkout journey failed.');
  }

  // Close the browser
  await browser.close();
})();
