class Input {
  constructor(selector) {
    this.selector = selector;
  }

  type(value) {
    cy.get(this.selector).clear().type(value);
  }
  assertValue(value) {
    cy.get(this.selector).should('have.value', value);
  }
  assertVisible() {
    cy.get(this.selector).should('exist').and('be.visible');
  }

}

export default Input;
