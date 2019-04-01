'use strict'

var elementBy = require('../helpers/element_by');
var wait = require('../helpers/waits');
var homePage = require('../page-objects/home_page');

var NavbarLinks = function(){

    this.home = elementBy.populate_element_by_xpath("//a[contains(text(),'Home')]");
    this.creditCompare = elementBy.populate_element_by_xpath("//a[contains(text(),'Credit Compare')]");
    this.businessViability = elementBy.populate_element_by_xpath("//a[contains(text(),'Business Viability')]");
    this.businessPlanning = elementBy.populate_element_by_xpath("//a[contains(text(),'Business Planning')]");
    this.postCreditMonitoring = elementBy.populate_element_by_xpath("//a[contains(text(),'Post Credit Monitoring')]");
    this.managementFinance = elementBy.populate_element_by_xpath("//a[contains(text(),'Management Finance')]");
    this.login = elementBy.populate_element_by_xpath("//a[contains(text(),'Login')]");
    this.logout = elementBy.populate_element_by_xpath("//a[contains(text(),'Logout')]");
    
    this.goToHomePage = function(){
        this.home.click();
    }

    this.goToCreditComparePage = function(){
        wait.waitForElementVisibility(homePage.welcomeTitle);
        wait.waitForElementVisibility(this.creditCompare);
        this.creditCompare.click();
    }

    this.goToBusinessViabilityPage = function(){
        wait.waitForElementVisibility(homePage.welcomeTitle);
        wait.waitForElementVisibility(this.businessViability);
        this.businessViability.click();
    }

    this.goToBusinessPlanningPage = function(){
        this.businessPlanning.click();
    }

    this.goToPostCreditMonitoringPage = function(){
        this.postCreditMonitoring.click();
    }

    this.goToManagementFinancePage = function(){
        this.managementFinance.click();
    }

    this.goToLoginPage = function(){
        this.login.click();
    }

    this.goToLogoutPage = function(){
        wait.waitForElementVisibility(this.logout);
        this.logout.click();
    }
};

module.exports = new NavbarLinks();