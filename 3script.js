import launcher from "k6/x/browser";

export default function() {
    const browser = launcher.launch('chromium', {
        headless: false,
        slowMo: '500ms' // slow down by 500ms
    });
    var context = browser.newContext();
    var page = context.newPage();


    // Goto front page, find login link and click it
    page.goto('https://app.test.alwaysreach.net/authentication/login?response_type=token&client_id=14e4009f-f761-4d44-9ee3-5caacada6dc6.vela.care&redirect_uri=https://app.test.alwaysreach.net/admin', { waitUntil: 'networkidle' });

    // Enter login credentials and login
    // page.$('input[name="username"]').type('alexadmin');
    // page.$('input[type="submit"]').click();

    // Wait for next page to load
    page.waitForLoadState('networkidle');

    page.$('[class="checkmark"]').click();

    page.$('input[name="username"]').type('alexadmin');

    //A workaround until the bug is fixed

    page.focus('input[name="password"]');
    page.keyboard.insertText('Testing1!');

    // page.$('input[name="password"]').type('TTesting1!');


    page.$('button[type="submit"]').click();

    page.waitForLoadState('networkidle');

    page.waitForTimeout(5000);

    // Click on the 'Users' link

    var element = page.$('[id="user-link"]');
    element.click();

    console.log("Users link was clicked");

    // Wait for next page to load
    page.waitForLoadState('networkidle');
    page.waitForTimeout(5000);
    page.screenshot({path: "login.png", fullPage: false});

    page.close();
    browser.close();
}