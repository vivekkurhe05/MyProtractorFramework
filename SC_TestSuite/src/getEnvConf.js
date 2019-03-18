let parameters = {

    'stage': {

    },
    'uat': {
        uatUrl: 'http://uat.simplifiedcredit.net'
    },
    'local': {
        baseUrl: 'http://localhost:8080',
    }
}


let capabilities = {
    'chrome': {
        browserName: 'chrome',
    }
}

module.exports = {
    parameters,
    capabilities
}