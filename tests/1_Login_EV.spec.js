// Importing Playwright test functions and assertion utilities
import { test, expect } from '@playwright/test';

test('Active Tab Verification', async ({ page }) => {
  // 1. Navigate to the login page
  await page.goto('https://admin.testing.evergreenseamless.com/');

  // 2. Interact with the login form
  await page.locator('[name="email"]').click();
  await page.fill('[name="email"]', 'rohan+02@alchemytech.ca');
  await page.fill('[type="password"]', 'Gamer@23');
  await page.locator('[type="submit"]').click();

  // 3. Wait for the tabs to be fully loaded (wait for a specific element, e.g., tab list)
  await page.waitForSelector('[role="tablist"]'); // Ensure the tabs are rendered

  // 4. Locate the active tab using 'aria-selected="true"'
  const activeTab = await page.locator('[role="tablist"] [aria-selected="true"]');

  // 5. Retrieve the text of the active tab
  const activeTabText = await activeTab.innerText();

  // 6. Log the active tab's text
  console.log('Active Tab Text:', activeTabText);

  // 7. Assert that the active tab text matches the expected value ('TOTAL NO. OF ENQ. & SO')
  await expect(activeTabText).toBe('TOTAL NO. OF ENQ. & SO');

  // 8. Print confirmation message if the active tab matches the expected value
  if (activeTabText === 'TOTAL NO. OF ENQ. & SO') {
    console.log('Active Tab Text matches the expected value!');
  } else {
    console.log('Active Tab Text does not match the expected value.');
  }

  // 9. Close the browser page after completing the test
  await page.close();
});
