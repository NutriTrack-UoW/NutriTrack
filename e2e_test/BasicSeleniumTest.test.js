const { Builder, By, Key, until, Browser} = require("selenium-webdriver");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const chrome = require("selenium-webdriver/chrome");

let driver;
describe("Selenium Tests", () => {
    beforeAll(async () => {
        try {
            console.log("Initializing WebDriver...");
            const chromeDriverPath = path.resolve(process.env.SELENIUM_CHROMEDRIVER_PATH); // Update this path to your ChromeDriver location
            const myService = new chrome.ServiceBuilder(chromeDriverPath);

            driver = await new Builder().forBrowser("chrome").setChromeService(myService).build();
            console.log("WebDriver initialized successfully.");
        } catch (error) {
            console.error("Error initializing WebDriver:", error);
            throw error; // Rethrow the error to fail the test setup
        }
    });

    afterAll(async () => {
        await driver.quit();
    });

    test("User can log in and see the home page", async () => {
        // Navigate to the login page
        
        await driver.get(process.env.FRONTEND_BASE_URL);

        await driver.sleep(500);
        // Click the login button
        let loginButton = await driver.findElement(By.xpath("//*[text()='SIGN IN']"));
        await loginButton.click();        
        await driver.sleep(500);

        // Wait for the SignInDialog form to appear
        const signInForm = await driver.wait(
            until.elementLocated(By.css('[data-testid="signInForm"]')), // Locate the form using data-testid
            5000
        );        

        // Locate the email input field and enter a test email
        const emailInput = await driver.findElement(By.css('input[aria-label="Email address"]'));
        await emailInput.sendKeys('taylor@gmail.com');

        // Locate the password input field and enter a test password
        const passwordInput = await driver.findElement(By.css('input[aria-label="Password"]'));
        await passwordInput.sendKeys('taylor');
        await driver.sleep(500);

        // Locate and click the sign-in button
        const signInButton = await driver.findElement(By.id('signInButton'));
        await signInButton.click();

        const homePage = await driver.wait(
            until.elementLocated(By.xpath("//*[contains(text(), 'Dashboard')]")),
            10000 // Wait up to 10s
        );
        await driver.sleep(500);

        // Assert that the form is displayed
        expect(await homePage.isDisplayed()).toBe(true);
    });

    test("User can navigate to the Track page", async () => {
        const trackButton = await driver.findElement(By.xpath("//a[@href='/track']"));
        await trackButton.click();
        const searchInput = await driver.wait(
            until.elementLocated(By.xpath("//input[contains(@placeholder, 'Search Food Item')]")),
            5000
        );
        expect(await searchInput.isDisplayed()).toBe(true);
    });

    test("User can navigate to the Meals Consumed page", async () => {
        const mealsConsumedButton = await driver.findElement(By.xpath("//a[@href='/mealsConsumed']"));
        await mealsConsumedButton.click();
        await driver.wait(until.urlContains("mealsConsumed"), 5000);
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toBe(process.env.FRONTEND_BASE_URL + "/mealsConsumed");
    });

    test("User can navigate to the Custom Food page", async () => {
        const customButton = await driver.findElement(By.xpath("//a[@href='/customFood']"));
        await customButton.click();
        const customPage = await driver.wait(
            until.elementLocated(By.xpath("//*[contains(text(), 'Create Your Own Meal')]")),
            10000
        );
        expect(await customPage.isDisplayed()).toBe(true);
    });

    test("User can navigate to the Daily Dashboard page", async () => {
        const dailyDashButton = await driver.findElement(By.xpath("//a[@href='/dailydashboard']"));
        await dailyDashButton.click();
        const dailyDashPage = await driver.wait(
            until.elementLocated(By.xpath("//*[contains(text(), 'Nutrient Intake')]")),
            10000
        );
        expect(await dailyDashPage.isDisplayed()).toBe(true);
    });

    test("User can navigate to the Historical page", async () => {
        const historicalButton = await driver.findElement(By.xpath("//a[@href='/historical']"));
        await historicalButton.click();
        const historicalPage = await driver.wait(
            until.elementLocated(By.xpath("//*[contains(text(), 'Historical Nutrient Intake')]")),
            10000
        );
        expect(await historicalPage.isDisplayed()).toBe(true);
    });
});