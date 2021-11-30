import launcher from "k6/x/browser";
import { sleep, group } from 'k6';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

const csvData = new SharedArray('Admins for the test', function () {
    // Load CSV file and parse it using Papa Parse
    return papaparse.parse(open('./admins.csv'), { header: false }).data;
  });

export default function() {

    // Browser setup
    const browser = launcher.launch('chromium', {
        headless: false,
        slowMo: '500ms' // slow down by 500ms
    });
    var context = browser.newContext();
    var page = context.newPage();

    // Random first and last names for user creation
    const randomFirstName = randomString(10);
    const randomLastName = randomString(10);

    group("Open login page and authenticate", () => {

    // Pick a random username/password pair
    const randomUser = csvData[Math.floor(Math.random() * csvData.length)];
    console.log('Random user: ', JSON.stringify(randomUser));

    // Goto front page, find login link and click it
    page.goto('https://app.test.alwaysreach.net/authentication/login?response_type=token&client_id=14e4009f-f761-4d44-9ee3-5caacada6dc6.vela.care&redirect_uri=https://app.test.alwaysreach.net/admin', { waitUntil: 'networkidle' });
    
    // Wait for next page to load
    page.waitForLoadState('networkidle');

    page.$('[class="checkmark"]').click();

    page.focus('input[name="username"]');
    page.keyboard.insertText(randomUser);

    // XK6 currently has a bug which cannot type Capital letters or special characters
    // page.$('input[name="username"]').type(randomUser);

    //A workaround until the bug is fixed
    page.focus('input[name="password"]');
    page.keyboard.insertText('Testing1!');

    // XK6 currently has a bug which cannot type Capital letters or special characters
    // page.$('input[name="password"]').type('Testing1!');

    page.$('button[type="submit"]').click();

    page.waitForLoadState('networkidle');

    page.waitForTimeout(5000);
    });

    group("Open 'User' page and select to add a new user", () => {
    
    // Click on the 'Users' link
    var element = page.$('[id="user-link"]');
    element.click();

    console.log("Users link was clicked");

    // Wait for next page to load
    page.waitForLoadState('networkidle');
    page.waitForTimeout(5000);

    // Click 'Add User' button
    page.$('button[data-automate="user-create-button"]').click();
    console.log("'Add user' button was clicked");

    // Wait for next page to load
    page.waitForLoadState('networkidle');
    })

    group("Provide new user details and click 'Add user' button", () => {

        page.$('input[id="first-name-input"]').type(randomFirstName);
        page.$('input[id="last-name-input"]').type(randomLastName);

        var userTypeDropdown = page.$("[data-automate='user-type-dropdown'] [data-automate='power-select']");
        userTypeDropdown.click();
        page.$("//*[text() = 'Consumer']").click(); // not very beatiful implementation, GET INFO HOW SHOULD WORK -> userTypeDropdown.selectOption('Consumer');

        page.$('button[type="submit"]').click();

        // Wait for next page to load
        page.waitForLoadState('networkidle');

        page.waitForTimeout(5000); 

        console.log("User created with first and last name: " + randomFirstName + " " + randomLastName);
    });

    group("Search for a user and open profile page", () => {

        // Open 'Search' page
        var searchButton = page.$('a[data-automate="user-switch-to-search-pill"]');
        searchButton.click();

        // Enter search term
        var searchInput = page.$('[id="user-search-input"]');
        searchInput.type(randomFirstName + " " + randomLastName);

        // Click 'Search' button
        page.$('button[id="user-search-btn"]').click();

        page.waitForTimeout(5000);

        // Open user profile page after searching
        page.$('[data-automate^="row-"]').click();

        console.log("User: " + randomFirstName + " " + randomLastName + " profile page was opened");
    })

    group("Delete user", () => {

        // Click 'Delete User' link
        page.$('[data-automate="user--user-link"]').click();

        // Provide confirmation mesaage - 'DELETE'

        page.focus('[id="delete-user-confirmation-input"]');
        page.keyboard.insertText('DELETE');

        // XK6 currently has a bug which cannot type Capital letters or special characters
        //page.$('[id="delete-user-confirmation-input"]').type("DELETE");

        // Click 'Delete' button
        page.$('button[title="Delete"]').click();

        console.log("User: " + randomFirstName + " " + randomLastName + " profile was deleted");
    });

    page.screenshot({path: "result.png", fullPage: false});

    page.close();
    browser.close();
}