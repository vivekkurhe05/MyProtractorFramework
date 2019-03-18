'use strict'

var elementBy = require('../helpers/element_by');
var dropDown = require('../helpers/drop_down');
var wait = require('../helpers/waits');
var browser = require('../helpers/browser');
var js = require('../helpers/javascript_executors');

var CreditComparePage = function(){
    this.confirmPageTitle = elementBy.populate_element_by_xpath("//h4[@class='tagLine']");
    this.loanAmount = elementBy.populate_element_by_id("loanAmount");
    this.amountInterestRate = elementBy.populate_element_by_id("interestRate");
    this.loanPeriod = elementBy.populate_element_by_id("loanYears");
    this.paymentPeriod = elementBy.populate_element_by_xpath("//select[@class='form-control']/option");
    this.calculateButton = elementBy.populate_element_by_buttonText("Calculate");
    this.businessLoansButton = elementBy.populate_element_by_xpath("(//h2[contains(text(),'Business Loans')]/following::div/button)[1]");
    this.personalLoansButton = elementBy.populate_element_by_xpath("(//h2[contains(text(),'Business Loans')]/following::div/button)[2]");
    this.interventionFundsButton = elementBy.populate_element_by_xpath("(//h2[contains(text(),'Business Loans')]/following::div/button)[3]");
    this.creditComparePageTagLine = elementBy.populate_element_by_xpath("//h4[@class='tagLine']");
    this.backButton = elementBy.populate_element_by_className("backBtn backBtnDiv");
    this.proceedButton = elementBy.populate_element_by_buttonText("Proceed");
    this.anySubCategory = elementBy.populate_element_by_desiredOption("//select[@id='select-category']","option");
    this.subCategoryDropDown = elementBy.populate_element_by_xpathAll("(//select[@id='select-category']/option)[position()>1]");
    this.selectedSubCategoryDropDown = elementBy.populate_element_by_xpath("//select[@id='select-category']/option[@selected='selected']");
    this.institutionTypeDropDown = elementBy.populate_element_by_xpathAll("//label[contains(text(), 'Select Institution Type')]/following::div/select/option");
    this.selectedInstitutionTypeDropDown = elementBy.populate_element_by_xpath("//label[contains(text(), 'Select Institution Type')]/following::div/select/option[@selected='selected']");
    this.amountTextBox = elementBy.populate_element_by_id("example-input3-group1");
    this.errorOnSubCategoryDropdown = elementBy.populate_element_by_xpath("//select[@id='select-category']/ancestor::div[2]");
    this.errorOnAmountTextBox = elementBy.populate_element_by_xpath("//input[@name='example-input3-group1']/ancestor::div[3]");
    this.proceedButton = elementBy.populate_element_by_buttonText("Proceed");
    this.instituteListingPage = elementBy.populate_element_by_id("Institution");
    this.totalRowsOfOffers = elementBy.populate_element_by_xpathAll("//div[@class='singleResult bg-white']");
    this.totalOffersFound = elementBy.populate_element_by_xpath("//div[@class='bbGrey']/label/strong[1]");
    this.totalInstitutionsFound = elementBy.populate_element_by_xpath("//div[@class='bbGrey']/label/strong[2]");
    this.selectFirstRowTextsOnly = elementBy.populate_element_by_xpathAll("(//div[@class='singleResult bg-white'])[1]//div[@class='br cell' or @class='cell']");
    this.message = elementBy.populate_element_by_xpath("//div[contains(text(),'Showing 0 results out of 0')]") ;
    this.detailsLink = elementBy.populate_element_by_xpath("(//div[@class='details-link'])[1]");
    this.instituteDetails = elementBy.populate_element_by_xpathAll("//table//tr[not(position()=1) and not(position()=2) and not(position()=9)]//td[@class='text-right']");

    this.get = function(){
        browser.get('/creditcompare');
    }

    this.getTagLine = async function(){
        return await this.creditComparePageTagLine.getText();
    }

    this.clickButton = function(elem){
        wait.waitForElementVisibility(elem);
        elem.click();
    }

    this.getAllDropdownOptions = async function(){
        return await this.subCategoryDropDown.getText();
    }

    this.selectSubCategoryFromDropDown = function(){
        wait.waitForElementVisibility(this.subCategoryDropDown.first());
        dropDown.selectFirstOption(this.subCategoryDropDown);
    }

    this.enterAmount = function(amount){
        this.amountTextBox.sendKeys(amount);
    }

    this.getSelectedOption = async function(elem){
        wait.waitForElementVisibility(elem);
        return await elem.getText();
    }

    this.verifyTitle = async function(){
        wait.waitForElementVisibility(this.instituteListingPage);
        return await this.instituteListingPage.getText();
    }

    this.getTotalOffersProvidedByInstitutes = function(elem){
        wait.waitForAllElements(elem);
        return elem.count();
    }

    this.totalOffersFoundfunc = async function(elem){
        wait.waitForElementToChangeValue(elem);
        return await elem.getText();
    }

    this.totalOffersFoundfuncOnInvalidAmount = async function(elem){
        wait.waitForElementVisibility(elem);
        return await elem.getText();
    }

    this.totalInstitutionsFoundfunc = async function(elem){
        wait.waitForElementToChangeValue(elem);
        return await elem.getText();
    }

    this.totalInstitutionsFoundfuncOnInvalidAmount = async function(elem){
        wait.waitForElementVisibility(elem);
        return await elem.getText();
    }

    this.getCellsOfFirstRow = function(){
        this.selectFirstRowTextsOnly.each(function(element, index){
            element.getText().then(function(text){
                return text;
            });
        });
    }

    this.getMessage = async function(){
        wait.waitForElementVisibility(this.message);
        return await this.message.getText();
    }

    this.showDetails = function(){
        wait.waitForElementVisibility(this.detailsLink);
        this.detailsLink.click();
    }

    this.getInstituteDetails = function(){
        browser.switchNewTab();
        this.instituteDetails.each(function(element, index){
            element.getText().then(async function(text){
                console.log(await text);
            });
        });
    }
};

module.exports = new CreditComparePage();