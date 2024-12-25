// @ts-check
import { test, expect } from "@playwright/test";
import { btn, enter, esc, sTab, tab } from "./utils";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/examples/hanav");
});

test.describe("keyboard navigation", () => {
  test("should focus first element in menu on Enter and focus trigger on Escape", async ({ page }) => {
    const hanavBtn = btn(page, "Hanav");
    const hMenuFirst = page.locator("#n-first");

    await hanavBtn.focus();
    await enter(page);
    await expect(hMenuFirst).toBeFocused();
    await esc(page);
    await expect(hanavBtn).toBeFocused();
  });

  test("should loop focus within menu using Tab and Shift-Tab", async ({ page }) => {

    // webkit 中不能聚焦预期元素
    test.skip(page.context().browser()?.browserType().name() === 'webkit', 'This test is skipped in WebKit');
    const hanavBtn = btn(page, "Hanav");
    const hMenuFirst = page.locator("#n-first");
    const hMenuLast = page.locator("#n-last");

    await hanavBtn.focus();
    await page.keyboard.press("Enter"); // 展开面板，首元素聚焦

    await page.waitForTimeout(450); // 等待动画结束
    await tab(page);
    await tab(page);
    await tab(page);
    expect(hMenuLast).toBeFocused();

    await tab(page);
    await page.waitForTimeout(30); // 等一会儿，否则 firefox 不能聚焦预期元素
    expect(hMenuFirst).toBeFocused();

    await sTab(page);
    expect(hMenuLast).toBeFocused();
  });

});

test.describe("mouse navigation", () => {
  test("should open and close menu", async ({ page }) => {

    const hanavBtn = btn(page, "Hanav");
    const hanavMenu = page.getByText("请握紧导航栏，不要因为走得太远，就忘了当初为什么出发。");

    await expect(hanavMenu).toHaveCount(0);

    await hanavBtn.hover(); // 移入鼠标
    await expect(hanavMenu).toHaveCount(1);
    await expect(hanavMenu).toBeVisible();

    await page.mouse.move(0, 0); // 移出鼠标
    await expect(hanavMenu).toHaveCount(0);
    await expect(hanavMenu).toBeHidden();
  });

  test("should switch menu", async ({ page }) => {
    const hanavBtn = btn(page, "Hanav");
    const ffBtn = btn(page, "Focus-Fly");
    const mContainer = page.locator("#menu_container");
    const children = mContainer.locator(':scope > *'); // 获取第一级子元素
    const ffMenu = children.nth(2);

    await hanavBtn.hover();
    await expect(mContainer).toBeVisible();

    var ffMenuBox = await ffMenu.boundingBox();

    await ffBtn.hover();
    await page.waitForTimeout(350); // 等待动画 350 毫秒
    var ffMenuBox2 = await ffMenu.boundingBox();
    expect(ffMenuBox?.x !== ffMenuBox2?.x && (ffMenuBox?.x || 0) > (ffMenuBox2?.x || 0)).toBeTruthy();
  });
});
