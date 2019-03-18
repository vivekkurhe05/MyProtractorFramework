'use strict'

var ElementBy = function(){

    this.populate_element_by_id = function(unique_id) {
        return element(by.id(unique_id));
    }

    this.populate_element_by_name = function(unique_name) {
        return element(by.name(unique_name));
    }

    this.populate_element_by_xpath = function(unique_xpath) {
        return element(by.xpath(unique_xpath));
    }

    this.populate_element_by_xpathAll = function(unique_xpathAll){
        return element.all(by.xpath(unique_xpathAll));
    }

    this.populate_element_by_buttonText = function(unique_buttonText) {
        return element(by.buttonText(unique_buttonText));
    }

    this.populate_element_by_partialButtonText = function(unique_partialButtonText) {
        return element(by.partialButtonText(unique_partialButtonText));
    }

    this.populate_element_by_css = function(unique_cssSelector) {
        return element(by.css(unique_cssSelector));
    }

    this.populate_element_by_linkText = function(unique_linkText) {
        return element(by.linkText(unique_linkText));
    }

    this.populate_element_by_partialLinkText = function(unique_partialLinkText) {
        return element(by.linkText(unique_partialLinkText));
    }

    this.populate_element_by_model = function(unique_model) {
        return element(by.model(unique_model));
    }

    this.populate_element_by_binding = function(unique_binding) {
        return element(by.binding(unique_binding));
    }

    this.populate_element_by_repeater = function(unique_repeater) {
        return element(by.repeater(unique_repeater));
    }
    
    this.populate_element_by_tagName = function(unique_tagName) {
        return element(by.tagName(unique_tagName));
    }

    this.populate_element_by_options = function(unique_option) {
        return element.all(by.options(unique_option));
    }

    this.populate_element_by_desiredOption = function(xpath, tagName){
        return element(by.xpath(xpath)).all(by.tagName(tagName));
    }

    this.populate_element_by_className = function(cn){
        return element(by.className(cn));
    }
}

module.exports = new ElementBy();