describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/')
    // Visiter le localhost:4200

    cy.get('[data-test-id="button_to_click"]').click()
    // Récupérer le bouton (get) puis cliquer dessus (.click()) 

    cy.get('.character-card').should('be.visible')
    // Vérifier qu'un carte apparait bien dans ta page (contains)
  })
})