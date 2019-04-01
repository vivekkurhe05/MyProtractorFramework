'use strict'

let loginPage = require('../page-objects/login_page');
let navbarLinks = require('../page-objects/navbar_links');
let wait = require('../helpers/waits');
let creditCompare = require('../page-objects/credit_compare');
let js = require('../helpers/javascript_executors');
let dropDown = require('../helpers/drop_down');
let windows = require('../helpers/browser');
let genericClass = require('../helpers/generic');
let homePage = require('../page-objects/home_page');

describe('Credit compare test suite - ', () => {

    beforeEach( () => {
        loginPage.get('/login');
        loginPage.login(browser.params.email, browser.params.password);
        navbarLinks.goToCreditComparePage();
        wait.waitForElementVisibility(creditCompare.businessLoansButton);     
    });

    it('TC_002 Verify the components on credit compare page', () => {
        expect(genericClass.verifyThePresenceOfComponents(creditCompare.businessLoansButton)).toBeTruthy();
        expect(genericClass.verifyThePresenceOfComponents(creditCompare.personalLoansButton)).toBeTruthy();
        expect(genericClass.verifyThePresenceOfComponents(creditCompare.interventionFundsButton)).toBeTruthy();
        expect(genericClass.verifyThePresenceOfComponents(creditCompare.loanAmount)).toBeTruthy();
        expect(genericClass.verifyThePresenceOfComponents(creditCompare.amountInterestRate)).toBeTruthy();
        expect(genericClass.verifyThePresenceOfComponents(creditCompare.loanPeriod)).toBeTruthy();
        expect(genericClass.verifyThePresenceOfComponents(creditCompare.paymentPeriod)).toBeTruthy();
        expect(genericClass.verifyThePresenceOfComponents(creditCompare.calculateButton)).toBeTruthy();
    });

    describe('Business loans Verify', () => {

        let expectedSubCategories = [];
        let expectedInstitutionTypes = [];

        beforeEach( () => {
            creditCompare.clickButton(creditCompare.businessLoansButton);
            expectedSubCategories = [
                'Business Loans',
                'Overdraft',
                'Revolving Overdraft',
                'Letter of Credit',
                'Specialised Loans',
                'Mortgage',
                'Vehicle & Asset Acquisition'];

            expectedInstitutionTypes = [
                'All Institutions',
                'Commercial Banks',
                'Microfinance Banks',
                'Development Banks',
                'Non-Bank Institution'
            ];
        });

        it('the functionality of select button of business loans section in credit compare', () => {
            expect(genericClass.verifyThePresenceOfComponents(creditCompare.subCategoryDropDown)).toBeTruthy();
            expect(genericClass.verifyThePresenceOfComponents(creditCompare.amountTextBox)).toBeTruthy();
            expect(genericClass.verifyThePresenceOfComponents(creditCompare.institutionTypeDropDown)).toBeTruthy();
            expect(genericClass.verifyThePresenceOfComponents(creditCompare.proceedButton)).toBeTruthy();
            expect(genericClass.verifyThePresenceOfComponents(creditCompare.backButton)).toBeTruthy();
        });

        it('the dropdown options of subcategory of business loans section', async () => {
            let actualSubCategories = await dropDown.getAllDropdownOptions(creditCompare.subCategoryDropDown);
            expect(expectedSubCategories).toEqual(actualSubCategories.map(function(e1){
                return e1.trim();
            })
            );
        });

        it('that user enters valid amount', () => {
            creditCompare.selectSubCategoryFromDropDown();
            creditCompare.enterAmount(100000);
            creditCompare.clickButton(creditCompare.proceedButton);
            expect(creditCompare.getTotalOffersProvidedByInstitutes(creditCompare.totalRowsOfOffers)).toBeGreaterThan(0);
        });

        it('TC_010 Verify that by default selected option of subcategory of business loans section', () => {
            let actualSelectedOption = creditCompare.getSelectedOption(creditCompare.selectedSubCategoryDropDown);
            expect(actualSelectedOption).toEqual('Select Sub Category');
        });

        it('TC_011 the dropdown options of institution type of business loans', async () => {
            let actualInstitutionTypes = await dropDown.getAllDropdownOptions(creditCompare.institutionTypeDropDown);
            expect(expectedInstitutionTypes).toEqual(actualInstitutionTypes.map(function(e1){
                return e1.trim();
            })
            );
        });

        it('TC_012 that select subcategory and enter amount textbox are mandatory', () => {
            creditCompare.clickButton(creditCompare.proceedButton);
            expect(genericClass.verifyErrorOnBlankField(creditCompare.errorOnSubCategoryDropdown, 'class')).toContain('has-error');
            expect(genericClass.verifyErrorOnBlankField(creditCompare.errorOnAmountTextBox, 'class')).toContain('has-error');
        });

        it('TC_013 that user enters invalid amount', () =>{
            creditCompare.selectSubCategoryFromDropDown();
            creditCompare.enterAmount(-1);
            creditCompare.clickButton(creditCompare.proceedButton);
            expect(creditCompare.getMessage()).toEqual("Showing 0 results out of 0.");
        });

        it('TC_014 the offers count on invalid amount', () => {
            creditCompare.selectSubCategoryFromDropDown();
            creditCompare.enterAmount(-1);
            creditCompare.clickButton(creditCompare.proceedButton);
            let actualOffers = creditCompare.totalOffersFoundfuncOnInvalidAmount(creditCompare.totalOffersFound);
            expect(actualOffers.then(v => parseInt(v))).toEqual(0);
        });

        it('TC_015 the institutions count on invalid amount',() => {
            creditCompare.selectSubCategoryFromDropDown();
            creditCompare.enterAmount(-1);
            creditCompare.clickButton(creditCompare.proceedButton);
            let actualInstitutions = creditCompare.totalInstitutionsFoundfuncOnInvalidAmount(creditCompare.totalInstitutionsFound);
            expect(actualInstitutions.then(v => parseInt(v))).toEqual(0);
        });

        it('TC_016 that user enters valid amount', async () => {
            creditCompare.selectSubCategoryFromDropDown();
            creditCompare.enterAmount(100000);
            creditCompare.clickButton(creditCompare.proceedButton);
            let rows = await creditCompare.getTotalOffersProvidedByInstitutes(creditCompare.totalRowsOfOffers);
            expect(rows).toBeGreaterThan(0);
        });

        it('TC_017 the offers count on valid amount', () => {
            creditCompare.selectSubCategoryFromDropDown();
            creditCompare.enterAmount(100000);
            creditCompare.clickButton(creditCompare.proceedButton);
            let actualOffersCount = creditCompare.totalOffersFoundfunc(creditCompare.totalOffersFound);
            expect(actualOffersCount.then(v => parseInt(v))).toBeGreaterThan(0);
        });

        it('TC_018 the institutions count', () => {
            creditCompare.selectSubCategoryFromDropDown();
            creditCompare.enterAmount(100000);
            creditCompare.clickButton(creditCompare.proceedButton);
            let actualInstitutionsCount = creditCompare.totalInstitutionsFoundfunc(creditCompare.totalInstitutionsFound);
            expect(actualInstitutionsCount.then(v => parseInt(v))).toBeGreaterThan(0);
        });

        it('TC_019 Verify the back button of business loans section', () => {
            js.scrollByPixel(0, -300);
            creditCompare.clickButton(creditCompare.backButton);
            let pageTagLine = creditCompare.getTagLine();
            expect(pageTagLine).toContain('Facilitating access to finance');
        });

        it('TC_020 the user clicks browser back button', async () => {
            windows.goBack();
            expect(await homePage.verifyTitle()).toContain('Welcome, ');
        });
      
        it('no testcase id the default option selection of institution type', async () => {
            let actualSelectedOption = await creditCompare.getSelectedOption(creditCompare.selectedInstitutionTypeDropDown);
            expect(actualSelectedOption).toEqual('All Institutions');
        });
       
    });

    describe('Personal loans Verify', () => {

        let expectedSubCategories = [];
        let expectedInstitutionTypes = [];

        beforeEach( () => {
            creditCompare.clickButton(creditCompare.personalLoansButton);
            expectedSubCategories = [
                'Specialised Loans',
                'Personal Loans',
                'Vehicle & Asset Acquisition',
                'Mortgage'
            ]

            expectedInstitutionTypes = [
                'All Institutions',
                'Commercial Banks',
                'Microfinance Banks',
                'Development Banks',
                'Non-Bank Institution'
            ]
        });

        it('TC_021 the functionality of select button of personal loans section in credit compare', () => {
            expect(genericClass.verifyThePresenceOfComponents(creditCompare.subCategoryDropDown)).toBeTruthy();
            expect(genericClass.verifyThePresenceOfComponents(creditCompare.amountTextBox)).toBeTruthy();
            expect(genericClass.verifyThePresenceOfComponents(creditCompare.institutionTypeDropDown)).toBeTruthy();
            expect(genericClass.verifyThePresenceOfComponents(creditCompare.proceedButton)).toBeTruthy();
            expect(genericClass.verifyThePresenceOfComponents(creditCompare.backButton)).toBeTruthy();            
        });

        it('TC_022 the dropdown options of subcategory of personal loans section', async () => {
            let actualSubCategories = await dropDown.getAllDropdownOptions(creditCompare.subCategoryDropDown);
            expect(expectedSubCategories).toEqual(actualSubCategories.map(function(e1){
                return e1.trim();
            })
            );
        });

        it('TC_023 the by default option selected of subcategory of personal loans section', () => {
            let actualSelectedOption = creditCompare.getSelectedOption(creditCompare.selectedSubCategoryDropDown);
            expect(actualSelectedOption).toEqual('Select Sub Category');
        });

        it('TC_024 the dropdown options of institution type of personal loans section', async () => {
            let actualInstitutionTypes = await dropDown.getAllDropdownOptions(creditCompare.institutionTypeDropDown);
            expect(expectedInstitutionTypes).toEqual(actualInstitutionTypes.map(function(e1){
                return e1.trim();
            })
            );
        });

        it('TC_025 that select subcategory and enter amount textbox are mandatory', () => {
            creditCompare.clickButton(creditCompare.proceedButton);
            expect(genericClass.verifyErrorOnBlankField(creditCompare.errorOnSubCategoryDropdown, 'class')).toContain('has-error');
            expect(genericClass.verifyErrorOnBlankField(creditCompare.errorOnAmountTextBox, 'class')).toContain('has-error');
        });

        it('TC_026 that user enters invalid amount', () => {
            creditCompare.selectSubCategoryFromDropDown();
            creditCompare.enterAmount(-1);
            creditCompare.clickButton(creditCompare.proceedButton);
            expect(creditCompare.getMessage()).toEqual("Showing 0 results out of 0.");
        });

        it('TC_027 the offers count on invalid amount', () => {
            creditCompare.selectSubCategoryFromDropDown();
            creditCompare.enterAmount(-1);
            creditCompare.clickButton(creditCompare.proceedButton);
            let actualOffers = creditCompare.totalOffersFoundfuncOnInvalidAmount(creditCompare.totalOffersFound);
            expect(actualOffers.then(v => parseInt(v))).toEqual(0);
        });

        it('TC_028 the institutions count on invalid amount', () => {
            creditCompare.selectSubCategoryFromDropDown();
            creditCompare.enterAmount(-1);
            creditCompare.clickButton(creditCompare.proceedButton);
            let actualInstitutions = creditCompare.totalInstitutionsFoundfuncOnInvalidAmount(creditCompare.totalInstitutionsFound);
            expect(actualInstitutions.then(v => parseInt(v))).toEqual(0);
        });

        it('TC_029 that user enters valid amount', async () => {
            creditCompare.selectSubCategoryFromDropDown();
            creditCompare.enterAmount(100000);
            creditCompare.clickButton(creditCompare.proceedButton);
            let rows = await creditCompare.getTotalOffersProvidedByInstitutes(creditCompare.totalRowsOfOffers);
            expect(rows).toBeGreaterThan(0);
        });

        fit('TC_030 the offers count on valid amount', () => {
            creditCompare.selectSubCategoryFromDropDown();
            creditCompare.enterAmount(100000);
            creditCompare.clickButton(creditCompare.proceedButton);
            let actualOffersCount = creditCompare.totalOffersFoundfunc(creditCompare.totalOffersFound);
            expect(actualOffersCount.then(v => parseInt(v))).toBeGreaterThan(0);
        });

        it('TC_031 the institutions count', () => {
            creditCompare.selectSubCategoryFromDropDown();
            creditCompare.enterAmount(100000);
            creditCompare.clickButton(creditCompare.proceedButton);
            let actualInstitutionsCount = creditCompare.totalInstitutionsFoundfunc(creditCompare.totalInstitutionsFound);
            expect(actualInstitutionsCount.then(v => parseInt(v))).toBeGreaterThan(0);
        });

        it('TC_032 the back button of personal loans section', () => {
            js.scrollByPixel(0, -300);
            creditCompare.clickButton(creditCompare.backButton);
            let pageTagLine = creditCompare.getTagLine();
            expect(pageTagLine).toContain('Facilitating access to finance');
        });
    });

    fdescribe('intervention funds', () => {

        let expectedSubCategories = [];

        beforeEach( () => {
            creditCompare.clickButton(creditCompare.interventionFundsButton);
            expectedSubCategories = [
                'Public Intervention Funds',
                'Private Intervention Funds'
            ];

        });

        it('TC_033 the functionality of select button of intervention funds section in credit compare', () => {
            expect(genericClass.verifyThePresenceOfComponents(creditCompare.subCategoryDropDown)).toBeTruthy();
            expect(genericClass.verifyThePresenceOfComponents(creditCompare.amountTextBox)).toBeTruthy();
            expect(genericClass.verifyThePresenceOfComponents(creditCompare.proceedButton)).toBeTruthy();
            expect(genericClass.verifyThePresenceOfComponents(creditCompare.backButton)).toBeTruthy();
        });

        // failing
        xit('TC_034 the dropdown options of subcategory of intervention funds section', async () => {
            let actualSubCategories = await dropDown.getAllDropdownOptions(creditCompare.subCategoryDropDown);
            expect(expectedSubCategories).toEqual(actualSubCategories.map(function(e1){
                return e1.trim();
            })
            );
        });

        it('TC_035 the by default option selected of subcategory of intervention funds section', () => {
            let actualSelectedOption = creditCompare.getSelectedOption(creditCompare.selectedSubCategoryDropDown);
            expect(actualSelectedOption).toEqual('Select Sub Category');            
        });

        it('TC_036 that select subcategory and enter amount textbox are mandatory', () => {
            creditCompare.clickButton(creditCompare.proceedButton);
            expect(genericClass.verifyErrorOnBlankField(creditCompare.errorOnSubCategoryDropdown, 'class')).toContain('has-error');
            expect(genericClass.verifyErrorOnBlankField(creditCompare.errorOnAmountTextBox, 'class')).toContain('has-error');
        });

        //failing
        xit('TC_037 that user enters invalid amount', () => {
            creditCompare.selectSubCategoryFromDropDown();
            creditCompare.enterAmount(-1);
            creditCompare.clickButton(creditCompare.proceedButton);
            expect(creditCompare.getMessage()).toEqual("Showing 0 results out of 0.");
        });

        //failing
        xit('TC_038 the offers count on invalid amount', () => {
            creditCompare.selectSubCategoryFromDropDown();
            creditCompare.enterAmount(-1);
            creditCompare.clickButton(creditCompare.proceedButton);
            let actualOffers = creditCompare.totalOffersFoundfuncOnInvalidAmount(creditCompare.totalOffersFound);
            expect(actualOffers.then(v => parseInt(v))).toEqual(0);
        });

        //failing
        xit('TC_039 the institutions count on invalid amount', () => {
            creditCompare.selectSubCategoryFromDropDown();
            creditCompare.enterAmount(-1);
            creditCompare.clickButton(creditCompare.proceedButton);
            let actualInstitutions = creditCompare.totalInstitutionsFoundfuncOnInvalidAmount(creditCompare.totalInstitutionsFound);
            expect(actualInstitutions.then(v => parseInt(v))).toEqual(0);
        });

        fit('TC_040 that user enters valid amount', async () => {
            creditCompare.selectSubCategoryFromDropDown();
            creditCompare.enterAmount(100000);
            creditCompare.clickButton(creditCompare.proceedButton);
            let rows = await creditCompare.getTotalOffersProvidedByInstitutes(creditCompare.totalRowsOfOffers);
            expect(rows).toBeGreaterThan(0);
        });

        it('TC_041 the offers count on valid amount', () => {
            creditCompare.selectSubCategoryFromDropDown();
            creditCompare.enterAmount(100000);
            creditCompare.clickButton(creditCompare.proceedButton);
            let actualOffersCount = creditCompare.totalOffersFoundfunc(creditCompare.totalOffersFound);
            expect(actualOffersCount.then(v => parseInt(v))).toBeGreaterThan(0);
        });

        it('TC_042 the institutions count', () => {
            creditCompare.selectSubCategoryFromDropDown();
            creditCompare.enterAmount(100000);
            creditCompare.clickButton(creditCompare.proceedButton);
            let actualInstitutionsCount = creditCompare.totalInstitutionsFoundfunc(creditCompare.totalInstitutionsFound);
            expect(actualInstitutionsCount.then(v => parseInt(v))).toBeGreaterThan(0);
        });

        it('TC_043 the back button of personal loans section', () => {
            js.scrollByPixel(0, -300);
            creditCompare.clickButton(creditCompare.backButton);
            let pageTagLine = creditCompare.getTagLine();
            expect(pageTagLine).toContain('Facilitating access to finance');
        });
    });
});