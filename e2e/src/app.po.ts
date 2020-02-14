import { browser, by, element } from 'protractor';

export class AppPage {

  navigateTo() {
    return browser.get('countries');
  }

  getTitleText() {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }
  getNumberCountries() {

    return element.all(by.css("table tbody tr")).count();
  }
  goToCountryDetails() {
    element(by.css('tr[ng-reflect-router-link="/country/,AFG"]')).click();

  }
}
