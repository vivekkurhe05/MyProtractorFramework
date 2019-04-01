'use strict'

const elementBy = require('../helpers/element_by')
const wait = require('../helpers/waits')

var BusinessViabilityPage = function(){

    this.title = elementBy.populate_element_by_css("h4.page-title");
    this.addNewButton = elementBy.populate_element_by_xpath("//a[contains(text(),'Add new')]");
    this.editBVA = elementBy.populate_element_by_xpath("(//a[contains(text(), 'Edit')])[3]");
    this.nameTextBox = elementBy.populate_element_by_name("s0s0e0");
    this.addressTextBox1 = elementBy.populate_element_by_name("s0s0e1c0");
    this.addressTextBox2 = elementBy.populate_element_by_name("s0s0e1c1");
    this.landmarkTextBox = elementBy.populate_element_by_name("s0s0e1c3");
    this.bvnTextBox = elementBy.populate_element_by_name("s0s0e2");

    this.verifyBusinessViablityPageHeading = async () => {
        return await this.title.getText();
    }

    this.clickEditButton = () => this.editBVA.click();

    this.enterText = (elem, details) => {
        wait.waitForPresenceOfElement(elem);
        elem.clear();
        elem.sendKeys(details);
    }
};

module.exports = new BusinessViabilityPage();