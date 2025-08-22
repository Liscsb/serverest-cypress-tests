import { LOGIN_SUCCESS } from '../support/messages/UserApiMessages';

/**
 * Expected response properties for API validations
 */
export const API_RESPONSES = {
  login: {
    success: {
      authorization: 'string',
      message: LOGIN_SUCCESS,
      email: undefined,
      nome: undefined,
      administrador: undefined,
      _id: 'string'
    }
  }
};
