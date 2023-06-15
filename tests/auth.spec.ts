import { test, expect } from '@playwright/test';

const email = "john@nike.com"
const password = "michaeljordanmadenike"

test('Happy Flow', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  await expect(page).toHaveTitle(/Cosmos Wallet App/)

  // opens with sign in tab active
  await expect(page.getByTestId('tab-btn-signin')).toHaveClass('tab active');

  // try to sign in without previous user - should not work
  await page.pause()

  await page.getByTestId('signin-email-input').fill(email)
  await page.getByTestId('signin-password-input').fill(password)
  await page.getByTestId('signin-submit-btn').click()

  // show error message (first time no user)
  await expect(page.locator('.toaster-error-class')).toContainText('User not found')


  // create wallet / account
  await page.getByTestId('tab-btn-create').click()


  // shows mnemonic

  // should now show logged in page


  // reload page still show logged in page


  // logout

  // check local storage is cleared

  // not show logged in page

  // try to sign in

  // should now work

  // got to recover - should show mnemonic after user /password




});


