class Button {
  constructor(selector, expectedText) {
    this.selector = selector;
    this.expectedText = expectedText;
  }

  click() {
    cy.get(this.selector).click();
  }

  assertText() {
    cy.get(this.selector).should('have.text', this.expectedText);
  }

  assertEnabled() {
    cy.get(this.selector).should('be.enabled');
  }

  assertVisible() {
    cy.get(this.selector).should('exist').and('be.visible');
  }

  assertNotExist() {
    cy.get(this.selector).should('not.exist');
  }
}

export default Button;
