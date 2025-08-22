import ProductDetailsSelectors from "../selectors/ProductDetailsSelectors";
import Button from '../components/Button';

class ProductDetailsPage {
  constructor() {
    this.selectors = new ProductDetailsSelectors();
    this.pageUrl = '/detalhesProduto';
  }
  navigateToProductDetails() {
    cy.visit(this.pageUrl);
  }

  assertProductDetails(product) {
    cy.url().should('include', this.pageUrl);
    this.validateAll(product);
  }
  validateAll(product) {
    this._validatePageTitle();
    this._validateName(product.nome);
    this._validateDetailsTitle();
    this._validatePrice(product.preco);
    this._validateQuantity(product.quantidade);
    this._validateDescription(product.descricao);
    cy.screenshot('product-details-validated');
  }

  addToList() {
    const addToListBtn = new Button(this.selectors.addToListButton);
    addToListBtn.click();
  }

  _validatePageTitle() {
    cy.get(this.selectors.pageTitle).should('contain', 'Detalhes do produto');
  }

  _validateName(nome) {
    cy.get(this.selectors.productDetailName).should('exist').and('have.text', nome);
  }

  _validateDetailsTitle() {
    cy.get(this.selectors.detailsTitle).should('exist').and('contain', 'Detalhes');
  }

  _validatePrice(preco) {
    cy.get(this.selectors.specifications).contains(preco).should('exist');
  }

  _validateQuantity(quantidade) {
    cy.get(this.selectors.specifications).contains(quantidade).should('exist');
  }

  _validateDescription(descricao) {
    cy.get(this.selectors.specifications).contains(descricao).should('exist');
  }
}

export default new ProductDetailsPage();
