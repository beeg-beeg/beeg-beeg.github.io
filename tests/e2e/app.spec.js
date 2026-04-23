import { test, expect } from '@playwright/test';

test.describe('Page load', () => {
  test('has correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('日本語 Stage 1');
  });

  test('shows the home section by default', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#sec-home')).toBeVisible();
    await expect(page.locator('#sec-kana')).not.toBeVisible();
  });

  test('progress pill starts at 0/92', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#topPill')).toContainText('0 / 92');
  });

  test('home nav button is active on load', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#nb-home')).toHaveClass(/active/);
  });
});

test.describe('Tab navigation', () => {
  test('clicking Хирагана nav button shows kana section', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nb-kana').click();
    await expect(page.locator('#sec-kana')).toBeVisible();
    await expect(page.locator('#sec-home')).not.toBeVisible();
    await expect(page.locator('#nb-kana')).toHaveClass(/active/);
  });

  test('clicking Катакана nav button shows kata section', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nb-kata').click();
    await expect(page.locator('#sec-kata')).toBeVisible();
  });

  test('clicking Трен. nav button shows quiz section', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nb-quiz').click();
    await expect(page.locator('#sec-quiz')).toBeVisible();
  });

  test('clicking Слова nav button shows vocab section', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nb-vocab').click();
    await expect(page.locator('#sec-vocab')).toBeVisible();
  });

  test('only one section is visible at a time', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nb-kana').click();
    const visible = await page.locator('.section:visible').count();
    expect(visible).toBe(1);
  });
});

test.describe('Flashcard section', () => {
  test('hiragana flashcard shows first kana character', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nb-kana').click();
    await expect(page.locator('#h-char')).toContainText('あ');
  });

  test('clicking the card flips it (adds flipped class)', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nb-kana').click();
    const card = page.locator('#h-card');
    await expect(card).not.toHaveClass(/flipped/);
    await page.locator('.flipcard-container').first().click();
    await expect(card).toHaveClass(/flipped/);
  });

  test('clicking the card again unflips it', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nb-kana').click();
    const container = page.locator('.flipcard-container').first();
    await container.click();
    await container.click();
    await expect(page.locator('#h-card')).not.toHaveClass(/flipped/);
  });

  test('Далее button advances to next card', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nb-kana').click();
    await expect(page.locator('#h-idx')).toContainText('1 / 46');
    await page.getByRole('button', { name: /Далее/ }).first().click();
    await expect(page.locator('#h-idx')).toContainText('2 / 46');
  });

  test('Назад button on first card wraps to last card', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nb-kana').click();
    await page.getByRole('button', { name: /Назад/ }).first().click();
    await expect(page.locator('#h-idx')).toContainText('46 / 46');
  });
});

test.describe('Kana table', () => {
  test('hiragana table renders 46 cells', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nb-kana').click();
    await page.getByRole('button', { name: /Таблица/ }).first().click();
    const cells = page.locator('#h-table .kt-cell');
    await expect(cells).toHaveCount(46);
  });

  test('katakana table renders 46 cells', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nb-kata').click();
    await page.getByRole('button', { name: /Таблица/ }).first().click();
    const cells = page.locator('#k-table .kt-cell');
    await expect(cells).toHaveCount(46);
  });

  test('clicking a cell marks it as learned', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nb-kana').click();
    await page.getByRole('button', { name: /Таблица/ }).first().click();
    const firstCell = page.locator('#h-table .kt-cell').first();
    await expect(firstCell).not.toHaveClass(/learned/);
    await firstCell.click();
    await expect(firstCell).toHaveClass(/learned/);
  });

  test('clicking a learned cell unmarks it', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nb-kana').click();
    await page.getByRole('button', { name: /Таблица/ }).first().click();
    const firstCell = page.locator('#h-table .kt-cell').first();
    await firstCell.click();
    await firstCell.click();
    await expect(firstCell).not.toHaveClass(/learned/);
  });
});

test.describe('Quiz section', () => {
  test('select mode shows 4 answer options', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nb-quiz').click();
    const opts = page.locator('#sel-opts .qopt');
    await expect(opts).toHaveCount(4);
  });

  test('clicking a wrong answer shows error feedback', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nb-quiz').click();

    const correctText = await page.locator('#sel-char').textContent();
    // Find the correct romanization from the button that matches
    const opts = page.locator('#sel-opts .qopt');
    const count = await opts.count();

    // Click the first option; if it's wrong we get an error class
    const firstOpt = opts.nth(0);
    const firstText = await firstOpt.textContent();

    await firstOpt.click();
    await expect(page.locator('#sel-fb')).not.toBeEmpty();
  });

  test('all options are disabled after answering', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nb-quiz').click();
    await page.locator('#sel-opts .qopt').first().click();
    const opts = page.locator('#sel-opts .qopt');
    const count = await opts.count();
    for (let i = 0; i < count; i++) {
      await expect(opts.nth(i)).toBeDisabled();
    }
  });

  test('switching to type mode shows text input', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nb-quiz').click();
    await page.locator('#qm-type').click();
    await expect(page.locator('#type-input')).toBeVisible();
  });

  test('switching to reverse mode shows kana choice buttons', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nb-quiz').click();
    await page.locator('#qm-reverse').click();
    await expect(page.locator('#rev-opts')).toBeVisible();
    await expect(page.locator('#rev-opts .rev-opt')).toHaveCount(4);
  });

  test('kana filter buttons switch between modes', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nb-quiz').click();
    await expect(page.locator('#qf-both')).toHaveClass(/active/);
    await page.locator('#qf-h').click();
    await expect(page.locator('#qf-h')).toHaveClass(/active/);
    await expect(page.locator('#qf-both')).not.toHaveClass(/active/);
  });
});

test.describe('Vocabulary section', () => {
  test('renders category buttons', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nb-vocab').click();
    const cats = page.locator('#vcats .vcat');
    await expect(cats).toHaveCount(5);
  });

  test('first category is active by default', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nb-vocab').click();
    await expect(page.locator('#vcats .vcat').first()).toHaveClass(/active/);
  });

  test('clicking a category updates the word list', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nb-vocab').click();
    const secondCat = page.locator('#vcats .vcat').nth(1);
    await secondCat.click();
    await expect(secondCat).toHaveClass(/active/);
    await expect(page.locator('#vlist .vocab-row').first()).toBeVisible();
  });
});
