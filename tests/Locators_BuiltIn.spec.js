/*
page.getByAltText() - to locate an element, usually image, by its text alternative.
page.getByPlaceholder() - to locate an input by placeholder.
page.getByRole() to locate by explicit and implicit accessibility attributes.
page.getByText() to locate by text content.

page.getByLabel() to locate a form control by associated label's text.
page.getByTitle() to locate an element by its title attribute.
page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).
*/

const { test, expect } = require('@playwright/test');
import { login } from '../utils/Login';

test('Built-Locators', async({ page }) => {
  
  // 1. Navigate to the app page
  await page.goto('https://admin.testing.evergreenseamless.com/app');

  // 2. Perform login action
  await login(page);
  
  // page.getByAltText() - to locate an element, usually image, by its text alternative.
  // 3. Verify that Evergreen User Logo appears
  const logo = await page.getByAltText('Alchemy')
  await expect(logo).toBeVisible()

  // page.getByPlaceholder() - to locate an input by placeholder.
  await page.getByPlaceholder('').fill("")

  // page.getByRole() to locate by explicit and implicit accessibility attributes.
  await page.getByRole('button', {class: 'MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeLarge MuiButton-containedSizeLarge MuiButton-colorPrimary MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeLarge MuiButton-containedSizeLarge MuiButton-colorPrimary t-button-455 css-144uzm3-MuiButtonBase-root-MuiButton-root'}).click

  // page.getByText() to locate by text content.
  const name = await page.locator('//button[normalize-space()="Total No. of Enq. & SO"]').textContent()
  await expect(await page.getByText(name)).toBeVisible()

  // page.getByLabel() to locate a form control by associated label's text.
  await page.getByLabel('Email').fill('rohan+02@alchemytech.ca');

  // page.getByTitle() to locate an element by its title attribute.
  await expect(page.getByTitle('Issues count')).toHaveText('Dashboard');

  // page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).
  await page.getByTestId('directions').click();

});





