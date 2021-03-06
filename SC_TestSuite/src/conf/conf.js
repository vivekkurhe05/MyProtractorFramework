'use strict'

var retry = require('protractor-retry').retry;
let HtmlReporter = require('protractor-beautiful-reporter');
let SpecReporter = require('jasmine-spec-reporter').SpecReporter
let parameters = require('../getEnvConf').parameters
let capabilities = require('../getEnvConf').capabilities
let cap, env, directConnectFlag = true
const execSync = require('child_process').execSync
const globalNodeModules = execSync('npm root -g').toString('utf8').trim().replace(/\s/g, '_')
process.argv.forEach(function (arg){
    if (arg.indexOf('--params.cap') > -1) {
        cap = arg.split('=')[1]
        if (cap.indexOf('chrome') > -1) directConnectFlag = true
    } else if (arg.indexOf('--params.env') > -1){
        env = arg.split('=')[1]
    }
})

function getCapabilities(cap) {
    if (!capabilities.hasOwnProperty(cap)){
        cap = 'chrome'
    }
    return capabilities[cap]
}

exports.config = {

    seleniumAddress: 'http://localhost:4444/wd/hub',
    chromeDriver: globalNodeModules + '/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.46',
    directConnect: directConnectFlag,

    /*
    shardTestFiles works at the file level.
    Protractor does not currently support parallel runs at the test level.
    */
    // multiCapabilities: {
    //     split: true,
    //     maxSessions: 2,
    //     capabilities: [{
    //         browserName: 'chrome',
    //         shardTestFiles: true,
    //         maxInstances: 2
    //     }]
    // },
    capabilities: {
        browserName: 'chrome'
    },

    onCleanUp: function(results){
        retry.onCleanUp(results);
    },

    onPrepare: function(){
        retry.onPrepare();
        browser.params.env = env ? env : 'local'
        if(!parameters.hasOwnProperty(browser.params.env)){
            browser.params.env = 'local'
        }
        Object.getOwnPropertyNames(parameters[browser.params.env]).forEach(function (element){
            browser.params[element] = parameters[browser.params.env][element]
        })
        browser.baseUrl = browser.params.baseUrl
        browser.waitForAngularEnabled(false);
        browser.manage().window().maximize();

        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: false
            }
        }))

        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: 'src/reports/screenshots',
            screenshotsSubfolder: 'images',
            jsonsSubfolder: 'jsons',
            excludeSkippedSpecs: true,
            takesScreenShotsOnlyForFailedSpecs: true,
            docTitle: 'Test Execution Report',
            docName: 'testReport.html',
            preserveDirectory: false
        }).getJasmine2Reporter());

    },

    afterLaunch: function(){
        return retry.afterLaunch(5);
    },
    
    framework: 'jasmine',   
    capabilities: getCapabilities(cap),
    // specs:['../specs/login.spec.js', '../specs/credit_compare.spec.js'],
    specs: ['../specs/bva.spec.js'],
    // specs: ['../specs/login.spec.js'],

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 60000,
        includeStackTrace: true,
        print: function() {}
    },
    
    params: {
        email: 'test@mail.com',
        password: 'test',
    }
};