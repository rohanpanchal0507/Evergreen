// utils/login.js
export const login = async (page) => {
    // Interact with the login form
    await page.locator('[name="email"]').click();
    await page.fill('[name="email"]', 'rohan+02@alchemytech.ca');
    await page.fill('[type="password"]', 'Gamer@23');
    await page.locator('[type="submit"]').click();
  };
  