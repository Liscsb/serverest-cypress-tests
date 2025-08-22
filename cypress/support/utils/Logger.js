export class Logger {

  static step(message) {
    cy.log(message);
    cy.addTestContext(message);
  }

  static apiResponse(operation, response, details = {}) {
    if (Cypress.env('debug_api_logs')) {
      const responseMessage = `${operation} response body:\n${JSON.stringify(response.body, null, 2)}`;
      this.step(responseMessage);
    }
    
    if (details.successMessage) {
      this.step(details.successMessage);
    }
  }

  static error(message, error) {
    const errorMessage = error ? `${message}\nError: ${error.message}` : message;
    this.step(`❌ ${errorMessage}`);
  }

  static success(message) {
    this.step(`✅ ${message}`);
  }

  static warning(message) {
    this.step(`⚠️ ${message}`);
  }
}
