import ShoppingListSelectors from '../selectors/ShoppingListSelectors';
import Button from '../components/Button';

class ShoppingListPage {
  constructor() {
    this.selectors = new ShoppingListSelectors();
    this.pageUrl = '/minhaListaDeProdutos';
  }

  navigateToShoppingList() {
    cy.visit(this.pageUrl);
  }

  assertProductInShoppingList(productName) {
    cy.url().should('include', this.pageUrl);
    cy.get(this.selectors.productCard).should('contain', productName);
    cy.screenshot('after-assertProductInShoppingList');
  }

  setQuantity(quantity) {
    if (quantity > 1) {
      for (let i = 1; i < quantity; i++) {
        this._increaseQuantity();
      }
      cy.screenshot('after-increase-quantity');
    } else if (quantity < 1) {
      for (let i = 1; i > quantity; i--) {
        this._decreaseQuantity();
      }
      cy.screenshot('after-decrease-quantity');
    }
  }

  addToCart() {
    const addToCartBtn = new Button(this.selectors.addToCartButton);
    addToCartBtn.click();
  }

  _increaseQuantity() {
    const increaseBtn = new Button(this.selectors.increaseQuantityButton);
    increaseBtn.click();
  }

  _decreaseQuantity() {
    const decreaseBtn = new Button(this.selectors.decreaseQuantityButton);
    decreaseBtn.click();
  }
}

export default new ShoppingListPage();
