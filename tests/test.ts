import { expect, test } from '@playwright/test';

test('Test number param', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('button', { name: 'Increment id' }).click();
  await expect(page).toHaveURL('http://localhost:4200/?num=2');
  await expect(await page.getByTestId('id').textContent()).toEqual('2');
  await page.getByRole('button', { name: 'Increment id' }).click();
  await expect(page).toHaveURL('http://localhost:4200/?num=3');
  await expect(await page.getByTestId('id').textContent()).toEqual('3');
});

test('Test nullable fields with default value', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('button', { name: 'Increment nullable id' }).click();
  await expect(page).toHaveURL('http://localhost:4200/?nullableId=2');
  await expect(await page.getByTestId('nullableId').textContent()).toEqual('2'); // Default is 1
  await page.getByRole('button', { name: 'Nullify nullableId' }).click();
  await expect(page).toHaveURL('http://localhost:4200/?nullableId=null');
  await expect(await page.getByTestId('nullableId').textContent()).toEqual(
    'null'
  );
});

test('Test string param', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('textbox').fill('John');
  await expect(page).toHaveURL('http://localhost:4200/?name=John');
  await expect(await page.getByTestId('name').textContent()).toEqual('John');
});
