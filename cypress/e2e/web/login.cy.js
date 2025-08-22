import LoginPage from '../../support/pages/LoginPage';

describe('Login UI - Serverest', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it('should show error when logging in with invalid credentials', () => {
    LoginPage.fillEmail('invaliduser@email.com');
    LoginPage.fillPassword('wrongpassword');
    LoginPage.submit();
    LoginPage.assertLoginError();
  });

  it('should successfully log in with valid credentials', () => {
    LoginPage.fillEmail(Cypress.env('email'));
    LoginPage.fillPassword(Cypress.env('password'));
    LoginPage.submit();
    LoginPage.assertLoginSuccess();
  });
});
