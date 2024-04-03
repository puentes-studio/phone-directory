const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const { Builder, By, Key, until, WebDriver } = require('selenium-webdriver'), chrome = require('selenium-webdriver/chrome');
const app = require('../app');
var driver;
const port = 8001
let name, origin, destination, price, rating, addBtn, sortPrice, sortRating, flightItems, originFilter, destFilter;
const options = new chrome.Options();
let server;

describe('Phone Directory app \n', function() {
  this.timeout(100000);

  before(function () {
    server = app.listen(port, ()=> console.log(`Test App Started on ${port}`))
        driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    });

  after(function() {
      driver.quit();
      server.close()
  })

  beforeEach(async function() {
      await driver.get('http://localhost:8001')
      name = await driver.findElement(By.id("name"));
      mobile = await driver.findElement(By.id("mobile"));
      email = await driver.findElement(By.id("email"));
      price = await driver.findElement(By.id("summaryTable"));
      error = await driver.findElement(By.id("error"));
      submit = await driver.findElement(By.id("submit"));
      nameColumn = await driver.findElement(By.id("nameColumn"));
      search = await driver.findElement(By.id("search"));
  })

  it('should show error when input fields are empty', async function() {
    name.sendKeys('');
    mobile.sendKeys('');
    email.sendKeys('');
    await submit.click();
    const hasNoItemAdded = await driver.executeScript("return document.querySelectorAll('#summaryTable tbody').length === 1");
    const displayError = await driver.executeScript("return getComputedStyle(document.getElementsByClassName('error')[0]).display !== 'none'");
    expect(hasNoItemAdded).to.be.true;
    expect(displayError).to.be.true;
  });
});