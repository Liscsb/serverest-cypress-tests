export class UserApiHelpers {
  static getTestPassword() {
    return Cypress.env('admin_password') || 'admin123';
  }

  static getTestEmailPrefix() {
    return Cypress.env('admin_email_prefix') || 'admin-lcsb';
  }

  static generateTestEmail() {
    return `${UserApiHelpers.getTestEmailPrefix()}${Date.now()}@serverest.dev`;
  }

  static getUserDeleteUrl(userId) {
    return `${Cypress.env('users_base_url')}/${userId}`;
  }
}
