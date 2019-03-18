'use strict'

var JavascriptExecutors = function(){

    this.scrollToView = function(elem){
        browser
        .executeScript(
            "arguments[0].scrollIntoView(true);", 
            elem);
    }
    
    this.scrollByPixel = function(width, height){
        browser
        .executeScript("window.scrollBy("+width+","+height+");");
    }
};

module.exports = new JavascriptExecutors();