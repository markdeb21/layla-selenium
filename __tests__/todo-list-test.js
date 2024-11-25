// tests/todo-list.test.js
const { Builder, By } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');

const screenshotDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir);
}

describe('Todo List Tests', function() {
  let driver;

  beforeAll(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async function() {
    await driver.quit();
  });

  async function takeScreenshot(name) {
    const screenshot = await driver.takeScreenshot();
    const filename = path.join(screenshotDir, `${name}.png`);
    fs.writeFileSync(filename, screenshot, 'base64');
  }

  it('should add a new task', async function() {
    await driver.get('http://localhost:3000');
    await driver.findElement(By.css('[data-testid="new-task-input"]')).sendKeys('New Task');
    await driver.findElement(By.css('[data-testid="add-task-button"]')).click();
    const task = await driver.findElement(By.css('[data-testid="task-0"]'));
    expect(await task.getText()).toBe('New Task');
    await takeScreenshot('add-task');
  });

  it('should remove a task', async function() {
    await driver.get('http://localhost:3000');
    await driver.findElement(By.css('[data-testid="new-task-input"]')).sendKeys('Task to Remove');
    await driver.findElement(By.css('[data-testid="add-task-button"]')).click();
    await driver.findElement(By.css('[data-testid="remove-task-0"]')).click();
    const tasks = await driver.findElements(By.css('[data-testid^="task-"]'));
    expect(tasks.length).toBe(0);
    await takeScreenshot('remove-task');
  });
});