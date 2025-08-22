# Cypress JavaScript Testing Project

This project is set up to use [Cypress](https://www.cypress.io/) for frontend testing using the Page Object pattern for maintainability and scalability.

## Application Under Test

The web application tested in this project is [Serverest Frontend](https://front.serverest.dev/login), a demo app for authentication and API testing.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Open Cypress Test Runner:
   ```bash
   npx cypress open
   ```

## Running Tests and Viewing Reports

- To run all tests and automatically generate the HTML report, simply use:
  ```bash
  npx cypress run
  ```
- The HTML report will be generated in `cypress/reports/html/index.html`.
- Open the report in your browser to view detailed results:
  ```bash
  open cypress/reports/html/index.html
  ```

## Screenshots

- Cypress automatically captures screenshots on test failures and when explicitly requested (e.g., `cy.screenshot('login-success')`).
- Screenshots are saved in `cypress/screenshots/` and organized by test file and scenario.
- Use screenshots to debug UI issues and validate visual states after test execution.

## Project Structure
- `cypress/` - All test specs and Cypress configuration.
- `cypress/e2e/` - Test specs.
- `cypress/support/` - Support files and custom commands.
  - `components/` - Reusable UI helpers (e.g., Button, Input).
  - `pages/` - Page Objects encapsulating UI logic (e.g., LoginPage).
  - `selectors/` - Centralized selectors for each page/component.
  - `messages/` - Centralized messages for UI and assertions.

## Encapsulation Level

This project uses a high level of encapsulation to ensure maintainability, scalability, and readability:

- **Page Objects**: Each page or feature has its own class in `support/pages/`, encapsulating all UI interactions and assertions. Only public instance methods are exposed for use in tests.
- **Components**: Common UI elements (e.g., Button, Input) are implemented as reusable classes in `support/components/`, with only instance methods (no static helpers), ensuring all logic is encapsulated per element.
- **Selectors & Messages**: All selectors and UI messages are centralized in their respective folders (`support/selectors/` and `support/messages/`). This avoids duplication and makes updates easy if the UI changes.
- **Test Files**: Test specs interact only with the public API of Page Objects, never with raw selectors or Cypress commands directly. This keeps tests clean and focused on business logic, not implementation details.

This structure enforces clear separation of concerns and makes the codebase robust against UI changes, while promoting reuse and clarity.

## Page Object Pattern

Page Objects are classes that encapsulate the logic and interactions for a specific page or feature. This approach:
- Improves test readability and maintainability
- Centralizes selectors and UI logic
- Makes it easy to update tests when the UI changes
- Encourages reuse of code for common actions

### Example: Login Page Object

```js
// cypress/support/pages/LoginPage.js
import LoginPageSelectors from '../selectors/LoginPageSelectors';
import LoginPageMessages from '../messages/LoginPageMessages';
import Button from '../components/Button';
import Input from '../components/Input';

class LoginPage {
  constructor() {
    this.selectors = new LoginPageSelectors();
    this.messages = new LoginPageMessages();
    this.form = this._initForm();
  }
  visit() {
    cy.visit('https://front.serverest.dev/login');
    this._assertLoginFormElementsVisible();
  }
  fillEmail(email) {
    this.form.email.type(email);
  }
  fillPassword(password) {
    this.form.password.type(password);
  }
  submit() {
    cy.intercept('POST', '**/login').as('loginRequest');
    this.form.submit.assertText();
    this.form.submit.click();
  }
  // ...other methods for assertions and validations...
}

export default new LoginPage();
```

### Example: Using Page Object in a Test

```js
// cypress/e2e/login.cy.js
import LoginPage from '../support/pages/LoginPage';

describe('Login UI', () => {
  it('should show error for invalid credentials', () => {
    LoginPage.visit();
    LoginPage.fillEmail('invaliduser@email.com');
    LoginPage.fillPassword('wrongpassword');
    LoginPage.submit();
    LoginPage.assertLoginError();
  });
});
```

## Best Practices
- Keep selectors and messages centralized for easy maintenance
- Use only instance methods in Page Objects and components
- Group form elements and actions for clarity
- Avoid duplicating logic across tests
- Refactor and reuse code as the project grows

## Resources
- [Cypress Documentation](https://docs.cypress.io/)
- [Page Object Pattern](https://martinfowler.com/bliki/PageObject.html)
