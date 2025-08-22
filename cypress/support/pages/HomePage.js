import HomePageSelectors from '../selectors/HomePageSelectors';
import Button from '../components/Button';

class HomePage {
  constructor() {
    this.selectors = new HomePageSelectors();
  }

  searchProduct(productName) {
    cy.get(this.selectors.searchInput).clear().type(productName);
    const searchBtn = new Button(this.selectors.searchButton);
    searchBtn.click();
  }

  assertProductCardVisible(productName) {
    cy.get(this.selectors.productItem).should('contain', productName);
    cy.screenshot('after-assertProductCardVisible');
  }

  openProductDetails(productName) {
    cy.get(this.selectors.productItem)
      .contains(this.selectors.productTitle, productName)
      .parents(this.selectors.productItem)
      .find(this.selectors.detailsButton)
      .then($btn => {
        const detailsBtn = new Button(this.selectors.detailsButton);
        detailsBtn.click();
      });
  }
}

export default new HomePage();
