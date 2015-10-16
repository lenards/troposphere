
module.exports = {
  'atmobeta smoke' : function (browser) {
    if (!process.env.TEST_USERNAME) console.log("TEST_USERNAME is not set");
    if (!process.env.TEST_PASSWORD) console.log("TEST_PASSWORD is not set");

    browser
      .url('https://atmobeta.iplantc.org')
      .waitForElementVisible('div#wrapper', 1000)
      .click('a[class=submitButton]')
      .waitForElementVisible('div#header', 1000)
      .setValue('input[id=username]', process.env.TEST_USERNAME)
      .setValue('input[id=password]', process.env.TEST_PASSWORD)
      .click('input[type=submit')
      .waitForElementVisible('div#header', 6500)
      .end();
  }
};
