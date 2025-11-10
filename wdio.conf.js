exports.config = {
    runner: 'local',
    
    specs: [
        './test/features/**/*.feature'
    ],
    
    exclude: [],
    
    maxInstances: 1,

    capabilities: [
       /*  {
            maxInstances: 1,
            browserName: 'chrome',
            acceptInsecureCerts: true,
            'goog:chromeOptions': {
                args: [
                    '--disable-gpu',
                    '--window-size=1920,1080',
                    '--no-sandbox',
                    '--disable-dev-shm-usage'
                ]
            }
        }, */
        {
            maxInstances: 1,
            browserName: 'firefox',
            acceptInsecureCerts: true,
            'moz:firefoxOptions': {
                args: [
                    //'--headless',
                    '--disable-gpu',
                    '--window-size=1920,1080',
                    '--no-sandbox',
                    '--disable-dev-shm-usage'
                ]
            }
        },
        /* {
            maxInstances: 1,
            browserName: 'MicrosoftEdge',
            acceptInsecureCerts: true,
            'ms:edgeOptions': {
                args: [
                    '--disable-gpu',
                    '--window-size=1920,1080',
                    '--no-sandbox'
                ]
            }
        } */
    ],
    
    logLevel: 'info',
    bail: 0,
    baseUrl: 'https://www.saucedemo.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    
    services: [
        /* ['chromedriver', {
            logFileName: 'wdio-chromedriver.log',
            outputDir: 'driver-logs'
        }], */
        ['geckodriver', {
            logFileName: 'wdio-geckodriver.log',
            outputDir: 'driver-logs'
        }],
        /* ['edgedriver', {
            logFileName: 'wdio-edgedriver.log',
            outputDir: 'driver-logs'
        }] */
    ],
    
    framework: 'cucumber',
    
    reporters: ['spec'],

    cucumberOpts: {
        require: ['./test/step-definitions/**/*.js'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        format: ['pretty'],
        snippets: true,
        source: true,
        profile: [],
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    },

    before: function (capabilities, specs) {
        browser.setTimeout({ 'implicit': 5000 });
        browser.maximizeWindow();
    },

    afterStep: async function (step, scenario, { error, duration, passed }, context) {
        if (error) {
            await browser.takeScreenshot();
        }
    },

    after: function (result, capabilities, specs) {
        //Cleanup después de cada test
    }
}