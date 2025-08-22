import { UserApiHelpers } from './UserApiHelpers';
import { UserApiLogger } from './UserApiLogger';
import { UserApiValidator } from './UserApiValidator';

class UsersApi {
  static createUser({ email, password, nome = 'admin-lcsb', administrador = 'true' }) {
    UserApiLogger.logStep(`Creating user:
    - Email: ${email}
    - Name: ${nome}
    - Is Admin: ${administrador}`);

    cy.request({
      method: 'POST',
      url: Cypress.env('users_base_url'),
      body: {
        nome,
        email,
        password,
        administrador
      },
      failOnStatusCode: false
    }).then(response => {
      return UserApiValidator.validateUserCreationResponse(response, email);
    }).as('userId');

    return cy.get('@userId');
  }

  static loginUser(email, password, userId) {
    UserApiLogger.logStep(`Attempting to login with admin user:
    - Email: ${email}
    - User ID: ${userId}`);

    cy.request({
      method: 'POST',
      url: Cypress.env('users_login_url'),
      body: {
        email,
        password
      },
      failOnStatusCode: false
    }).then(response => {
      return UserApiValidator.validateLoginResponse(response, email);
    }).as('authToken');

    return cy.get('@authToken');
  }

  static deleteUserAndValidate(userId, token, email) {
    UserApiLogger.logStep(`Deleting admin user:
    - Email: ${email}
    - User ID: ${userId}`);

    cy.request({
      method: 'DELETE',
      url: UserApiHelpers.getUserDeleteUrl(userId),
      headers: { Authorization: token }
    }).then(response => {
      return UserApiValidator.validateDeleteResponse(response);
    }).as('deleteResponse');

    return cy.get('@deleteResponse');
  }
}

export default UsersApi;
