class LoginPageSelectors {
  email = '[data-testid=email]';
  password = '[data-testid=senha]';
  submit = '[data-testid=entrar]';
  errorMsgSelector = '.alert, [data-testid=login-error-msg]';
  successUrl = '/home';
  logoText = 'Serverest';
}

export default LoginPageSelectors;
