'use strict'

var elementBy = require('../helpers/element_by');
var genericClass = require('../helpers/generic');
var wait = require('../helpers/waits');

var LoginPage = function(){

    this.loginPageTitle = elementBy.populate_element_by_xpath("//h3[contains(text(),'Sign In')]");
    this.emailTextBox = elementBy.populate_element_by_name("email");
    this.passwordTextBox = elementBy.populate_element_by_name("password");
    this.loginBtn = elementBy.populate_element_by_buttonText("Login");
    this.errorText = elementBy.populate_element_by_xpath("//div[contains(text(),'Login failed. Provide correct credentials')]"); 
    this.okButton = elementBy.populate_element_by_buttonText("OK");
    this.errorOnEmail = elementBy.populate_element_by_xpath("//input[@name='email']/ancestor::div[2]");
    this.errorOnPassword = elementBy.populate_element_by_xpath("//input[@name='password']/ancestor::div[2]");
    this.rememberMe = elementBy.populate_element_by_xpath("//input[@name='remember-me']/ancestor::label");
    this.checkbox = elementBy.populate_element_by_xpath("//input[@type='checkbox']");
    this.forgotPasswordLink = elementBy.populate_element_by_linkText("Forgot your password?");
    this.createAccountLink = elementBy.populate_element_by_linkText("Create an account");
    this.registrationPageTitle = elementBy.populate_element_by_xpath("//h3[contains(text(),'Create a new Account')]");

    this.get = function(payload) {
        browser.get(payload)
    }

    this.getTitle = async function(elem) {
        wait.waitForElementVisibility(elem);
        return await elem.getText();
    }

    this.enterEmail = function(email){

        this.emailTextBox.clear();
        this.emailTextBox.sendKeys(email);
    }

    this.enterPassword = function(password){
        this.passwordTextBox.clear();
        this.passwordTextBox.sendKeys(password);
    }

    this.actualText = async function(){
        wait.waitForElementVisibility(this.okButton);
        return await this.errorText.getText();
    }

    this.login = function(emailId, password){
        this.enterEmail(emailId);
        this.enterPassword(password);
        genericClass.click(this.loginBtn);
    }

    this.verifyErrorMsg = function(expectedMessage){
        wait.waitForElementVisibility(this.okButton);
        var actualMessage = this.actualText();
        if(expectedMessage.localeCompare(actualMessage)){
            return true;
        }
        else{
            return false;
        }
    }

    this.getProperty = function(elem, attr){
        elem.getAttribute(attr);
    }

};

module.exports = new LoginPage();