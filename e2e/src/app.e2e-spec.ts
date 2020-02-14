import { AppPage } from './app.po';
import { browser, logging,element } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    browser.get('countries');
  });

  describe('load countries page', () => {
    it('should load a page and verify the url', () => {
      browser.get('countries');
      expect(browser.getCurrentUrl())
        .toEqual(browser.baseUrl + 'countries');
    });
  });





  it('should display countries first page', async () => {
    browser.get('countries');
    //just the first page
    expect(await page.getNumberCountries()).toEqual(10);
  })


  it('should get to country detail', async () => {
    browser.ignoreSynchronization = true;
    page.goToCountryDetails();
    browser.ignoreSynchronization = true;
    expect(browser.getCurrentUrl())
      .toEqual(browser.baseUrl + 'country/AFG');

  })
 
});

