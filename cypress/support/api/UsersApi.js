import {
  USER_CREATED_SUCCESS,
  EMAIL_ALREADY_USED,
  LOGIN_SUCCESS,
  USER_DELETED_SUCCESS,
  USER_DELETED_NONE
} from '../messages/UserApiMessages';

const USERS_BASE_URL = Cypress.env('users_base_url');
const USERS_LOGIN_URL = Cypress.env('users_login_url');
const getUserDeleteUrl = (userId) => `${USERS_BASE_URL}/${userId}`;

class UsersApi {

  static validateProperties(obj, expectedProps) {
    Object.entries(expectedProps).forEach(([key, typeOrValue]) => {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) return;
      if (typeOrValue === 'string') {
        expect(obj).to.have.property(key).and.to.be.a('string');
      } else if (typeOrValue !== undefined) {
        expect(obj).to.have.property(key, typeOrValue);
      } else {
        expect(obj).to.have.property(key);
      }
    });
  }
  // Helpers
  static getTestPassword() {
    return Cypress.env('admin_password') || 'admin123';
  }

  static getTestEmailPrefix() {
    return Cypress.env('admin_email_prefix') || 'admin-lcsb';
  }

  static generateTestEmail() {
    return `${UsersApi.getTestEmailPrefix()}${Date.now()}@serverest.dev`;
  }

  // API Actions
  static createAdminUser(email, password) {
    return cy.request({
      method: 'POST',
      url: USERS_BASE_URL,
      body: {
        nome: 'admin-lcsb',
        email,
        password,
        administrador: 'true'
      },
      failOnStatusCode: false
    });
  }

  static loginUser(email, password) {
    return cy.request({
      method: 'POST',
      url: USERS_LOGIN_URL,
      body: {
        email,
        password
      },
      failOnStatusCode: false
    });
  }

  static deleteUser(userId, token) {
    return cy.request({
      method: 'DELETE',
      url: getUserDeleteUrl(userId),
      headers: { Authorization: token }
    });
  }

  // Validations
  static validateUserCreationResponse(response, email) {
    expect([201, 400]).to.include(response.status);
    expect(response.body).to.have.property('message').and.to.be.a('string');
    if (response.status === 201) {
      expect(response.body.message).to.contain(USER_CREATED_SUCCESS);
      UsersApi.validateUserProperties(response.body, email);
      return response.body._id;
    } else {
      expect(response.body.message).to.contain(EMAIL_ALREADY_USED);
      return null;
    }
  }

  static validateLoginResponse(response, email) {
    expect(response.status).to.eq(200);
    const expectedProps = {
      authorization: 'string',
      message: LOGIN_SUCCESS,
      email,
      nome: 'admin-lcsb',
      administrador: 'true',
      _id: 'string'
    };
    UsersApi.validateProperties(response.body, expectedProps);
    return response.body.authorization;
  }

  static validateDeleteResponse(response) {
    expect([200, 204]).to.include(response.status);
    expect(response.body).to.have.property('message').and.to.be.a('string');
    expect([
      USER_DELETED_SUCCESS,
      USER_DELETED_NONE
    ]).to.include(response.body.message);
  }

  static validateUserProperties(body, email) {
    const expectedProps = {
      _id: 'string',
      nome: 'admin-lcsb',
      email,
      administrador: 'true',
      password: 'string',
      __v: undefined,
      dataCadastro: undefined,
      dataAtualizacao: undefined
    };
    UsersApi.validateProperties(body, expectedProps);
  }
}

export default UsersApi;
