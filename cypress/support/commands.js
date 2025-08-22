import LoginPage from './pages/LoginPage';

Cypress.Commands.add('login', () => {
  LoginPage.visit();
  LoginPage.fillEmail(Cypress.env('email'));
  LoginPage.fillPassword(Cypress.env('password'));
  LoginPage.submit();
  LoginPage.assertLoginSuccess();
});