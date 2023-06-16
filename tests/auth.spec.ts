import { test, expect } from '@playwright/test';

const email = "john@nike.com"
const password = "michaeljordanmadenike"

test('Optimistic Flow', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  await expect(page).toHaveTitle(/Cosmos Wallet App/)

  // opens with sign in tab active
  await expect(page.getByTestId('tab-btn-signin')).toHaveClass('tab active');

  // try to sign in without previous user - should not work
  await page.getByTestId('signin-email-input').fill(email)
  await page.getByTestId('signin-password-input').fill(password)
  await page.getByTestId('signin-submit-btn').click()

  // show error message (first time no user)
  await expect(page.locator('.toaster-error-class')).toContainText('User does not exist or password is incorrect')


  // create wallet / account
  await page.getByTestId('tab-btn-create').click()
  await expect(page.getByTestId('tab-btn-create')).toHaveClass('tab active');

  await page.getByTestId('create-email-input').fill(email)
  await page.getByTestId('create-password-input').fill(password)
  await page.getByTestId('create-submit-btn').click()

  await expect(page.locator('.toaster-success-class')).toContainText('Account Created Successfully')

  // should now show logged-in page
  await expect(page.getByTestId('user-greeting')).toContainText(email)

  // click to shows mnemonic
  await page.getByTestId('user-toggle-mnemonic-btn').click()
  await expect(page.getByTestId('user-mnemonic')).not.toBeEmpty()
  const mnemonic = await (page.getByTestId('user-mnemonic').textContent())

  // logout
  await page.getByTestId('user-logout-btn').click()

  await expect(page.getByTestId('tab-btn-signin')).toHaveClass('tab active');


  // sign in again should work and show correct mnemonic
  await page.getByTestId('signin-email-input').fill(email)
  await page.getByTestId('signin-password-input').fill(password)
  await page.getByTestId('signin-submit-btn').click()


  await page.getByTestId('user-toggle-mnemonic-btn').click()

  await expect(await page.getByTestId('user-mnemonic').textContent()).toEqual(mnemonic)


  // test persistence of local storage by reloading page
  await page.goto('http://localhost:3000/')
  // sign in again should work and show correct mnemonic
  await page.getByTestId('signin-email-input').fill(email)
  await page.getByTestId('signin-password-input').fill(password)
  await page.getByTestId('signin-submit-btn').click()


  await page.getByTestId('user-toggle-mnemonic-btn').click()

  await expect(await page.getByTestId('user-mnemonic').textContent()).toEqual(mnemonic)
});


