/**
 * Logging utilities for API operations
 */
export class UserApiLogger {
  static logStep(message) {
    cy.log(message);
    cy.addTestContext(message);
  }

  static logApiResponse(operation, response, details = {}) {
    const responseMessage = `${operation} response body:\n${JSON.stringify(response.body, null, 2)}`;
    this.logStep(responseMessage);
    
    if (details.successMessage) {
      this.logStep(details.successMessage);
    }
  }
}
