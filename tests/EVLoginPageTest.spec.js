// Importing Playwright test functions and assertion utilities
import { test, expect } from '@playwright/test';

test('Login Page', async ({ page }) => {
  // 1. Navigate to the login page
  await page.goto('https://admin.testing.evergreenseamless.com/');

  // 2. Retrieve and log the page title
  const pageTitle = await page.title();
  console.log('Page title is:', pageTitle);

  // 3. Assert that the page title is correct
  await expect(page).toHaveTitle('Evergreen - Login');

  // 4. Retrieve and log the current URL of the page
  const pageURL = page.url();
  console.log('Page URL is:', pageURL);

  // 5. Assert that the current URL is correct
  await expect(page).toHaveURL('https://admin.testing.evergreenseamless.com/');

  // 6. Interact with the login form
  // Click on the email field
  await page.locator('[name="email"]').click();

  // Fill in the email field
  await page.fill('[name="email"]', 'rohan+02@alchemytech.ca');

  // Enter the password
  await page.fill('[type="password"]', 'Gamer@23');

  // Click on the Login button to submit the form
  await page.locator('[type="submit"]').click();

  // 7. Log the current URL after login
  console.log('Current Page URL is:', page.url());

  // 8. Wait for the tabs to be fully loaded (wait for a specific element, e.g., tab list)
  await page.waitForSelector('[role="tablist"]'); // Ensure the tabs are rendered

  // 9. Locate the active tab using 'aria-selected="true"'
  const activeTab = await page.locator('[role="tablist"] [aria-selected="true"]');

  // 10. Retrieve the text of the active tab
  const activeTabText = await activeTab.innerText();

  // 11. Log the active tab's text
  console.log('Active Tab Text:', activeTabText);

  // 12. Assert that the active tab text matches the expected value ('TOTAL NO. OF ENQ. & SO')
  await expect(activeTabText).toBe('TOTAL NO. OF ENQ. & SO');

  // 13. Print confirmation message if the active tab matches the expected value
  if (activeTabText === 'TOTAL NO. OF ENQ. & SO') {
    console.log('Active Tab Text matches the expected value!');
  } else {
    console.log('Active Tab Text does not match the expected value.');
  }

  // 14. Close the browser page after completing the test
  await page.close();
  
});
