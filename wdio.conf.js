export const config = {
    runner: 'local',
    specs: ['./test/features/**/*.feature'],
    maxInstances: 3,

    capabilities: [
        {
            browserName: 'chrome',
            'goog:chromeOptions': { args: ['--headless', '--disable-gpu'] }
        },
        {
            browserName: 'firefox',
            'moz:firefoxOptions': { args: ['-headless'] }
        },
        {
            browserName: 'MicrosoftEdge',
            'moz:MicrosoftEdgeOptions': { args: ['-headless'] }
        }
    ],

    logLevel: 'info',
    baseUrl: 'https://www.saucedemo.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'cucumber',
    reporters: ['spec'],

    cucumberOpts: {
        require: ['./test/step-definitions/**/*.js'],
        timeout: 60000
    }
};
