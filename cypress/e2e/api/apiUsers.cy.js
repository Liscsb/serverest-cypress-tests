import UsersApi from '../../support/api/UsersApi';

describe('Serverest API - Users', () => {
  let email, userId, token;

  before(() => {
    email = UsersApi.generateTestEmail();
  });

  it('should create an admin user', () => {
    UsersApi.createAdminUser(email, UsersApi.getTestPassword()).then((createResponse) => {
      userId = UsersApi.validateUserCreationResponse(createResponse, email);
    });
  });

  it('should login with the created admin user', () => {
    UsersApi.loginUser(email, UsersApi.getTestPassword()).then((loginResponse) => {
      token = UsersApi.validateLoginResponse(loginResponse, email);
    });
  });

  it('should delete the created admin user', () => {
    if (userId && token) {
      UsersApi.deleteUser(userId, token).then((deleteResponse) => {
        UsersApi.validateDeleteResponse(deleteResponse);
      });
    }
  });
});
