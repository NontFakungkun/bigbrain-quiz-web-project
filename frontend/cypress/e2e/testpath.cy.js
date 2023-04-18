const nameInput = "Bill"
const emailInput = "Bill@gmail.comssssssssss"
const passwordInput = "BillBillBill"

describe('testpath ui testing', () => {
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

    it('should login and creates a new game successfully', () => {
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

    it('should be able to edit game successfully', () => {
        cy.visit('http://localhost:3000/login')

        cy.get('input[id="email-input"]')
            .focus()
            .type(emailInput)

        cy.get('input[id="password-input"]')
            .focus()
            .type(passwordInput)

        cy.get('button[name="login-button"]')
            .click()

        cy.contains('Edit Game').click()
        cy.contains('Edit Game Details').click()
        cy.get('input[name="edit-name-input"]')
            .focus()
            .type("newer game")

        cy.contains('Update').click()
        cy.get('p').contains("Name: newer game").should('exist');;
    })

    it('should create 2 new question', () => {
      cy.visit('http://localhost:3000/login')

      cy.get('input[id="email-input"]')
          .focus()
          .type(emailInput)

      cy.get('input[id="password-input"]')
          .focus()
          .type(passwordInput)

      cy.get('button[name="login-button"]')
          .click()

      cy.contains('Edit Game').click()
      cy.contains('Create New Question').click()

      cy.get('input[name="modal-new-title"]')
          .focus()
          .type("What is water?")

      cy.get('input[name="modal-new-type"]')
          .focus()
          .type("single")

      cy.get('input[name="modal-new-time-limit"]')
          .focus()
          .type("5")

      cy.get('input[name="modal-new-point"]')
          .focus()
          .type("10")
      
      cy.get('input[name="modal-new-video"]')
          .focus()
          .type("https://www.youtube.com/embed/dQw4w9WgXcQ")

      cy.get('input[name="modal-new-choices"]')
          .focus()
          .type("water; rock")

      cy.get('input[name="modal-new-answers"]')
          .focus()
          .type("1")

      cy.contains(" Add Question ").click({ force: true })

      cy.contains('Create New Question').click()
      cy.get('input[name="modal-new-title"]')
          .focus()
          .type("What is rock?")

      cy.get('input[name="modal-new-type"]')
          .focus()
          .type("single")

      cy.get('input[name="modal-new-time-limit"]')
          .focus()
          .type("5")

      cy.get('input[name="modal-new-point"]')
          .focus()
          .type("10")
      
      cy.get('input[name="modal-new-video"]')
          .focus()
          .type("https://www.youtube.com/embed/dQw4w9WgXcQ")

      cy.get('input[name="modal-new-choices"]')
          .focus()
          .type("water; rock")

      cy.get('input[name="modal-new-answers"]')
          .focus()
          .type("2")

      cy.contains(" Add Question ").click({ force: true })

      cy.get('h5').contains("What is water?").should('exist');
      cy.get('h5').contains("What is rock?").should('exist');
      cy.contains('Back').click();
      cy.contains('Edit Game').click();
    })

    it('should edit first question and back to delete question and quiz', () => {
      cy.visit('http://localhost:3000/login')

      cy.get('input[id="email-input"]')
          .focus()
          .type(emailInput)

      cy.get('input[id="password-input"]')
          .focus()
          .type(passwordInput)

      cy.get('button[name="login-button"]')
          .click()

      cy.contains('2 Questions - 0:10 Minutes').should('exist');
      cy.contains('Edit Game').click()
      cy.contains('Edit Question').click()

      cy.get('input[name="edit-title"]')
          .focus()
          .type("What is fire?")

      cy.get('input[name="edit-type"]')
          .focus()
          .type("multiple")

      cy.get('input[name="edit-time-limit"]')
          .focus()
          .type("15")

      cy.get('input[name="edit-points"]')
          .focus()
          .type("30")
      
      cy.get('input[name="edit-media"]')
          .focus()
          .type("lol")

      cy.get('textarea[name="edit-choices"]')
          .focus()
          .type("fire; fireeee")

      cy.get('textarea[name="edit-answers"]')
          .focus()
          .type("1; 2")

      cy.get('button[name="edit-question"]')
          .click()
      
      cy.get('td').contains("Title: What is fire?").should('exist');
      cy.get('td').contains("Type (single/multiple): multiple").should('exist');
      cy.get('td').contains("Time Limit: 15").should('exist');
      cy.get('td').contains("Points: 30").should('exist');
      cy.get('td').contains("Video URL: lol").should('exist');
      cy.get('li').contains("fire").should('exist');
      cy.get('li').contains("fireeee").should('exist');
      cy.get('li').contains("1").should('exist');
      cy.get('li').contains("1").should('exist');
      cy.contains('Back').click();
      cy.contains('Delete Question').click();
      cy.contains('Choices: fire, fireeee').should('not.exist');
      cy.contains('Back').click();
      cy.contains('1 Questions - 0:5 Minutes').should('exist');
      cy.contains('Delete Game').click()
      cy.contains('DELETE').click()
          cy.contains('2 Questions - 0:05 Minutes').should('not.exist');
  })
})
