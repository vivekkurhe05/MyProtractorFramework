'use strict'

var wait = require('../helpers/waits');

var HomePage = function(){

    this.welcomeTitle = element(by.xpath("//h4[contains(text(),'Welcome, ')]"));
    
        this.get = function() {
            browser.get('/home')
    }

    this.verifyTitle = async function() {
            wait.waitForElementVisibility(this.welcomeTitle);
            return await this.welcomeTitle.getText()
    }
};
    
 module.exports = new HomePage();