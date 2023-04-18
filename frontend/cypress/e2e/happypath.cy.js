import { MainPath } from "../../src/utils/Path";

describe('happy path ui testing', () => {
  it('got into login page (by access default path)', () => {
    cy.visit('localhost:3000/');
    cy.url().should('include', 'localhost:3000/login');
  })

  // it('navigates to register screen', () => {
  //   cy.get('button[name""]').click();
  //   cy.url().should('include', 'localhost:3000/register');
  // })
})