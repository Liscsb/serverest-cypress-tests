import UsersApi from '../../support/api/UsersApi';
import { UserApiHelpers } from '../../support/api/UserApiHelpers';

describe('Serverest API - Users', () => {
  const testData = {
    email: null,
    userId: null,
    token: null
  };

  before(() => {
    testData.email = UserApiHelpers.generateTestEmail();
  });

  it('should create an admin user', () => {
    UsersApi.createUser({
      email: testData.email,
      password: UserApiHelpers.getTestPassword()
    }).then(id => {
      testData.userId = id;
    });
  });

  it('should login with the created admin user', () => {
    UsersApi.loginUser(
      testData.email,
      UserApiHelpers.getTestPassword(),
      testData.userId
    ).then(authToken => {
      testData.token = authToken;
    });
  });
  
  it('should delete the created admin user', () => {
    expect(testData.userId).to.exist;
    expect(testData.token).to.exist;
    UsersApi.deleteUserAndValidate(testData.userId, testData.token, testData.email);
  });
});
