'use strict'

let loginPage = require('../page-objects/login_page.js');
let genericClass = require('../helpers/generic');
let using = require('jasmine-data-provider');
let navbar = require('../page-objects/navbar_links');
let homePage = require('../page-objects/home_page');
let wait = require('../helpers/waits');
let browsers = require('../helpers/browser');

describe('Login sanity tests', () => {

    beforeEach( () => {
        loginPage.get('/login');
    });

    it('Verify the elements on login page', () => {
        expect(loginPage.getTitle(loginPage.loginPageTitle)).toEqual('Sign In');
        expect(genericClass.verifyThePresenceOfComponents(loginPage.emailTextBox)).toBeTruthy();
        expect(genericClass.verifyThePresenceOfComponents(loginPage.passwordTextBox)).toBeTruthy();
        expect(genericClass.verifyThePresenceOfComponents(loginPage.loginBtn)).toBeTruthy();
        expect(genericClass.verifyThePresenceOfComponents(loginPage.rememberMe)).toBeTruthy();
        expect(genericClass.verifyThePresenceOfComponents(loginPage.forgotPasswordLink)).toBeTruthy();
        expect(genericClass.verifyThePresenceOfComponents(loginPage.createAccountLink)).toBeTruthy();
    });

    it('Verify the cursor is focused on email textbox on the page load', () => {
        expect(loginPage.emailTextBox.getAttribute("name")).toEqual(browser.driver.switchTo().activeElement().getAttribute("name"));
    });

    it('Verify that all the fields such as Email and Password has a valid placeholders', () => {
        expect(loginPage.emailTextBox.getAttribute("placeholder")).toEqual("Email");
        expect(loginPage.passwordTextBox.getAttribute("placeholder")).toEqual("Password");
    });

    it('Verify that the password is masked when entered', () => {
        expect(loginPage.passwordTextBox.getAttribute("type")).toEqual("password");
    });

    it('Verify that the logout link is redirected to login page', () => {
        loginPage.login(browser.params.email, browser.params.password);
        navbar.goToLogoutPage();
        let actualTitle = loginPage.getTitle(loginPage.loginPageTitle);
        expect(actualTitle).toEqual('Sign In');
    });

    it('Verify that user is redirected to create an account page', async () => {
        genericClass.click(loginPage.createAccountLink);
        let actualTitle = await loginPage.getTitle(loginPage.registrationPageTitle);
        expect(actualTitle).toEqual('Create a new Account');
    });
    

    function arrayOfData(){

        return [
            {
                "email":"testmail.com",
                "password":"23nkdkn"
            },
            {
                "email": "test@mail.com",
                "password": "wrongpassword"
            },
            {
                "email": "testmail.com",
                "password": "test"
            }
            
        ]
    }

    using(arrayOfData, function(testData){
        it('invalid login attempts', () => {
            loginPage.login(testData.email, testData.password);
            expect(loginPage.actualText()).toEqual('Login failed. Provide correct credentials');
            genericClass.click(loginPage.okButton);
        });
    });

    it('user should be able to login', () => {

        loginPage.login(browser.params.email, browser.params.password);
        expect(homePage.verifyTitle()).toContain('Welcome, ');
    });

    it('error alert on email textbox', () => {
        loginPage.login("", browser.params.password);
        expect(genericClass.verifyErrorOnBlankField(loginPage.errorOnEmail, 'class')).toContain('has-error');
    });

    it('error alert on password textbox', () => {
        loginPage.login(browser.params.email, "");
        expect(genericClass.verifyErrorOnBlankField(loginPage.errorOnPassword, 'class')).toContain('has-error');
    });

    it('Verify that clicking on browser back button after successful login should not take user to logout mode', () => {
        loginPage.login(browser.params.email, browser.params.password);
        wait.waitForElementVisibility(homePage.welcomeTitle);
        browsers.goBack();
        browsers.goForward();
        expect(homePage.verifyTitle()).toContain('Welcome, ');
    });

    it('Verify that clicking on browser back button after successful logout should not take user to logged in mode', () => {
        loginPage.login(browser.params.email, browser.params.password);
        navbar.goToLogoutPage();
        browsers.goBack();
        expect(wait.waitForUrl('/login')).not.toEqual('/dashboard')
    });

    it('Verify that Remember me checkbox is selected by default', () => {
        expect(loginPage.checkbox.getAttribute("checked")).toBeTruthy();
    });
  
});