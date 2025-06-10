describe('template spec', () => {
  it('renders the default elements on the screen', () => {
    cy.visit('http://localhost:5173')
    cy.get('[data-testid="themeToggle"]') //testID is added to the component
    .should('exist')
    // .should("have.text", "Cypress Demo");
  })

  it("renders the todos on the screen", () => {
    cy.visit("http://localhost:5173");
  })
})