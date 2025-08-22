import LoginPage from '../../support/pages/LoginPage';
import HomePage from '../../support/pages/HomePage';
import ProductDetailsPage from '../../support/pages/ProductDetailsPage';
import ShoppingListPage from '../../support/pages/ShoppingListPage';

describe('Purchase Flow - Serverest', () => {
  let products;

  before(() => {
    cy.fixture('products').then((data) => {
      products = data.produtos;
    });
  });

  beforeEach(() => {
    cy.login();
  });

  it('should allow searching, viewing details, adding to list, changing quantity, and adding to cart', () => {
    const quantity = 2;
    const product = products.find(p => p.nome === 'coxinha de carne moída');
    HomePage.searchProduct(product.nome);
    HomePage.assertProductCardVisible(product.nome);
    HomePage.openProductDetails(product.nome);
    ProductDetailsPage.assertProductDetails(product);
    ProductDetailsPage.addToList();
    ShoppingListPage.assertProductInShoppingList(product.nome);
    ShoppingListPage.setQuantity(quantity);
    ShoppingListPage.addToCart();
    
  });
});
