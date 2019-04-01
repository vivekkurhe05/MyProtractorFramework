'use strict'

const loginPage = require('../page-objects/login_page')
const navbarLinks = require('../page-objects/navbar_links')
const wait = require('../helpers/waits')
const bvaPage = require('../page-objects/business_viability_page')
const faker = require('faker/locale/en_IND')

describe('Business viability test suite', () => {

    beforeEach( () => {
        loginPage.get('/login');
        loginPage.login(browser.params.email, browser.params.password);
        navbarLinks.goToBusinessViabilityPage();
        wait.waitForElementVisibility(bvaPage.title);
    });

    xit('verify the page heading of business viability page', () => {
        expect(bvaPage.verifyBusinessViablityPageHeading()).toEqual('Business Viability');
    });

    describe('Edit assessment form', () => {

        var company_details = {};

        beforeEach( () => {
            bvaPage.clickEditButton();

            company_details = {
                company_name: faker.company.companyName,
                street_address_1: faker.address.streetName,
                street_address_2: faker.address.streetAddress,
                landmark: faker.address.streetPrefix,
                bank_verification_number: "1466465654646464"
            }

        });

        it('verify that user can edit assessment form', () => {

            bvaPage.enterText(bvaPage.nameTextBox, company_details.company_name);
            bvaPage.enterText(bvaPage.addressTextBox1, company_details.street_address_1);
            bvaPage.enterText(bvaPage.addressTextBox2, company_details.street_address_2);
            bvaPage.enterText(bvaPage.landmarkTextBox, company_details.landmark);
            bvaPage.enterText(bvaPage.bvnTextBox, company_details.bank_verification_number);
        
        })



    });
    
});