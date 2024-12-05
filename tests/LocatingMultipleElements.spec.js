import { test, expect } from '@playwright/test';
import { login } from '../utils/Login';

// Helper function to extract and log unique link texts
async function logUniqueLinks(page, counter, label, linkTexts) {
  console.log(label);
  const pageLinks = await page.$$('a'); // Selecting all anchor tags

  for (const link of pageLinks) {
    const linkText = await link.textContent();
    if (!linkTexts.has(linkText)) {
      linkTexts.add(linkText);
      console.log(`${counter}. ${linkText}`);
      counter++;
    }
  }
}

test('LoginMultipleElements', async ({ page }) => {
  // 1. Navigate to the app page and log in
  await page.goto('https://admin.testing.evergreenseamless.com/app');
  await login(page);

  // 2. Wait for the tabs to be fully loaded
  await page.waitForSelector('[role="tablist"]'); // Ensure the tabs are rendered

  // 3. Locate the active tab using 'aria-selected="true"'
  const activeTab = await page.locator('[role="tablist"] [aria-selected="true"]');

  // 4. Retrieve the text of the active tab
  const activeTabText = await activeTab.innerText();
  console.log('Active Tab Text:', activeTabText);

  // 5. Initialize Set to store unique link texts
  const linkTexts = new Set();
  let counter = 1;

  // Log links on the main page
  await logUniqueLinks(page, counter, 'Page Names:', linkTexts);

    // Click on the buttons to expand the page and load new content
   await page.getByRole('button', { name: 'Expand [' }).click();

  // Click on buttons and log links for each section
  const buttons = [
    { name: 'Master', label: 'MasterPage Names:' },
    { name: 'User Settings', label: 'User Settings Page Names:' },
    { name: 'Customer Settings', label: 'Customer Settings Page Names:' },
    { name: 'SUpplier Settings', label: 'Supplier Settings Page Names:' },
    { name: 'Material Info', label: 'Material Info Page Names:' },
    { name: 'Inspection', label: 'Inspection Page Names:' },
    { name: 'Tax', label: 'Tax Page Names:' }
  ];

  for (const { name, label } of buttons) {
    await page.getByRole('button', { name }).click();
    await logUniqueLinks(page, counter, label, linkTexts);
  }
});
