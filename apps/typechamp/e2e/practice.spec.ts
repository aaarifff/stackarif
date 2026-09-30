import { expect, test } from '@playwright/test';

test('rotates passages and keeps reading controls across reloads', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Content category').selectOption('history');
  const first = await page.getByTestId('words').innerText();
  await page.getByRole('button', { name: 'Restart test', exact: true }).click();
  await expect(page.getByTestId('words')).not.toHaveText(first);
  await page.getByLabel('Font size').press('End');
  for (let i = 0; i < 8; i++) await page.getByLabel('Font size').press('ArrowLeft');
  await page.getByLabel('Typing-box height').press('End');
  for (let i = 0; i < 10; i++) await page.getByLabel('Typing-box height').press('ArrowLeft');
  await expect(page.getByTestId('words')).toHaveCSS('font-size', '32px');
  await expect(page.getByTestId('words')).toHaveCSS('height', '400px');
  await page.reload();
  await expect(page.getByLabel('Font size')).toHaveValue('32');
  await expect(page.getByLabel('Typing-box height')).toHaveValue('400');
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('completes custom text, retries corrected mistakes, and saves each result once', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Practice your own text', { exact: true }).click();
  await page.getByLabel('Your passage').fill('cat dog');
  await page.getByRole('button', { name: 'Practice this text' }).click();
  const input = page.getByLabel('Typing input', { exact: true });
  await expect(page.getByTestId('progress')).toHaveText('0/2');
  await input.pressSequentially('x');
  await input.press('Backspace');
  await input.pressSequentially('cat dog', { delay: 30 });
  await expect(page.getByTestId('result-accuracy')).not.toHaveText('100.0%');
  await expect(page.locator('.mistake-words')).toHaveText('cat');
  await expect(page.locator('.history-table tbody tr')).toHaveCount(1);
  await page.getByRole('button', { name: 'Practice these words' }).click();
  await expect(page.getByTestId('progress')).toHaveText('0/1');
  await input.pressSequentially('cat', { delay: 30 });
  await expect(page.getByTestId('result-accuracy')).toHaveText('100.0%');
  await expect(page.locator('.history-table tbody tr')).toHaveCount(2);
  await page.reload();
  await expect(page.locator('.history-table tbody tr')).toHaveCount(2);
});

test('compares matching category results and does not save abandoned tests', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'words', exact: true }).click();
  await page.getByRole('button', { name: '10 words', exact: true }).click();
  const input = page.getByLabel('Typing input', { exact: true });
  await input.pressSequentially('x');
  await input.press('Escape');
  await expect(page.getByText('Finish a test to start your history.')).toBeVisible();
  for (let i = 0; i < 2; i++) {
    const words = await page.locator('[data-target]').evaluateAll(nodes => nodes.map(n => n.getAttribute('data-target')).join(' '));
    await input.pressSequentially(words, { delay: 2 });
    await expect(page.getByTestId('result-accuracy')).toHaveText('100.0%');
    if (i === 0) await page.getByRole('button', { name: 'Next test' }).click();
  }
  await expect(page.locator('.history-table tbody tr')).toHaveCount(2);
  await expect(page.getByText(/vs. your previous test with the same settings/)).toBeVisible();
});
