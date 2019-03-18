'use strict'

var GenericClass = function(){
    
    this.verifyErrorOnBlankField = async function(elem, value){
        return await elem.getAttribute(value);
    }

    this.verifyThePresenceOfComponents = async function(elem){
        return await elem.isDisplayed();
    }

    this.click = function(elem){
        elem.click();
    }

     // browser.actions().mouseUp(creditCompare.backButton).perform();
            // var samp = creditCompare.backButton;
            // samp.getLocation().then(function(location){
            //     return browser.executeScript('window.scrollBy('+location.x+', '+location.y+');');
            // })
}

module.exports = new GenericClass();