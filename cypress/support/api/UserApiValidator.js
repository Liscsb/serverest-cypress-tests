import { Logger } from '../utils/Logger';
import {
  USER_CREATED_SUCCESS,
  EMAIL_ALREADY_USED,
  LOGIN_SUCCESS,
  USER_DELETED_SUCCESS,
  USER_DELETED_NONE
} from '../messages/UserApiMessages';

export class UserApiValidator {

  static validateUserCreationResponse(response, email) {
    return cy.wrap(null).then(() => {
      this._validateCommonResponseFields(response, [201, 400]);
      return this._handleUserCreationStatus(response, email);
    });
  }

  static validateLoginResponse(response, expectedProps) {
    return cy.wrap(null).then(() => {
      this._validateCommonResponseFields(response, 200);
      this._validateResponseProperties(response.body, expectedProps);
      
      Logger.apiResponse('Login', response);
      Logger.success(`Login successful`);
      
      return cy.wrap(response.body.authorization);
    });
  }

  static validateDeleteResponse(response) {
    return cy.wrap(null).then(() => {
      this._validateCommonResponseFields(response, [200, 204]);
      this._validateDeleteMessage(response);
      
      Logger.apiResponse('Delete', response);
      Logger.success('User deleted successfully');
    });
  }

  static _validateCommonResponseFields(response, expectedStatus) {
    if (Array.isArray(expectedStatus)) {
      expect(expectedStatus).to.include(response.status);
    } else {
      expect(response.status).to.eq(expectedStatus);
    }
    expect(response.body).to.have.property('message').and.to.be.a('string');
  }

  static _validateResponseProperties(obj, expectedProps) {
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

  static _validateDeleteMessage(response) {
    expect([USER_DELETED_SUCCESS, USER_DELETED_NONE])
      .to.include(response.body.message);
  }

  static _handleUserCreationStatus(response, email) {
    const isSuccess = response.status === 201;
    const message = isSuccess ? USER_CREATED_SUCCESS : EMAIL_ALREADY_USED;
    
    expect(response.body.message).to.contain(message);

    Logger.apiResponse('User creation', response);
    
    if (!isSuccess) {
      Logger.warning(`User already exists with email: ${email}`);
      return cy.wrap(null);
    }

    Logger.success(`User created successfully:
    - Email: ${email}
    - User ID: ${response.body._id}`);

    return cy.wrap(response.body._id);
  }
}
