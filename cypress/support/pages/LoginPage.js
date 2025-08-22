import LoginPageSelectors from '../selectors/LoginPageSelectors';
import LoginPageMessages from '../messages/LoginPageMessages';
import Button from '../components/Button';
import Input from '../components/Input';

class LoginPage {

  constructor() {
    this.selectors = new LoginPageSelectors();
    this.messages = new LoginPageMessages();
    this.form = this._initForm();
  }

  visit() {
    cy.visit('https://front.serverest.dev/login');
    this._assertLoginFormElementsVisible();
  }
  fillEmail(email) {
    this.form.email.type(email);
  }
  fillPassword(password) {
    this.form.password.type(password);
  }
  submit() {
    cy.intercept('POST', '**/login').as('loginRequest');
    this.form.submit.assertText();
    this.form.submit.click();
  }
  assertLoginSuccess() {
    this._validateLoginSuccessResponse();
    this._validateLoginSuccessUI();
    cy.screenshot('login-success');
  }
  assertLoginError() {
    this._validateLoginErrorResponse();
    this._validateLoginErrorUI();
    this._validateLoginErrorFields();
    cy.screenshot('login-error');
  }
  _initForm() {
    return {
      email: new Input(this.selectors.email),
      password: new Input(this.selectors.password),
      submit: new Button(this.selectors.submit, 'Entrar')
    };
  }
  _assertLoginFormElementsVisible() {
    this.form.email.assertVisible();
    this.form.password.assertVisible();
    this.form.submit.assertVisible();
  }
  _validateLoginSuccessResponse() {
    cy.wait('@loginRequest').then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      this._assertResponseMessage(response.body, 'Login realizado com sucesso');
      expect(response.body).to.have.property('authorization').and.to.be.a('string');
      expect(response.headers['content-type']).to.include('application/json');
      expect(response.body).to.not.have.property('error');
    });
  }
  _validateLoginSuccessUI() {
    this._assertUrlContains(this.selectors.successUrl);
    cy.contains(this.selectors.logoText).should('be.visible');
    this.form.submit.assertNotExist();
  }
  _validateLoginErrorResponse(errorType = 'invalidCredentials') {
    const errorMsg = this.messages[errorType];
    cy.wait('@loginRequest').then(({ response }) => {
      expect(response.statusCode).to.not.eq(200);
      this._assertLoginErrorMessage(response.body, errorMsg);
      expect(response.body).to.not.have.property('authorization');
    });
  }
  _validateLoginErrorUI() {
    cy.get('body').then($body => {
      if ($body.find(this.selectors.errorMsgSelector).length) {
        cy.get(this.selectors.errorMsgSelector).should('be.visible').and('contain.text', this.messages.invalidCredentials);
      } else {
        cy.contains(this.messages.invalidCredentials).should('be.visible');
      }
    });
    this.form.submit.assertEnabled();
  }
  _validateLoginErrorFields() {
    this.form.email.assertValue('invaliduser@email.com');
    this.form.password.assertValue('wrongpassword');
    this._assertUrlNotContains(this.selectors.successUrl);
  }
  _assertUrlContains(urlPart) {
    cy.url().should('include', urlPart);
  }
  _assertUrlNotContains(urlPart) {
    cy.url().should('not.include', urlPart);
  }
  _assertResponseMessage(body, expected) {
    expect(body).to.have.property('message', expected);
  }
  _assertLoginErrorMessage(body, expected) {
    expect(body).to.have.property('message', expected);
  }
}

export default new LoginPage();
