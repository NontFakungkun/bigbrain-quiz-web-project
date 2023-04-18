const nameInput = "James"
const emailInput = "James@gmail.comzsssssssssssszssssssssssszssssssssssssszssssssssssszssssss"
const passwordInput = "James@gmail.comzsssss"

describe('happy path ui testing', () => {
  it('got into login page (by access default path)', () => {
    cy.visit('localhost:3000/');
    cy.url().should('include', 'localhost:3000/login');
  })

  it('should navigate to the register screen successfully', () => {
    cy.visit('http://localhost:3000/register');
    cy.get('button[name="registerScreenButton"]')
      .click();
    cy.url().should('include', 'http://localhost:3000/register')
  })

  it('should register with inputs and navigate to dashboard succesfully', () => {
    cy.visit('http://localhost:3000/register');
    cy.get('input[id="name-input"]')
      .focus()
      .type(nameInput)

    cy.get('input[id="email-input"]')
      .focus()
      .type(emailInput)

    cy.get('input[id="password-input"]')
      .focus()
      .type(passwordInput)

    cy.get('input[id="confirm-pass-input"]')
      .focus()
      .type(passwordInput)

    cy.get('button[name="registerScreenButton"]')
      .click();
    cy.url().should('include', 'http://localhost:3000/dashboard')
  })

  it('should creates a new game successfully', () => {
    cy.visit('http://localhost:3000/login')

    cy.get('input[id="email-input"]')
      .focus()
      .type(emailInput)

      cy.get('input[id="password-input"]')
      .focus()
      .type(passwordInput)

    cy.get('button[name="login-button"]')
      .click()
    cy.url().should('include', 'http://localhost:3000/dashboard')

    cy.get('button[name="create-new-game"]')
      .click()

    cy.get('input[id="outlined-basic"]')
      .focus()
      .type("New Game")

    cy.get('button[name="create-new-game-confirm"]')
      .click()

    cy.get('button').should('contains.text', 'Upload Data')
    cy.get('button').should('contains.text', 'Start Game')
    cy.get('button').should('contains.text', 'Delete Game')
  })

  it('should start a game successfully', () => {
    cy.visit('http://localhost:3000/login')

    cy.get('input[id="email-input"]')
      .focus()
      .type(emailInput)

      cy.get('input[id="password-input"]')
      .focus()
      .type(passwordInput)

    cy.get('button[name="login-button"]')
      .click()

    cy.get('button[name="start-quiz-button"]')
      .click()

    cy.get('button').should('contains.text', 'Copy')
  })

  it('should end a game successfully', () => {
    cy.visit('http://localhost:3000/login')

    cy.get('input[id="email-input"]')
      .focus()
      .type(emailInput)

    cy.get('input[id="password-input"]')
      .focus()
      .type(passwordInput)

    cy.get('button[name="login-button"]')
      .click()

    cy.get('button[name="stop-quiz-button"]')
      .click()

    cy.get('button[name="stop-no-button"]')
      .click()

    cy.get('button').should('contains.text', 'Upload Data')
    cy.get('button').should('contains.text', 'Start Game')
    cy.get('button').should('contains.text', 'Delete Game')
  })

  it('should load result page successfully', () => {
    cy.visit('http://localhost:3000/login')

    cy.get('input[id="email-input"]')
      .focus()
      .type(emailInput)

      cy.get('input[id="password-input"]')
      .focus()
      .type(passwordInput)

    cy.get('button[name="login-button"]')
      .click()

    cy.get('button[name="start-quiz-button"]')
      .click()

    cy.visit('http://localhost:3000/dashboard')

    cy.contains('Result').click()

    cy.get('button').should('contains.text', 'Back')
  })

  it('should logs out of the application successfully', () => {
    cy.visit('http://localhost:3000/login')

    cy.get('input[id="email-input"]')
      .focus()
      .type(emailInput)

      cy.get('input[id="password-input"]')
      .focus()
      .type(passwordInput)

    cy.get('button[name="login-button"]')
      .click()

    cy.visit('http://localhost:3000/dashboard')

    cy.contains('Logout').click()

    cy.url().should('include', 'http://localhost:3000/login')
  })

  it('should logs back into the application successfully', () => {
    cy.visit('http://localhost:3000/login')

    cy.get('input[id="email-input"]')
      .focus()
      .type(emailInput)

    cy.get('input[id="password-input"]')
      .focus()
      .type(passwordInput)

    cy.get('button[name="login-button"]')
      .click()

    cy.url().should('include', 'http://localhost:3000/dashboard')
  })
})
