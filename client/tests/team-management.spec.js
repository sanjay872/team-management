import { test, expect } from '@playwright/test';

test('Add then Delete Member flow', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Ensure page loaded
  await expect(page.getByText('Your Team')).toBeVisible();

  // -----------------
  // ADD MEMBER
  // -----------------

  await page.getByRole('button', { name: 'Add Member' }).click();

  await page.getByLabel('Name').fill('SequentialUser');
  await page.getByLabel('Email Address').fill('sequential@example.com');

  // Function dropdown
  await page.locator('label:has-text("Function") + button').click();
  await page.getByRole('button', { name: 'Engineering' }).click();

  // Role dropdown
  await page.locator('label:has-text("Role") + button').click();
  await page.getByRole('button', { name: 'Admin' }).click();

  await page.getByRole('button', { name: 'Add to Team' }).click();

  // Verify row appears
  const row = page.locator('tr', { hasText: 'SequentialUser' });
  await expect(row).toBeVisible();

  // -----------------
  // DELETE MEMBER
  // -----------------

  // Open row dropdown using your data-testid
  await row.getByTestId(/member-actions-/).click({ force: true });

  // Click Delete in dropdown (first Delete)
  await page.getByRole('button', { name: 'Delete' }).first().click();

  // Wait for delete modal
  await expect(page.getByText('Delete Member?')).toBeVisible();

  // Click confirm Delete (second Delete button)
  await page.getByRole('button', { name: 'Delete' }).nth(1).click();

  // Verify row removed from DOM
  await expect(
    page.locator('tr', { hasText: 'SequentialUser' })
  ).toHaveCount(0);
});